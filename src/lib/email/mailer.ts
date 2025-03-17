import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { ContactNotification, EmailResult } from './types';
import { getEmailConfig } from './config';

/**
 * Development-only email handler that logs form submissions instead of sending emails
 */
function handleDevEmail(notification: ContactNotification): EmailResult {
  console.log('=== DEVELOPMENT MODE: Email would be sent with the following data ===');
  console.log('From:', 'notifications@tsunaimi.ai', '(TsunAImi Contact Form)');
  console.log('To: Would use MAILERSEND_TO_EMAIL from env vars');
  console.log('Subject: New Contact Form Submission');
  console.log('Name:', notification.name);
  console.log('Email:', notification.email);
  console.log('Message:', notification.message);
  console.log('Timestamp:', notification.timestamp.toLocaleString());
  console.log('=== END OF EMAIL PREVIEW ===');
  
  return { success: true };
}

export async function sendContactNotification(
  notification: ContactNotification
): Promise<EmailResult> {
  // Only use development handler if SKIP_EMAIL_SENDING is explicitly set to true
  if (process.env.SKIP_EMAIL_SENDING === 'true') {
    return handleDevEmail(notification);
  }
  
  try {
    // Check if email configuration is available
    let config;
    try {
      config = getEmailConfig();
    } catch (configError) {
      console.error('Email configuration error:', configError);
      return {
        success: false,
        error: configError instanceof Error ? configError.message : 'Missing email configuration'
      };
    }
    
    const mailerSend = new MailerSend({ apiKey: config.apiKey });

    const recipients = [
      new Recipient(config.toEmail, config.toName)
    ];

    const sender = new Sender(
      'notifications@tsunaimi.ai',
      'TsunAImi Contact Form'
    );

    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo(recipients)
      .setSubject('New Contact Form Submission')
      .setHtml(`
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${notification.name}</p>
        <p><strong>Email:</strong> ${notification.email}</p>
        <p><strong>Message:</strong></p>
        <p>${notification.message}</p>
        <p><strong>Timestamp:</strong> ${notification.timestamp.toLocaleString()}</p>
      `);

    await mailerSend.email.send(emailParams);
    console.log('Email sent successfully to', config.toEmail);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to send contact notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 
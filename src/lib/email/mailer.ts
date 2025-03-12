import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { ContactNotification, EmailResult } from './types';
import { getEmailConfig } from './config';

export async function sendContactNotification(
  notification: ContactNotification
): Promise<EmailResult> {
  try {
    const config = getEmailConfig();
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

    return { success: true };
  } catch (error) {
    console.error('Failed to send contact notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 
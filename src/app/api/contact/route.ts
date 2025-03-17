import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { validateRequiredFields } from '@/lib/contact-validation';
import { sendContactNotification } from '@/lib/email/mailer';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  interest: string;
  message: string;
  phone_number?: string;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

// Add export const dynamic = 'force-dynamic' to ensure this route is always server-rendered
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Get client IP for logging
    const headersList = headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    const data = await request.json() as ContactFormData;
    
    // Validate required fields and email format
    const fieldsValidation = validateRequiredFields(data);
    if (!fieldsValidation.isValid) {
      return NextResponse.json(
        { error: fieldsValidation.message },
        { status: 400 }
      );
    }

    // Send email notification
    try {
      // Check if we're in development mode and skip actual email sending
      if (process.env.NODE_ENV === 'development' || process.env.SKIP_EMAIL_SENDING === 'true') {
        console.log('Development mode: Skipping email sending');
        console.log('Form data:', data);
        
        // Return success response in development
        return NextResponse.json(
          { 
            message: 'Development mode: Email sending skipped. Form submission successful.' 
          },
          { status: 200 }
        );
      }
      
      const emailResult = await sendContactNotification({
        name: data.name,
        email: data.email,
        message: `
=== Contact Form Submission ===
Timestamp: ${new Date().toISOString()}
IP: ${clientIp}

=== Contact Information ===
Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Role: ${data.role}
${data.phone_number ? `Phone: ${data.phone_number}` : ''}

=== Interest ===
${data.interest}

=== Message ===
${data.message}
        `,
        timestamp: new Date()
      });

      if (!emailResult.success) {
        console.error('Failed to send email notification:', emailResult.error);
        
        // Check if it's a configuration error
        const errorMessage = emailResult.error || '';
        if (errorMessage.includes('Missing required email configuration')) {
          // Store the form data in the logs at least
          console.log('FORM SUBMISSION (EMAIL CONFIG MISSING):', {
            name: data.name,
            email: data.email,
            company: data.company,
            role: data.role,
            interest: data.interest,
            message: data.message,
            phone_number: data.phone_number,
            timestamp: new Date().toISOString()
          });
          
          return NextResponse.json(
            { 
              message: 'Your message has been received. Due to a temporary issue with our email system, our team has been notified through our logging system.',
              warning: 'Email notification system is currently unavailable.'
            },
            { status: 200 }
          );
        }
        
        return NextResponse.json(
          { error: 'Failed to send notification. Please try again later.' },
          { status: 500 }
        );
      }
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      
      // Store the form data in the logs at least
      console.log('FORM SUBMISSION (EMAIL ERROR):', {
        name: data.name,
        email: data.email,
        company: data.company,
        role: data.role,
        interest: data.interest,
        message: data.message,
        phone_number: data.phone_number,
        timestamp: new Date().toISOString(),
        error: getErrorMessage(emailError)
      });
      
      // Check if it's a configuration error
      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
      if (errorMessage.includes('Missing required email configuration')) {
        return NextResponse.json(
          { 
            message: 'Your message has been received. Due to a temporary issue with our email system, our team has been notified through our logging system.',
            warning: 'Email notification system is currently unavailable.'
          },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to send notification. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Thank you for your interest in TsunAImi! We have received your inquiry and our team will get back to you shortly.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
} 
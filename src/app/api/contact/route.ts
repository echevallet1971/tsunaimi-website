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
        return NextResponse.json(
          { error: 'Failed to send notification. Please try again later.' },
          { status: 500 }
        );
      }
    } catch (emailError) {
      console.error('Email notification error:', emailError);
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
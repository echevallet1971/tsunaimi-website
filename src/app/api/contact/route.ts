import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { validateRequiredFields } from '@/lib/contact-validation';
import { validateContactSubmission } from './validation';
import { sendContactNotification } from '@/lib/email/mailer';
import { query } from '@/lib/db';
import { DatabaseError } from 'pg';

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
  if (error instanceof DatabaseError) {
    switch (error.code) {
      case '23505': // Unique violation
        return 'A submission with this information already exists.';
      case '23502': // Not null violation
        return 'Please fill in all required fields.';
      case '23514': // Check violation
        return 'One or more fields contain invalid data.';
      case '28P01': // Authentication failed
        return 'We are experiencing technical difficulties. Our team has been notified.';
      default:
        console.error('Database error:', error);
        return 'There was an issue saving your submission. Please try again later.';
    }
  }
  
  if (error instanceof Error) {
    if (error.message.includes('network') || error.message.includes('connection')) {
      return 'We are experiencing network issues. Please try again in a few moments.';
    }
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again later.';
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

    // Check for recent submissions from this email
    const submissionValidation = await validateContactSubmission(data.email);
    if (!submissionValidation.isValid) {
      const status = submissionValidation.error?.type === 'rate_limit' ? 429 : 500;
      return NextResponse.json(
        { error: submissionValidation.message },
        { status }
      );
    }

    try {
      // Store in database
      await query(
        `INSERT INTO contact_submissions (
          name, email, company, role, interest, message, phone_number
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          data.name,
          data.email,
          data.company,
          data.role,
          data.interest,
          data.message,
          data.phone_number || null
        ]
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: getErrorMessage(dbError) },
        { status: 500 }
      );
    }

    // Send email notification
    try {
      const emailResult = await sendContactNotification({
        name: data.name,
        email: data.email,
        message: `
Interest: ${data.interest}
Company: ${data.company}
Role: ${data.role}
${data.phone_number ? `Phone: ${data.phone_number}` : ''}

Message:
${data.message}
        `,
        timestamp: new Date()
      });

      if (!emailResult.success) {
        // Log the error but don't fail the request
        console.error('Failed to send email notification:', emailResult.error);
        // Store the failed notification for retry
        await query(
          `INSERT INTO failed_notifications (
            submission_email, error_message, retry_count
          ) VALUES ($1, $2, $3)`,
          [data.email, emailResult.error || 'Unknown error', 0]
        );
      }
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      // Don't fail the request, but log for retry
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
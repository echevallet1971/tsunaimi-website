import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { validateContactSubmission, validateRequiredFields } from '@/lib/contact-validation';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  interest: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactFormData;
    
    // Validate required fields and email format
    const fieldsValidation = validateRequiredFields(body);
    if (!fieldsValidation.isValid) {
      return NextResponse.json(
        { error: fieldsValidation.message },
        { status: 400 }
      );
    }

    // Check for recent submissions from this email
    const submissionValidation = await validateContactSubmission(body.email);
    if (!submissionValidation.isValid) {
      return NextResponse.json(
        { error: submissionValidation.message },
        { status: 429 } // Too Many Requests
      );
    }

    // Store in database
    await query(
      `INSERT INTO contact_submissions (name, email, company, role, interest, message)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [body.name, body.email, body.company, body.role, body.interest, body.message]
    );

    // TODO: Add email notification here (future enhancement)
    // This will be replaced with your email service integration

    return NextResponse.json(
      { 
        message: 'Thank you for your interest in TsunAImi! We have received your inquiry and our team will get back to you shortly.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
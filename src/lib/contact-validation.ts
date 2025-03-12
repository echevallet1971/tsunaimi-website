import { query } from './db';

interface ValidationResult {
    isValid: boolean;
    message?: string;
}

export async function validateContactSubmission(email: string): Promise<ValidationResult> {
    try {
        // Check if there's a recent submission from this email (within last 5 minutes)
        const recentSubmission = await query<{ count: string }>(
            `SELECT COUNT(*) as count 
             FROM contact_submissions 
             WHERE email = $1 
             AND created_at > NOW() - INTERVAL '5 minutes'`,
            [email]
        );

        if (parseInt(recentSubmission[0].count) > 0) {
            return {
                isValid: false,
                message: 'We have received your previous inquiry and our team will get back to you shortly.'
            };
        }

        return { isValid: true };
    } catch (error) {
        console.error('Error validating contact submission:', error);
        return {
            isValid: false,
            message: 'An error occurred while validating your submission. Please try again.'
        };
    }
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validateRequiredFields(data: {
    name: string;
    email: string;
    company: string;
    role: string;
    interest: string;
    message: string;
}): ValidationResult {
    // Check for empty or whitespace-only values
    for (const [field, value] of Object.entries(data)) {
        if (!value || value.trim().length === 0) {
            return {
                isValid: false,
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`
            };
        }
    }

    // Validate email format
    if (!validateEmail(data.email)) {
        return {
            isValid: false,
            message: 'Please enter a valid email address.'
        };
    }

    return { isValid: true };
} 
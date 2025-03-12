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

// Client-side validation utilities
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Phone number formatting utilities
export const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters except + and spaces
    return value.replace(/[^\d+\s]/g, '').replace(/\s+/g, ' ').trim();
};

export const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters except +
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Must start with + and country code, followed by 6-15 digits
    // This covers most international formats
    return /^\+\d{1,4}\d{6,15}$/.test(cleaned);
};

export function validateRequiredFields(data: {
    name: string;
    email: string;
    company: string;
    role: string;
    interest: string;
    message: string;
    phone_number?: string;
}): { isValid: boolean; message?: string } {
    // Check for empty or whitespace-only values in required fields
    const requiredFields = ['name', 'email', 'company', 'role', 'interest', 'message'];
    for (const field of requiredFields) {
        const value = data[field as keyof typeof data];
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
            message: 'Please enter a valid email address (e.g., user@domain.com).'
        };
    }

    // Validate phone number if provided
    if (data.phone_number && !validatePhoneNumber(data.phone_number)) {
        return {
            isValid: false,
            message: 'Please enter a valid international phone number (e.g., +33 1 23 45 67 89).'
        };
    }

    return { isValid: true };
} 
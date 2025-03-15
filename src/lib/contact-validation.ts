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
    // Basic international phone number validation
    // Allows for country codes and common separators
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone);
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
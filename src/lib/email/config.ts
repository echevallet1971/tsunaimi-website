import { EmailConfig } from './types';

export function getEmailConfig(): EmailConfig {
  const config: EmailConfig = {
    apiKey: process.env.MAILERSEND_API_KEY || '',
    toEmail: process.env.MAILERSEND_TO_EMAIL || '',
    toName: process.env.MAILERSEND_TO_NAME || '',
  };

  // Validate required fields
  const missingFields = Object.entries(config)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required email configuration fields: ${missingFields.join(
        ', '
      )}. Please check your .env.local file.`
    );
  }

  return config;
} 
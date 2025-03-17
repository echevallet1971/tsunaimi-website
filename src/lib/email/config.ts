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
      )}. Please add the following environment variables to your .env.local file: ${missingFields.map(field => {
        switch(field) {
          case 'apiKey': return 'MAILERSEND_API_KEY';
          case 'toEmail': return 'MAILERSEND_TO_EMAIL';
          case 'toName': return 'MAILERSEND_TO_NAME';
          default: return field;
        }
      }).join(', ')}`
    );
  }

  return config;
} 
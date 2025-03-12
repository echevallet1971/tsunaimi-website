export interface EmailConfig {
  apiKey: string;
  toEmail: string;
  toName: string;
}

export interface ContactNotification {
  name: string;
  email: string;
  message: string;
  timestamp: Date;
}

export interface EmailResult {
  success: boolean;
  error?: string;
} 
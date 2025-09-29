export interface EmailEntity {
  id: number; // Backend uses Long
  toAddress: string; // Comma-separated string (e.g., "email1,email2")
  fromAddress: string;
  subject: string;
  body: string;
  status: string;
  attachmentName: string | null;
  sentAt: string; // ISO string (e.g., "2025-09-27T11:12:00")
}

export interface EmailRequest {
  from: string;
  to: string[]; // JSON array for multiple recipients
  subject: string;
  body: string;
  attachmentName: string | null; // File path (not File object)
}

export interface EmailResponse {
  message: string;
}

export interface EmailFormData {
  to: string; // Comma-separated input from form
  subject: string;
  body: string;
  attachment?: File | null; // File from input
}
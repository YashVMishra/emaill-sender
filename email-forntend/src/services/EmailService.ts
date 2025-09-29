import axios, { AxiosInstance } from 'axios';
import { EmailEntity, EmailRequest } from '@/types/email';

const API_BASE_URL = 'http://localhost:8080/api/emails';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const healthCheck = async (): Promise<string> => {
  const response = await apiClient.get('/health');
  return response.data;
};

export const getAllEmails = async (): Promise<EmailEntity[]> => {
  const response = await apiClient.get('');
  return response.data;
};

export const sendEmail = async (emailData: EmailRequest, file?: File | null): Promise<string> => {
  const formData = new FormData();
  formData.append('email', JSON.stringify(emailData));
  if (file) {
    formData.append('file', file, file.name);
  }
  const response = await apiClient.post('/send-with-file', formData);
  return response.data;
};
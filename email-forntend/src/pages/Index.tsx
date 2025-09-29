import { useState } from 'react';
import { EmailForm } from '@/components/EmailForm';
import { EmailHistory } from '@/components/EmailHistory';
import { EmailFormData, Email } from '@/types/email';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      to: 'john.doe@example.com',
      subject: 'Welcome to our service',
      body: 'Thank you for signing up! We are excited to have you on board.',
      sentAt: new Date('2024-01-15T10:30:00'),
      status: 'sent'
    },
    {
      id: '2',
      to: 'jane.smith@company.com',
      subject: 'Project Update',
      body: 'Here is the latest update on your project. Everything is progressing well.',
      attachmentName: 'project-report.pdf',
      sentAt: new Date('2024-01-14T15:45:00'),
      status: 'sent'
    },
    {
      id: '3',
      to: 'admin@test.com',
      subject: 'Test Email',
      body: 'This is a test email to verify the system is working properly.',
      sentAt: new Date('2024-01-13T09:15:00'),
      status: 'failed'
    }
  ]);

  const handleEmailSubmit = async (formData: EmailFormData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newEmail: Email = {
      id: Date.now().toString(),
      to: formData.to,
      subject: formData.subject,
      body: formData.body,
      attachmentName: formData.attachment?.name,
      sentAt: new Date(),
      status: 'sent'
    };

    setEmails(prev => [newEmail, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Email Microservice</h1>
          <p className="text-xl text-muted-foreground">Send emails and view your email history</p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-2 max-w-7xl mx-auto">
          <div className="flex justify-center">
            <EmailForm onSubmit={handleEmailSubmit} />
          </div>
          
          <div className="flex justify-center">
            <EmailHistory emails={emails} />
          </div>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Index;

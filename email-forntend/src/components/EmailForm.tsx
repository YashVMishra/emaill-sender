import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Paperclip, Send } from 'lucide-react';
import { EmailFormData } from '@/types/email';

interface EmailFormProps {
  onSubmit: (data: EmailFormData) => void;
}

export function EmailForm({ onSubmit }: EmailFormProps) {
  const [formData, setFormData] = useState<EmailFormData>({
    to: '',
    subject: '',
    body: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.to || !formData.subject || !formData.body) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setFormData({ to: '', subject: '', body: '' });
      document.getElementById('attachment')?.setAttribute('value', '');
      toast.success('Email sent successfully!');
    } catch (error) {
      toast.error('Failed to send email');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, attachment: file });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Send Email
        </CardTitle>
        <CardDescription>
          Fill in the details below to send an email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To <span className="text-destructive">*</span></Label>
            <Input
              id="to"
              type="email"
              placeholder="recipient@example.com"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject <span className="text-destructive">*</span></Label>
            <Input
              id="subject"
              type="text"
              placeholder="Enter email subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Message <span className="text-destructive">*</span></Label>
            <Textarea
              id="body"
              placeholder="Enter your message here..."
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachment" className="flex items-center gap-2">
              <Paperclip className="h-4 w-4" />
              Attachment (optional)
            </Label>
            <Input
              id="attachment"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Sending...' : 'Send Email'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
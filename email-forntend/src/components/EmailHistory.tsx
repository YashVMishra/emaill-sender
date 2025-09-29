import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, Mail, Paperclip, Calendar } from 'lucide-react';
import { EmailEntity } from '@/types/email';
import { format } from 'date-fns';

interface EmailHistoryProps {
  emails: EmailEntity[];
}

export function EmailHistory({ emails }: EmailHistoryProps) {
  const getStatusColor = (status: EmailEntity['status']) => {
    switch (status.toLowerCase()) { // Handle case sensitivity
      case 'sent':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Email History
        </CardTitle>
        <CardDescription>
          Previously sent emails ({emails.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {emails.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No emails sent yet</p>
            <p className="text-sm">Your email history will appear here</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{email.subject}</h4>
                        <Badge className={getStatusColor(email.status)}>
                          {email.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        To: {email.toAddress}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    {email.body}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(email.sentAt), 'MMM dd, yyyy HH:mm')}
                      </div>
                      {email.attachmentName && (
                        <div className="flex items-center gap-1">
                          <Paperclip className="h-3 w-3" />
                          {email.attachmentName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
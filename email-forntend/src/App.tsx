import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmailForm } from "./components/EmailForm";
import { EmailHistory } from "./components/EmailHistory";
import { getAllEmails, sendEmail } from "./services/EmailService";
import { EmailEntity, EmailRequest } from "./types/email";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Index = () => {
  // Fetch email history
  const { data: emails = [], refetch } = useQuery<EmailEntity[]>({
    queryKey: ['emails'],
    queryFn: getAllEmails,
  });

  // Mutation for sending emails
  const mutation = useMutation({
    mutationFn: ({ emailData, file }: { emailData: EmailRequest; file?: File | null }) =>
      sendEmail(emailData, file),
    onSuccess: () => {
      refetch(); // Refresh email history after sending
    },
  });

  // Handle form submission
  const handleEmailSubmit = (data: EmailRequest) => {
    mutation.mutate({
      emailData: {
        from: data.from,
        to: data.to,
        subject: data.subject,
        body: data.body,
        attachmentName: data.attachmentName ? data.attachmentName : null,
      },
      file: data.attachmentName ? new File([], data.attachmentName) : null, // Placeholder; actual file handled in EmailForm
    });
  };

  return (
    <div className="container mx-auto p-4">
      <EmailForm onSubmit={handleEmailSubmit} />
      <div className="mt-8">
        <EmailHistory emails={emails} />
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
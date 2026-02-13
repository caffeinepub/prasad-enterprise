import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useInquiry } from '@/hooks/useInquiry';
import { useEffect } from 'react';

export default function LeadSuccessPage() {
  const navigate = useNavigate();
  const { clearInquiry } = useInquiry();

  useEffect(() => {
    // Clear inquiry list after successful submission
    clearInquiry();
  }, [clearInquiry]);

  return (
    <div className="container py-16 max-w-2xl">
      <Card className="text-center border-2 border-primary/20">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl md:text-4xl mb-4">
            Message Received.
          </CardTitle>
          <CardDescription className="text-lg">
            Thanks for reaching out to Prasad Enterprise. We have your product list and contact details. Expect a call or email from our team shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <Button
            onClick={() => navigate({ to: '/' })}
            size="lg"
            className="w-full md:w-auto"
          >
            Return to Home
          </Button>
          <p className="text-sm text-muted-foreground">
            Your inquiry has been saved locally and our team will contact you soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

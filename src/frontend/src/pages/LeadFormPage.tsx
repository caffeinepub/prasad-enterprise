import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useInquiry } from '@/hooks/useInquiry';
import { saveSubmission } from '@/storage/submissions';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LeadFormPage() {
  const navigate = useNavigate();
  const { items, getTotalCount } = useInquiry();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
      email: '',
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (getTotalCount() === 0) {
      toast.error('Your inquiry list is empty. Please add products first.');
      return;
    }

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to localStorage
      saveSubmission({
        ...formData,
        products: items,
        timestamp: new Date().toISOString(),
      });

      // Navigate to success page
      navigate({ to: '/success' });
    } catch (error) {
      toast.error('Failed to save submission. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (getTotalCount() === 0) {
    return (
      <div className="container py-16 max-w-2xl text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">No Products Selected</CardTitle>
            <CardDescription>
              Please add products to your inquiry list before submitting the form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate({ to: '/' })}>
              Browse Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12 max-w-3xl">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/inquiry' })}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Inquiry List
      </Button>

      <div className="mb-8">
        <h1 className="text-3d text-3xl md:text-5xl font-bold mb-4 text-foreground">
          Submit Your Inquiry
        </h1>
        <p className="text-lg text-muted-foreground">
          Fill in your details and we'll get back to you shortly
        </p>
      </div>

      <div className="grid gap-6">
        {/* Selected Products Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Selected Products ({getTotalCount()} items)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.productId} className="flex justify-between text-sm">
                  <span>{item.productName}</span>
                  <span className="text-muted-foreground">Qty: {item.quantity}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Your Contact Information</CardTitle>
            <CardDescription>
              Fields marked with * are required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email address"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Home Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your address (optional)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any additional information or questions (optional)"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

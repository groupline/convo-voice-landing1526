import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ContactInfo } from "./ContactInfo";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website: string; // Honeypot field
}

export const ContactForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    website: "", // Honeypot field
  });

  // Rate limiting
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);
  const SUBMISSION_TIMEOUT = 60000; // 1 minute in milliseconds

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot field
    if (formData.website) {
      console.log("Spam detected via honeypot");
      toast({
        title: "Error",
        description: "Form submission failed. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    // Check rate limiting
    const now = Date.now();
    if (lastSubmissionTime && (now - lastSubmissionTime) < SUBMISSION_TIMEOUT) {
      toast({
        title: "Please wait",
        description: "You can only submit the form once per minute.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting form data:", formData);

    try {
      // Save to Supabase customers table
      const { error: supabaseError } = await supabase
        .from('customers')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          notes: formData.message,
          source: 'contact_form',
          status: 'new',
        });

      if (supabaseError) throw supabaseError;

      // Also send to Zapier webhook for existing integration
      const webhookUrl = "https://hooks.zapier.com/hooks/catch/21437851/2fype95/";
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`,
          timestamp: new Date().toISOString(),
          source: window.location.origin,
        }),
      });

      setLastSubmissionTime(now);
      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });
      navigate('/thank-you');
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your phone number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company name"
        />
      </div>

      {/* Honeypot field - hidden from real users */}
      <div className="hidden">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="text"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message"
          rows={4}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};
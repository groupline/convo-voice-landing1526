import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = {
        name: (event.currentTarget.elements.namedItem('Last Name') as HTMLInputElement).value,
        email: (event.currentTarget.elements.namedItem('Email') as HTMLInputElement).value,
        phone: (event.currentTarget.elements.namedItem('Phone') as HTMLInputElement).value,
        message: (event.currentTarget.elements.namedItem('Description') as HTMLTextAreaElement).value,
      };

      // Store submission in Supabase for rate limiting
      const { error: supabaseError } = await supabase
        .from('contact_form_submissions')
        .insert([
          {
            email: formData.email,
            ip_address: 'client-side',
          }
        ]);

      if (supabaseError) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      // Direct API call to Bigin CRM
      const biginResponse = await fetch('https://www.zohoapis.com/bigin/v2/Leads', {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${import.meta.env.VITE_BIGIN_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [{
            Last_Name: formData.name,
            Email: formData.email,
            Phone: formData.phone,
            Description: formData.message,
            Lead_Source: 'Website Contact Form'
          }]
        })
      });

      if (!biginResponse.ok) {
        throw new Error('Failed to create lead in CRM');
      }

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });

      event.currentTarget.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <form 
            className="p-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
              <p className="mt-2 text-sm text-gray-600">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="Last Name"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  id="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="Phone"
                  id="phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="Description"
                  id="message"
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
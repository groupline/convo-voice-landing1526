import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, User, Building2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useRef, useState } from "react";

const RECAPTCHA_SITE_KEY = "6LfTOFApAAAAAIt8oQWuUH_7dgqvXGhHvzqxzI4C";
const BIGIN_FORM_URL = "https://bigin.zoho.com/crm/WebformScriptServlet";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "This field should be empty"),
});

export default function Contact() {
  const { toast } = useToast();
  const recaptchaLoadedRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
      honeypot: "",
    },
  });

  useEffect(() => {
    if (!recaptchaLoadedRef.current) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.onload = () => {
        window.grecaptcha?.ready(() => {
          setRecaptchaReady(true);
        });
      };
      document.head.appendChild(script);
      recaptchaLoadedRef.current = true;
    }
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.honeypot) {
      return;
    }

    if (!recaptchaReady) {
      toast({
        title: "Error",
        description: "Please wait for reCAPTCHA to load",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Get reCAPTCHA token
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });

      // Submit to Supabase edge function
      const { data, error } = await supabase.functions.invoke('contact', {
        body: JSON.stringify({
          ...values,
          captchaToken: token,
        }),
      });

      if (error) {
        throw error;
      }

      // Submit to Bigin form
      const biginFormData = new FormData();
      biginFormData.append('Last Name', values.name);
      biginFormData.append('Accounts.Account Name', values.company);
      biginFormData.append('Email', values.email);
      biginFormData.append('Phone', values.phone);
      biginFormData.append('Description', values.message);

      const biginResponse = await fetch(BIGIN_FORM_URL, {
        method: 'POST',
        body: biginFormData,
      });

      if (!biginResponse.ok) {
        console.warn('Bigin form submission error:', await biginResponse.text());
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="hidden">
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    {...form.register("honeypot")}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Company
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How Can We Help?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your needs..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
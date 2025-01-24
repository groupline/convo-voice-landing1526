import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Map from "@/components/Map";
import { MapPin, Mail, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Add HubSpot form script
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/embed/49067989.js';
    script.defer = true;
    document.body.appendChild(script);

    // Function to handle form submission response
    const handleFormSubmitted = (event: MessageEvent) => {
      if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
        setIsSubmitting(false);
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
        });
        navigate('/thank-you');
      }
    };

    // Add event listener for HubSpot form submission
    window.addEventListener('message', handleFormSubmitted);

    return () => {
      // Cleanup
      const scriptElement = document.querySelector('script[src*="hsforms.net"]');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
      window.removeEventListener('message', handleFormSubmitted);
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-600">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-primary" />
                  <address className="not-italic">
                    1309 Coffeen Avenue STE 1200<br />
                    Sheridan Wyoming 82801
                  </address>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:contact@surgeai.com">contact@surgeai.com</a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-primary" />
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </div>
              </div>

              <Map />
            </div>

            <div>
              <div 
                className="hs-form-frame" 
                data-region="na1" 
                data-form-id="0ba59bc7-6b42-4986-8b6a-ba84da9a8283" 
                data-portal-id="49067989"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <ContactInfo />
            <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-muted rounded-lg">
              <h2 className="text-2xl font-bold text-center">Get Started Today</h2>
              <p className="text-muted-foreground text-center mb-4">
                Ready to transform your business? Fill out our detailed questionnaire to get started.
              </p>
              <Button 
                size="lg"
                className="w-full max-w-md text-lg h-16"
                onClick={() => window.open('https://share.hsforms.com/12nwteMkoRnOdWjl5w6QcVQt7p3p', '_blank')}
              >
                Start Your Journey
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
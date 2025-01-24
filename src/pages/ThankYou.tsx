import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { CheckCircle, Calendar } from "lucide-react";
import { PopupButton } from "react-calendly";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <CheckCircle className="h-24 w-24 text-primary animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold mb-6">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-12">
            We've received your message and will get back to you shortly.
          </p>
          <div className="space-x-4">
            <Link to="/">
              <Button variant="outline" size="lg">
                Return Home
              </Button>
            </Link>
            <PopupButton
              url="https://calendly.com/andrew-surgeai"
              rootElement={document.getElementById("root")!}
              text="Book a Call"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Book a Call
            </PopupButton>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ThankYou;
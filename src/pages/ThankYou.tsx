import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

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
              <Button variant="default" size="lg">
                Return Home
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Send Another Message
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ThankYou;
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Team />
      <Testimonials />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
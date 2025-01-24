import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
            Features
          </a>
          <a href="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </a>
          <a href="/contact" className="text-foreground/80 hover:text-foreground transition-colors">
            Contact
          </a>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="bg-primary hover:bg-primary-dark text-white">
                Book A Call
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px] h-[80vh]">
              <iframe
                src="https://calendly.com/andrew-surgeai"
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};
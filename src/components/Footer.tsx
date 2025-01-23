import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="bg-secondary py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-gray-600">
              Empowering businesses with intelligent AI solutions for growth and efficiency.
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-primary" />
                <address className="not-italic text-sm">
                  1309 Coffeen Avenue STE 1200<br />
                  Sheridan Wyoming 82801
                </address>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:contact@surgeai.com" className="text-sm">contact@surgeai.com</a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+1234567890" className="text-sm">+1 (234) 567-890</a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Quick Links</h3>
            <div className="space-y-2">
              <div><a href="#features" className="text-sm text-gray-600 hover:text-primary">Features</a></div>
              <div><a href="#pricing" className="text-sm text-gray-600 hover:text-primary">Pricing</a></div>
              <div><a href="#about" className="text-sm text-gray-600 hover:text-primary">About Us</a></div>
              <div><a href="#blog" className="text-sm text-gray-600 hover:text-primary">Blog</a></div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              >
                <Twitter className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              >
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section with Privacy Links */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </a>
          </div>
          <div className="mt-4 text-[10px] text-gray-500">
            © 2025 SurgeAi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
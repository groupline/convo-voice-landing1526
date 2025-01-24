import { MapPin, Mail, Phone } from "lucide-react";
import Map from "@/components/Map";

export const ContactInfo = () => {
  return (
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
  );
};
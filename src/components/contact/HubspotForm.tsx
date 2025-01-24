import { useEffect } from 'react';

declare global {
  interface Window {
    hbspt: any;
  }
}

export const HubspotForm = () => {
  useEffect(() => {
    // Load HubSpot script
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    document.head.appendChild(script);

    script.onload = () => {
      // Create form after script loads
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "49067989",
          formId: "da7c2d78-c928-4673-9d5a-3979c3a41c55",
          target: '#hubspot-form-container'
        });
      }
    };

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="hubspot-form-container" className="w-full" />;
};
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <div className="prose max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing our website and using our services, you agree to be bound by these Terms and
            Conditions and agree that you are responsible for compliance with any applicable local laws.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to us at:
          </p>
          <p className="mt-2">
            Email: admin@surgeai.net<br />
            Address:<br />
            SurgeAi<br />
            1309 Coffeen Avenue STE 1200<br />
            Sheridan Wyoming 82801
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software)
            on SurgeAi's website for personal, non-commercial transitory viewing only.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Disclaimer</h2>
          <p>
            The materials on SurgeAi's website are provided on an 'as is' basis. SurgeAi makes no
            warranties, expressed or implied, and hereby disclaims and negates all other warranties
            including, without limitation, implied warranties or conditions of merchantability, fitness
            for a particular purpose, or non-infringement of intellectual property or other violation
            of rights.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitations</h2>
          <p>
            In no event shall SurgeAi or its suppliers be liable for any damages (including, without
            limitation, damages for loss of data or profit, or due to business interruption) arising
            out of the use or inability to use the materials on SurgeAi's website.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
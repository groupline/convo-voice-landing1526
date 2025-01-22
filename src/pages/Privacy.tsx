import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to SurgeAi. We respect your privacy and are committed to protecting your personal data.
            This privacy policy will inform you about how we look after your personal data and tell you about
            your privacy rights and how the law protects you.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Contact Details</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <p className="mt-2">
            Email: admin@surgeai.net<br />
            Address:<br />
            SurgeAi<br />
            1309 Coffeen Avenue STE 1200<br />
            Sheridan Wyoming 82801
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have
            grouped together as follows:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Identity Data</li>
            <li>Contact Data</li>
            <li>Technical Data</li>
            <li>Usage Data</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your
            personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>To provide our services to you</li>
            <li>To improve our services</li>
            <li>To communicate with you</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
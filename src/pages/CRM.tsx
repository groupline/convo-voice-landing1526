import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CRM as CRMComponent } from "@/components/CRM";

const CRM = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4">
        <CRMComponent />
      </main>
      <Footer />
    </div>
  );
};

export default CRM;
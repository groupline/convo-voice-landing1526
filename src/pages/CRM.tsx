import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CRM as CRMComponent } from "@/components/CRM";
import { SalesPipeline } from "@/components/SalesPipeline";
import { CRMSidebar } from "@/components/crm/CRMSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AddContactForm } from "@/components/crm/AddContactForm";

const CRM = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "contacts":
        return <CRMComponent />;
      case "pipeline":
        return <SalesPipeline />;
      case "add":
        return (
          <div className="max-w-4xl mx-auto my-8">
            <AddContactForm onSuccess={() => setActiveTab("contacts")} />
          </div>
        );
      default:
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">CRM Dashboard</h1>
            <p>Welcome to your CRM dashboard. Select a tab from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <CRMSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 container mx-auto px-4">
            {renderContent()}
          </main>
        </div>
      </SidebarProvider>
      <Footer />
    </div>
  );
};

export default CRM;
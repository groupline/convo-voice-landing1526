import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Transform Customer Engagement with{" "}
            <span className="text-primary">AI Voice</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8 animate-fade-in">
            Automate customer interactions across all social platforms with natural voice AI and intelligent responses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg">
              Start Free Trial
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
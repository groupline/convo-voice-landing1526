import { Robot, Sparkles, Clock, DollarSign } from "lucide-react";

const features = [
  {
    icon: Robot,
    title: "AI Task Automation",
    description: "Automate repetitive tasks and workflows with intelligent AI systems",
  },
  {
    icon: Sparkles,
    title: "Lead Generation",
    description: "Generate and qualify leads automatically across multiple channels",
  },
  {
    icon: Clock,
    title: "Time Optimization",
    description: "Save countless hours by automating mundane business processes",
  },
  {
    icon: DollarSign,
    title: "Cost Reduction",
    description: "Reduce operational costs through efficient AI-powered automation",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">AI-Powered Business Solutions</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Transform your business operations with our comprehensive AI automation suite
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
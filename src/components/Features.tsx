import { MessageSquare, Voicemail, Users, ChartBar } from "lucide-react";

const features = [
  {
    icon: Voicemail,
    title: "AI Voice Integration",
    description: "Natural voice interactions powered by advanced AI technology",
  },
  {
    icon: MessageSquare,
    title: "Social Media Management",
    description: "Automated responses across all major social platforms",
  },
  {
    icon: Users,
    title: "Customer Engagement",
    description: "24/7 customer support with personalized interactions",
  },
  {
    icon: ChartBar,
    title: "Lead Generation",
    description: "Convert conversations into qualified leads automatically",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful AI Features</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Transform your customer interactions with our advanced AI solutions
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
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "49",
    features: ["1,000 AI responses/month", "Basic voice integration", "Twitter & Facebook support", "Email support"],
  },
  {
    name: "Professional",
    price: "99",
    popular: true,
    features: [
      "10,000 AI responses/month",
      "Advanced voice integration",
      "All social media platforms",
      "Priority support",
      "Custom AI training",
    ],
  },
  {
    name: "Enterprise",
    price: "249",
    features: [
      "Unlimited AI responses",
      "Premium voice integration",
      "All social media platforms",
      "24/7 dedicated support",
      "Custom AI training",
      "API access",
    ],
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-xl backdrop-blur-sm animate-fade-in ${
                plan.popular
                  ? "bg-primary/5 border-2 border-primary"
                  : "bg-white border border-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              )}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-foreground/80">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-primary hover:bg-primary-dark text-white"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
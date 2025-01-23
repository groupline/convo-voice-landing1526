"use client";

import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, TechStart",
    content: "SurgeAi has transformed our business operations. Their AI solutions have helped us automate complex tasks and improve efficiency by 300%.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CTO, DataFlow",
    content: "The AI-driven lead generation system has revolutionized our sales process. We've seen a 200% increase in qualified leads since implementation.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Operations Director, InnovateCorp",
    content: "The team at SurgeAi doesn't just provide solutions; they're true partners in innovation. Their AI systems have become integral to our daily operations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Discover how our AI solutions are transforming businesses and driving success for our clients
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 animate-fade-in"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-foreground/60">{testimonial.position}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                
                <p className="text-foreground/80 flex-grow">
                  "{testimonial.content}"
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
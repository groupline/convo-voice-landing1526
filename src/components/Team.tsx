"use client";

import { Card } from "@/components/ui/card";

const people = [
  {
    id: 1,
    name: "Sarah Chen",
    designation: "AI Research Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 2,
    name: "Marcus Thompson",
    designation: "ML Engineering Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    designation: "NLP Specialist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 4,
    name: "David Park",
    designation: "AI Solutions Architect",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
  }
];

export const Team = () => {
  return (
    <section id="team" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet Our AI Experts</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Our team of AI specialists combines deep technical expertise with innovative thinking to deliver cutting-edge solutions
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {people.map((person) => (
            <Card
              key={person.id}
              className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 animate-fade-in"
            >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{person.name}</h3>
                <p className="text-foreground/80 text-sm">{person.designation}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
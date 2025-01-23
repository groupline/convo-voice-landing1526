"use client";

import { Card } from "@/components/ui/card";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image: "/placeholder.svg"
  }
];

export const Team = () => {
  return (
    <section id="team" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Our talented team of experts is dedicated to bringing you the best AI solutions
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
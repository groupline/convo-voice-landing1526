"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";

export const Hero = () => {
  const openCalendly = () => {
    window.open('https://calendly.com/andrew-surgeai', '_blank');
  };

  return (
    <section className="pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Transform Your Business with{" "}
            <span className="text-primary">AI Automation</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8 animate-fade-in">
            Empower your business with intelligent AI systems that generate leads autonomously and automate everyday tasks, saving you time and money
          </p>
          <div className="flex justify-center animate-fade-in">
            <Button 
              onClick={openCalendly}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg"
            >
              Book A Call
            </Button>
          </div>
        </div>

        <Card className="w-full h-[500px] relative overflow-hidden border-0 bg-transparent">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex flex-col md:flex-row h-full">
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
              <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#000000] to-[#333333]">
                Intelligent <span className="text-primary">Business</span> Solutions
              </h1>
              <p className="mt-4 text-[#222222] max-w-lg text-lg">
                Our AI systems handle everything from lead generation to task automation, 
                helping your business operate more efficiently while reducing operational costs.
              </p>
            </div>

            <div className="flex-1 relative">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
"use client";

import { Button } from "@/components/ui/button";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export const Hero = () => {
  return (
    <section className="pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Transform Client Engagement with{" "}
            <span className="text-primary">AI Voice</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8 animate-fade-in">
            Automate client interactions across all social platforms with natural voice AI and intelligent responses
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

        <Card className="w-full h-[500px] relative overflow-hidden border-0 bg-transparent">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex h-full">
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
              <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#000000] to-[#333333]">
                <span className="text-primary">AI</span> Voice Assistant
              </h1>
              <p className="mt-4 text-[#222222] max-w-lg text-lg">
                Experience the future of client communication with our intelligent voice AI technology. 
                Seamlessly integrate natural conversations across your platforms.
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
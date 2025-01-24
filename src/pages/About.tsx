import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupButton } from "react-calendly";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-center mb-8">About SurgeAi</h1>
            <p className="text-xl text-center text-foreground/80 max-w-3xl mx-auto mb-16">
              Pioneering the future of AI communication through innovative solutions and expert guidance
            </p>
          </div>
        </section>

        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-lg text-foreground/80">
                  At SurgeAi, we're dedicated to transforming businesses through the power of AI. Our mission is to make advanced AI technology accessible and practical for businesses of all sizes.
                </p>
                <PopupButton
                  url="https://calendly.com/andrew-surgeai"
                  rootElement={document.getElementById("root")!}
                  text="Book A Call"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md"
                />
              </div>
              <div className="relative h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Team collaboration"
                  className="rounded-lg object-cover w-full h-full shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] order-2 md:order-1">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                  alt="AI Technology"
                  className="rounded-lg object-cover w-full h-full shadow-xl"
                />
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <h2 className="text-3xl font-bold">Our Approach</h2>
                <p className="text-lg text-foreground/80">
                  We combine cutting-edge AI technology with deep industry expertise to deliver solutions that drive real business value. Our team of experts works closely with each client to understand their unique challenges and develop customized solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold">Ready to Transform Your Business?</h2>
              <p className="text-lg text-foreground/80">
                Let's discuss how our AI solutions can help your business grow and succeed in the digital age.
              </p>
              <PopupButton
                url="https://calendly.com/andrew-surgeai"
                rootElement={document.getElementById("root")!}
                text="Book A Call"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
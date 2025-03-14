'use client';

import Image from "next/image";
import ContactForm from './components/ContactForm';
import { useState } from 'react';

export default function Home() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#7057A0] to-[#251C6B]"></div>
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-20"></div>
        </div>
        <div className="container relative z-10 px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Image on the left */}
            <div className="w-full lg:w-1/2 relative aspect-square lg:aspect-auto lg:h-[600px]">
              <Image
                src="/assets/images/a-futuristic-scene-with-a-purple-color.jpeg"
                alt="Futuristic AI Scene"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
            {/* Content on the right */}
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <h1 className="heading-1 text-[#FFFFFF] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                You can't unlock AI's power with yesterday's playbook.
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-[#E5E7EB] leading-relaxed">
                The frameworks are outdated.<br/>
                The mindset hasn't caught up.<br/>
                We're here to fix that.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-8">
                <button 
                  onClick={() => setIsContactFormOpen(true)}
                  className="bg-[#7057A0] hover:bg-[#251C6B] text-white text-xl font-bold py-4 px-8 rounded-lg transition-colors"
                >
                  Talk to Us – See AI in Action
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="heading-2 text-[#251C6B] text-3xl md:text-4xl lg:text-5xl font-bold mb-6">What Makes Us Different</h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#7057A0]">
                We're not adapting to AI. We are AI-native.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="border-l-4 border-[#7057A0] pl-8 space-y-4">
                <p className="text-xl md:text-2xl text-[#111827] md:whitespace-nowrap">We work with AI, as a team member — not just a tool.</p>
                <p className="text-xl md:text-2xl text-[#111827] md:whitespace-nowrap">That's not a gimmick. That's how we operate.</p>
                <p className="text-xl md:text-2xl text-[#111827] md:whitespace-nowrap">We believe the only way to understand AI is to work with it every day.</p>
                <p className="text-xl md:text-2xl text-[#111827] md:whitespace-nowrap">That's how we learn faster, build smarter, and stay ahead.</p>
              </div>
              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => setIsContactFormOpen(true)}
                  className="bg-[#7057A0] hover:bg-[#251C6B] text-white text-xl font-bold py-4 px-8 rounded-lg transition-colors"
                >
                  See how we work
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-[#F8F8FF]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="heading-2 text-[#251C6B]">What We Offer</h2>
              <p className="text-2xl font-semibold text-[#7057A0] mt-4">
                We don't just talk about AI. We build with it.
              </p>
              <p className="text-xl text-[#111827] mt-2">
                From idea to agent — fast.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-[#251C6B]">Rapid Use-Case Prototyping</h3>
                <p className="text-lg text-[#111827]">We turn ideas into working prototypes in days, not months.</p>
                <p className="text-lg text-[#7057A0]">Test fast. Validate fast. Scale only what sticks.</p>
              </div>

              <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-[#251C6B]">Operating Model Design</h3>
                <p className="text-lg text-[#111827]">AI changes how you work. We help you change with it.</p>
                <p className="text-lg text-[#7057A0]">Structure, workflows, roles—we rethink your ops for an agentic world.</p>
              </div>

              <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-[#251C6B]">Value Identification</h3>
                <p className="text-lg text-[#111827]">Not all use cases are equal. We map where AI matters.</p>
                <p className="text-lg text-[#7057A0]">Find the buckets: cost reduction, revenue growth, efficiency gains.</p>
              </div>

              <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-[#251C6B]">Agentic AI Systems</h3>
                <p className="text-lg text-[#111827]">We build autonomous agents that think, act, and improve.</p>
                <p className="text-lg text-[#7057A0]">They don't just assist. They operate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Content on the left */}
              <div className="w-full lg:w-1/2 space-y-16 text-center lg:text-left">
                <h2 className="heading-2 text-[#251C6B] text-3xl md:text-4xl lg:text-5xl font-bold">Why Us</h2>
                <div className="space-y-20">
                  <div className="space-y-4">
                    <p className="text-xl md:text-2xl lg:text-3xl text-[#111827] leading-[1.4] md:whitespace-nowrap">
                      We're not here to adapt AI to your old world.
                    </p>
                    <p className="text-xl md:text-2xl lg:text-3xl text-[#111827] leading-[1.4] md:whitespace-nowrap">
                      We help you build the one that comes next.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#7057A0] leading-[1.4] md:whitespace-nowrap">
                      We don't optimize the past.
                    </p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#7057A0] leading-[1.4] md:whitespace-nowrap">
                      We prototype the future.
                    </p>
                  </div>
                </div>
              </div>
              {/* Image on the right */}
              <div className="w-full lg:w-1/2 relative aspect-square lg:aspect-auto lg:h-[600px]">
                <Image
                  src="/assets/images/a-futuristic-image-of-a-startup-working.jpeg"
                  alt="Futuristic Startup Working Scene"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-b from-[#7057A0] to-[#251C6B]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 text-white mb-8">Ready to build what's next?</h2>
            <p className="text-xl text-[#E5E7EB] mb-8">
              No decks. No delays.<br/>
              We build with you — and we build to deploy, at scale, for impact.
            </p>
            <button 
              onClick={() => setIsContactFormOpen(true)}
              className="inline-block px-8 py-3 bg-white text-[#251C6B] hover:bg-[#E5E7EB] transition-colors font-bold rounded-lg"
            >
              Contact us
            </button>
          </div>
        </div>
      </section>

      <ContactForm 
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </div>
  );
}

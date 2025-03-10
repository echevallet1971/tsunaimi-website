'use client';

import Image from "next/image";
import FeatureCard from './components/FeatureCard';
import ContactForm from './components/ContactForm';
import { TeamIcon, ClockIcon, WrenchIcon, CogIcon, SparkleIcon, CheckIcon } from './components/Icons';
import { useState } from 'react';

export default function Home() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#7057A0] to-[#251C6B]"></div>
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-20"></div>
        </div>
        <div className="container relative z-10 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-xl font-semibold text-[#E5E7EB] mb-2">
              TsunAImi was born from a simple realization:
            </p>
            <h1 className="heading-1 text-[#FFFFFF] mb-8">
              You can't unlock AI's power with yesterday's playbook.
            </h1>
            <p className="text-xl md:text-2xl text-[#E5E7EB] mb-8">
              AI isn't just another tool—it's rewriting the rules of how businesses operate. Yet most companies are still using legacy structures and outdated strategies to tackle an AI-driven world.
            </p>
            <div className="border-l-4 border-[#7057A0] bg-[#251C6B] bg-opacity-50 p-6 mb-12 text-left">
              <p className="text-xl md:text-2xl text-[#E5E7EB] font-semibold mb-4">
                At TsunAImi, we're not adapting to AI. We are AI-native.
              </p>
              <p className="text-xl md:text-2xl text-[#E5E7EB]">
                We understand how AI works at its core—the code, the logic, the power—and we know how to turn it into real business impact.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsContactFormOpen(true)}
              className="bg-[#7057A0] hover:bg-[#251C6B] text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Talk to Us - See AI in Action
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="heading-2 text-[#251C6B]">Why TsunAImi?</h2>
              <p className="text-2xl font-semibold text-[#7057A0] mt-4">
                AI is moving fast. Most businesses aren't.
              </p>
            </div>

            <div className="space-y-8">
              <p className="text-xl text-[#111827]">
                Too many companies are stuck in PoCs, experiments, and outdated playbooks—watching AI evolve instead of making it work.
              </p>

              <p className="text-xl text-[#111827]">
                At TsunAImi, we don't just analyze AI trends. We build AI that delivers results.
              </p>

              <div className="space-y-4 bg-[#F8F8FF] p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-[#7057A0] text-xl">🔹</span>
                  <div>
                    <span className="font-semibold text-[#251C6B]">AI-native DNA</span>
                    <span className="text-[#111827]"> – We understand the code, the logic, and the execution of AI.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#7057A0] text-xl">🔹</span>
                  <div>
                    <span className="font-semibold text-[#251C6B]">Agentic AI Expertise</span>
                    <span className="text-[#111827]"> – Beyond chatbots, we develop AI agents that act, not just assist.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#7057A0] text-xl">🔹</span>
                  <div>
                    <span className="font-semibold text-[#251C6B]">Execution Over Theory</span>
                    <span className="text-[#111827]"> – No reports, no slide decks—just real, working AI solutions.</span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-[#7057A0] pl-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#251C6B] mb-2">The Name Says It All.</h3>
                  <p className="text-lg text-[#111827] flex items-center">
                    <span>A tsunami of AI transformation is coming.</span>
                  </p>
                  <p className="text-lg text-[#111827] mt-2">
                    You can either ride the wave—or get wiped out by it.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-lg text-[#111827]">
                    The companies that win in the AI era won't be the ones that experiment the longest.
                  </p>
                  <p className="text-xl font-semibold text-[#251C6B]">
                    They'll be the ones that execute first.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 bg-[#F8F8FF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="flex items-center text-3xl font-bold text-[#251C6B] mb-4">
                <TeamIcon className="w-8 h-8 mr-3 text-[#7057A0]" /> Who We Are
              </h2>
              <h3 className="text-xl font-semibold text-[#7057A0] mb-4">From experimentation to real impact.</h3>
              <p className="text-lg text-[#111827]">
                TsunAImi helps businesses go beyond PoCs and pilot projects, deploying Agentic AI to transform how they operate and create value. We build autonomous AI agents that don't just assist but execute tasks and make decisions at scale.
              </p>
            </div>

            <div>
              <h2 className="flex items-center text-3xl font-bold text-[#251C6B] mb-4">
                <ClockIcon className="w-8 h-8 mr-3 text-[#7057A0]" /> Why Now?
              </h2>
              <h3 className="text-xl font-semibold text-[#7057A0] mb-4">Generative AI is mainstream. AI impact is not.</h3>
              <p className="text-lg text-[#111827]">
                Despite massive investments in AI, most companies remain stuck in proof-of-concepts and experiments. The real challenge isn't technology—it's an operating model shift. AI must be embedded in strategy, operations, and decision-making to generate real business value.
              </p>
            </div>

            <div>
              <h2 className="flex items-center text-3xl font-bold text-[#251C6B] mb-4">
                <WrenchIcon className="w-8 h-8 mr-3 text-[#7057A0]" /> What We Do
              </h2>
              <h3 className="text-xl font-semibold text-[#7057A0] mb-4">Bridging the gap between innovation and execution.</h3>
              <p className="text-lg text-[#111827]">
                We combine deep business expertise with cutting-edge AI knowledge, backed by a network of top-tier tech partners. Our goal? To turn AI potential into scalable, measurable impact—fast.
              </p>
            </div>

            <div>
              <h2 className="flex items-center text-3xl font-bold text-[#251C6B] mb-4">
                <CogIcon className="w-8 h-8 mr-3 text-[#7057A0]" /> How We Do It
              </h2>
              <h3 className="text-xl font-semibold text-[#7057A0] mb-4">Tailored. Pragmatic. Execution-driven.</h3>
              <p className="text-lg text-[#111827]">
                AI isn't one-size-fits-all. Every organization has a unique culture, challenges, and constraints. We co-design AI strategies with our clients to ensure adoption, scalability, and real impact—without the usual hype.
              </p>
            </div>

            <div>
              <h2 className="flex items-center text-3xl font-bold text-[#251C6B] mb-4">
                <SparkleIcon className="w-8 h-8 mr-3 text-[#7057A0]" /> What Makes Us Different?
              </h2>
              <ul className="space-y-4 text-lg text-[#111827]">
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 mr-2 mt-0.5 text-[#7057A0]" />
                  <span><strong>Agentic AI expertise</strong> – Beyond chatbots, we build AI agents that work autonomously.</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 mr-2 mt-0.5 text-[#7057A0]" />
                  <span><strong>Impact over theory</strong> – No endless pilots. No slides. Just real, working AI.</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 mr-2 mt-0.5 text-[#7057A0]" />
                  <span><strong>Execution-first mindset</strong> – AI that delivers results, not just promises.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-b from-[#7057A0] to-[#251C6B]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 text-white mb-8">Ready to transform your business?</h2>
            <p className="text-xl text-[#E5E7EB] mb-8">
              Our mission is to replace PowerPoints with real AI-driven solutions—helping businesses prototype, deploy, and scale Agentic AI in ways that actually make an impact.
            </p>
            <button 
              onClick={() => setIsContactFormOpen(true)}
              className="inline-block px-8 py-3 bg-white text-[#251C6B] hover:bg-[#E5E7EB] transition-colors font-bold rounded-lg"
            >
              Let's talk about your project
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

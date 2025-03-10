export default function About() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-[#483475] overflow-hidden">
        <div className="container relative z-10">
          <h1 className="heading-1 text-[#FFFFFF] mb-6 text-center">
            Why TsunAImi?
          </h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-lg text-[#111827]">
              AI is evolving faster than ever, but most businesses are still thinking about AI the wrong way. The old 3-tier application structure is dead—it simply doesn't work for Agentic AI.
            </p>
            
            <p className="text-lg text-[#111827]">
              For the past 20+ years, I've worked in consulting, startups, and emerging tech—from VR to GenAI. I've seen firsthand how companies struggle to move beyond AI hype and into real execution.
            </p>

            <div className="py-8">
              <p className="text-xl font-semibold text-[#483475] mb-4">
                TsunAImi was born from a simple realization:
              </p>
              <p className="text-2xl font-bold text-[#483475]">
                You can't unlock the power of AI with yesterday's playbook.
              </p>
            </div>

            <p className="text-lg text-[#111827]">
              Our mission? To replace PowerPoints with real AI-driven solutions—helping businesses prototype, deploy, and scale Agentic AI in ways that actually make an impact.
            </p>

            <div className="pt-8">
              <a 
                href="mailto:contact@tsunaimi.ai" 
                className="inline-block bg-[#5B4B8A] hover:bg-[#483475] text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Want to know more? Let's talk.
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
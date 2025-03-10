import Link from 'next/link';

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7057A0] to-[#251C6B] flex items-center justify-center px-4 pt-16">
      <div className="text-center">
        <span className="inline-block text-[#E5E7EB] text-lg mb-2">Our Vision</span>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Coming Soon
        </h1>
        <p className="text-xl md:text-2xl text-[#E5E7EB] mb-8 max-w-2xl">
          We're crafting our vision for the future of AI. Check back soon to learn how we're reshaping business with Agentic AI.
        </p>
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-white text-[#251C6B] hover:bg-[#E5E7EB] transition-colors font-bold rounded-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 
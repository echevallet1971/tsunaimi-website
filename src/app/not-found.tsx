import Link from 'next/link';

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7057A0] to-[#251C6B] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Coming Soon
        </h1>
        <p className="text-xl md:text-2xl text-[#E5E7EB] mb-8 max-w-2xl">
          We're working on something exciting! This section will be available soon.
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
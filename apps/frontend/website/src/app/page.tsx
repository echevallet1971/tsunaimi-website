import { ASK_MY_ENVOY_URL } from '@/lib/urls';
import Header from './components/Header';
import Footer from './components/Footer';

export default function RootPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-start md:items-center justify-center bg-gradient-to-b from-[#7057A0] to-[#251C6B] px-4 pt-24 pb-16 md:pt-16 md:py-24">
        <section className="max-w-3xl text-center text-white space-y-8 md:space-y-10">
          <h1 className="heading-1">TsunAImi was where this started.</h1>
          <p className="text-lg md:text-xl text-[#E5E7EB] leading-relaxed">
            What began as an experiment in building agentic systems eventually
            led to a much more focused product: Ask My Envoy.
          </p>
          <p className="text-lg md:text-xl text-[#E5E7EB] leading-relaxed">
            Today, all development is focused on making meeting coordination
            something people no longer have to do manually.
          </p>
          <a
            href={ASK_MY_ENVOY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-white text-[#251C6B] hover:bg-[#E5E7EB] transition-colors font-bold rounded-lg text-lg shadow-lg"
          >
            Discover Ask My Envoy &rarr;
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
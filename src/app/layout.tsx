import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Logo from "./components/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TsunAImi - Agentic AI Solutions",
  description: "Built with AI. Deployed for impact.",
  other: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <footer className="bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-start justify-center">
                <div className="mb-4">
                  <Logo variant="full" />
                </div>
                <p className="text-[#251C6B] text-base">
                  Built with AI. Deployed for impact.
                </p>
              </div>
              <div className="flex flex-col items-end justify-center">
                <h3 className="text-xl font-bold mb-4 text-[#251C6B]">Connect</h3>
                <div className="text-[#251C6B] text-base text-right">
                  <p className="mb-1">Don't watch the AI wave. Ride it.</p>
                  <p>Follow us on{' '}
                    <a 
                      href="https://www.linkedin.com/company/tsunaimi" 
                      className="text-[#7057A0] hover:text-[#251C6B] transition-colors font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-[#7057A0] text-center text-[#251C6B]">
              <p>&copy; {new Date().getFullYear()} TsunAImi. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

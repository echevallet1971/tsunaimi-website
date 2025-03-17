import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TsunAImi - Agentic AI Solutions",
  description: "Built with AI. Deployed for impact.",
  other: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
};

// This is a server component, so we can't access the URL directly
// The actual lang attribute will be set in the [locale] layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

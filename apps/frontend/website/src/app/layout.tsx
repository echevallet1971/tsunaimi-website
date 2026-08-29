import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TsunAImi | Ask My Envoy",
  description: "TsunAImi has become Ask My Envoy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

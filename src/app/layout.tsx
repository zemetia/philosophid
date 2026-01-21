
import type { Metadata } from "next";
import { Literata, Space_Grotesk } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ClientLayout } from "@/components/ClientLayout";

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Philoshopid | Rational Clarity",
  description: "We seek the immutable logic within the chaos of the digital manifold.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
         literata.variable,
         spaceGrotesk.variable,
         "antialiased min-h-screen selection:bg-[#4E6E81] selection:text-white"
        )}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
        <div className="noise-overlay"></div>
      </body>
    </html>
  );
}

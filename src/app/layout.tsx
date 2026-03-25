
import type { Metadata } from "next";
import { Literata, Space_Grotesk, Crimson_Text } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { PageTemplate } from "../components/templates/PageTemplate";

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Philoshopid | Rational Clarity",
  description: "We seek the immutable logic within the chaos of the digital manifold.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

import { AuthProvider } from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";

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
         crimsonText.variable,
         "antialiased min-h-screen selection:bg-[#4E6E81] selection:text-white"
        )}
      >
        <AuthProvider>
          <QueryProvider>
            <PageTemplate>
              {children}
            </PageTemplate>
          </QueryProvider>
        </AuthProvider>
        <div className="noise-overlay"></div>
      </body>
    </html>
  );
}


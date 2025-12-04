// app/layout.tsx
import "../globals.css";

import type { Metadata } from "next";
import {
  Schibsted_Grotesk,
  Martian_Mono,
} from "next/font/google";

import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";
import ClickSpark from "@/components/ClickSpark";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXT event app",
  description: "The hub for dev events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen bg-black antialiased`}
      >
        <Navbar />
        <ClickSpark
          sparkColor="#59deca"
          sparkSize={15}
          sparkRadius={20}
          sparkCount={8}
          duration={400}
        >
          

          {/* Light rays background */}
          <div className="absolute inset-0 z-[-1] min-h-screen">
            <LightRays
              raysOrigin="top-center-offset"
              raysColor="#5df4a6"
              raysSpeed={1}
              lightSpread={0.8}
              rayLength={3}
              followMouse={true}
              mouseInfluence={0.1}
              distortion={0}
              className="custom-rays"
            />
          </div>

          <main>
            
            {children}</main>
        </ClickSpark>
      </body>
    </html>
  );
}

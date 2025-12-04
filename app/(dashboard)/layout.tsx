// app/layout.tsx
import "../globals.css";

import type { Metadata } from "next";
import {
  Schibsted_Grotesk,
  Martian_Mono,
} from "next/font/google";

import LightRays from "@/components/LightRays";
import NavbarDash from "@/components/NavbarDash";
import ClickSpark from "@/components/ClickSpark";
import { UserProvider } from "@/context/UserContext";

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
        <NavbarDash />
       
<UserProvider>
  

          <main>
            
            {children}</main>
</UserProvider>
        
      </body>
    </html>
  );
}

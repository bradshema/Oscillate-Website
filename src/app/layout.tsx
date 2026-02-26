import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oscillate Genesis | Premium Portfolio",
  description: "Highly immersive, premium portfolio website focusing on 3D integration, fluid animations, and a luxurious liquid glass interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <NoiseOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

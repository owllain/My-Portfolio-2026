import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alvaro Enrique Cascante | Full Stack Developer Portfolio",
  description:
    "Portfolio de Alvaro Enrique Cascante Moraga — Ingeniero en Informática, Full Stack Developer especializado en .NET, React y automatización de procesos. San José, Costa Rica.",
  keywords: [
    "Alvaro Enrique Cascante",
    "Full Stack Developer",
    ".NET",
    "React",
    "Power Platform",
    "Costa Rica",
    "Software Engineer",
  ],
  authors: [{ name: "Alvaro Enrique Cascante Moraga" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Alvaro Enrique Cascante | Full Stack Developer",
    description:
      "Ingeniero en Informática especializado en desarrollo de aplicaciones y automatización de procesos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

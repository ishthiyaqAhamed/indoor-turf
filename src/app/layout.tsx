import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClientNav, ClientFooter } from "@/components/ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACM Indoor Turf | Premium Futsal Experience",
  description: "Book Sri Lanka's most luxurious indoor futsal turf. ACM Indoor Turf established 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ClientNav />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <ClientFooter />
      </body>
    </html>
  );
}

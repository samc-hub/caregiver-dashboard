import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Fragment_Mono } from "next/font/google";
import "./globals.css";
import { NavLinks } from "@/components/NavLinks";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Caregiver Dashboard",
  description: "A calm morning snapshot for caregivers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${fragmentMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-10 border-b border-border bg-background">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span
                aria-hidden
                className="inline-block h-2.5 w-2.5 rounded-full bg-accent-soft ring-2 ring-inset ring-accent/30 transition-transform group-hover:scale-110"
              />
              <span className="text-base font-medium tracking-tight">
                Caregiver Dashboard
              </span>
            </Link>
            <NavLinks />
          </div>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="mt-16 border-t border-border">
          <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>Comfort, Care, Connection — a demo project.</p>
            <p className="font-mono">Content managed in Sanity</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

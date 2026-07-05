import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { NavbarAuth } from "@/components/marketing/navbar-auth";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 w-full bg-white/5 backdrop-blur-md border-b border-white/40 shadow-sm">
        <div className="mx-auto flex items-center justify-between h-[80px] max-w-[1400px] px-6 lg:px-[80px]">

          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M12 22C16.97 22 21 17.97 21 13C16.03 13 12 8.97 12 4C12 8.97 7.97 13 3 13C7.97 13 12 17.97 12 22Z" />
                <path d="M12 22C14.97 22 18 19.97 18 13C15.03 13 12 10.97 12 6C12 10.97 8.97 13 6 13C8.97 13 12 19.97 12 22Z" />
                <path d="M12 22V13" />
              </svg>
              <div className="flex flex-col">
                <span className="text-[20px] leading-[1.1] font-bold text-[#D4A017] font-heading tracking-tight">Divine Daily</span>
                <span className="text-[10px] text-[#9A9A9A] font-medium tracking-tight">Daily Blessings, Delivered</span>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-semibold text-[#1F1F1F]">
            <Link href="/features" className="transition-colors hover:text-[#D4A017]">Features</Link>
            <Link href="/how-it-works" className="transition-colors hover:text-[#D4A017]">How It Works</Link>
            <Link href="/pricing" className="transition-colors hover:text-[#D4A017]">Pricing</Link>
            <Link href="/testimonials" className="transition-colors hover:text-[#D4A017]">Testimonials</Link>
            <Link href="/faq" className="transition-colors hover:text-[#D4A017]">FAQs</Link>
            <Link href="/contact" className="transition-colors hover:text-[#D4A017]">Contact</Link>
          </nav>

          <NavbarAuth />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[#E8E8E8] py-8 bg-white/40 backdrop-blur-xl mt-0">
        <div className="mx-auto flex flex-col items-center justify-between gap-4 md:flex-row max-w-[1400px] px-6 lg:px-[80px]">
          <p className="text-center text-sm text-[#9A9A9A] md:text-left">
            &copy; {new Date().getFullYear()} Divine Daily. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

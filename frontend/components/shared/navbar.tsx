"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarAuth } from "@/components/marketing/navbar-auth";
import { MobileNav } from "@/components/marketing/mobile-nav";

const navLinks = [
  { title: "Features", href: "/features" },
  { title: "How It Works", href: "/how-it-works" },
  { title: "Pricing", href: "/pricing" },
  { title: "FAQs", href: "/faq" },
  { title: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-white/40 shadow-sm">
      <div className="mx-auto flex items-center justify-between h-[80px] max-w-[1400px] px-6 lg:px-[80px]">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M12 22C16.97 22 21 17.97 21 13C16.03 13 12 8.97 12 4C12 8.97 7.97 13 3 13C7.97 13 12 17.97 12 22Z" />
              <path d="M12 22C14.97 22 18 19.97 18 13C15.03 13 12 10.97 12 6C12 10.97 8.97 13 6 13C8.97 13 12 19.97 12 22Z" />
              <path d="M12 22V13" />
            </svg>
            <div className="flex flex-col shrink-0">
              <span className="text-[18px] md:text-[20px] leading-[1.1] font-bold text-[#D4A017] font-heading tracking-tight whitespace-nowrap">Divine Daily</span>
              <span className="hidden sm:block text-[10px] text-[#9A9A9A] font-medium tracking-tight whitespace-nowrap mt-0.5">Daily Blessings, Delivered</span>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-[#D4A017] ${isActive ? "text-[#D4A017]" : "text-[#1F1F1F]"}`}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 lg:gap-4">
          <NavbarAuth />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

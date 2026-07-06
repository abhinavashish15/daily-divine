"use client";

import Link from "next/link";
import { Menu, LogOut, LayoutDashboard } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MobileNav() {
  const { isAuthenticated, logout, isInitialized } = useAuthStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  const closeMenu = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="text-[#1F1F1F] hover:bg-black/5 p-2 rounded-md transition-colors flex items-center justify-center">
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="right" className="bg-[#FCFBF8] p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex flex-col h-full py-6 px-8">
            <div className="flex items-center space-x-2 mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M12 22C16.97 22 21 17.97 21 13C16.03 13 12 8.97 12 4C12 8.97 7.97 13 3 13C7.97 13 12 17.97 12 22Z" />
                <path d="M12 22C14.97 22 18 19.97 18 13C15.03 13 12 10.97 12 6C12 10.97 8.97 13 6 13C8.97 13 12 19.97 12 22Z" />
                <path d="M12 22V13" />
              </svg>
              <span className="text-[18px] leading-[1.1] font-bold text-[#D4A017] font-heading tracking-tight">Divine Daily</span>
            </div>

            <nav className="flex flex-col space-y-6 text-[16px] font-semibold text-[#1F1F1F]">
              <Link href="/features" onClick={closeMenu} className="transition-colors hover:text-[#D4A017]">Features</Link>
              <Link href="/how-it-works" onClick={closeMenu} className="transition-colors hover:text-[#D4A017]">How It Works</Link>
              <Link href="/pricing" onClick={closeMenu} className="transition-colors hover:text-[#D4A017]">Pricing</Link>
              <Link href="/faq" onClick={closeMenu} className="transition-colors hover:text-[#D4A017]">FAQs</Link>
              <Link href="/contact" onClick={closeMenu} className="transition-colors hover:text-[#D4A017]">Contact</Link>
            </nav>

            <div className="mt-auto border-t border-[#E8E8E8] pt-6 flex flex-col space-y-6 text-[16px] font-semibold text-[#1F1F1F]">
              {isInitialized && isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={closeMenu} className="flex items-center transition-colors hover:text-[#D4A017]">
                    <LayoutDashboard className="mr-3 h-5 w-5 text-[#D4A017]" />
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="flex items-center text-left transition-colors hover:text-[#D4A017]">
                    <LogOut className="mr-3 h-5 w-5 text-[#D4A017]" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={closeMenu} className="transition-colors hover:text-[#D4A017]">Login</Link>
                  <Link href="/register" onClick={closeMenu} className="transition-colors hover:text-[#D4A017]">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

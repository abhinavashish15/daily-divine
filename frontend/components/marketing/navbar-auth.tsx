"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

export function NavbarAuth() {
  const { isAuthenticated, isInitialized, user } = useAuthStore();

  // Don't render anything until zustand hydration is complete to prevent mismatch
  if (!isInitialized) {
    return (
      <div className="flex items-center gap-4 w-[240px]">
         {/* Placeholder to prevent layout shift */}
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard" 
          className="hidden sm:flex items-center text-[15px] font-semibold text-[#1F1F1F] hover:text-[#D4A017] transition-colors"
        >
          Hi, {(user.name || "User").split(" ")[0]}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/login">
        <Button
          variant="outline"
          className="hidden sm:flex h-[44px] px-7 rounded-[14px] bg-white/50 backdrop-blur-sm border-white/60 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-[14px] font-semibold text-[#1F1F1F] hover:bg-white/80 transition-all"
        >
          Login
        </Button>
      </Link>
      <Link href="/register">
        <Button
          className="h-[44px] px-6 rounded-[14px] bg-gradient-to-r from-[#D4A017] to-[#E2BB53] hover:opacity-90 text-white text-[14px] font-semibold shadow-[0_8px_20px_rgba(212,160,23,0.3)] border border-white/20 transition-all flex items-center"
        >
          Start Free Trial
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}

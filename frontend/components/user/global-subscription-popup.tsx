"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { dashboardService } from "@/services/dashboard.service";
import { usePathname } from "next/navigation";

export function GlobalSubscriptionPopup() {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only check once per session when authenticated and initialized
    if (isInitialized && isAuthenticated && !hasChecked) {
      const checkSubscription = async () => {
        try {
          const dashboardData = await dashboardService.getUserDashboard();
          if (!dashboardData?.subscription) {
            setShowPopup(true);
          }
        } catch (error) {
          // If fetch fails but they are logged in, we can show it anyway as fallback
          setShowPopup(true);
        } finally {
          setHasChecked(true);
        }
      };

      checkSubscription();
    }
  }, [isAuthenticated, isInitialized, hasChecked]);

  // Don't show on the pricing page itself to avoid annoyance while they are already looking at plans
  if (!showPopup || pathname === "/pricing") return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 animate-in slide-in-from-top-8 fade-in w-[90%] max-w-[380px]">
      <div className="bg-[#FCFBF8]/80 backdrop-blur-2xl bg-[url('/herosection.png')] bg-cover bg-center rounded-[24px] p-5 w-full relative shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#D4A017]/30 overflow-hidden">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-xl z-0" />
        
        <div className="relative z-10 flex flex-row items-start gap-4 text-left">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A017] to-[#E2BB53] flex items-center justify-center shrink-0 shadow-lg shadow-[#D4A017]/20 border-[2px] border-white mt-1">
            <span className="text-xl">✨</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-heading text-lg font-bold text-[#1F1F1F] leading-tight">
                Divine Blessings
              </h3>
              <button 
                onClick={() => setShowPopup(false)}
                className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-gray-500 -mt-1 -mr-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[#5E5E5E] text-[13px] font-medium leading-relaxed mb-4">
              Subscribe for personalized daily prayers & beautiful greetings on WhatsApp.
            </p>
            <Link href="/pricing" className="block w-full" onClick={() => setShowPopup(false)}>
              <Button className="w-full h-[40px] rounded-[12px] bg-gradient-to-r from-[#D4A017] to-[#E2BB53] hover:opacity-90 text-white font-bold text-[13px] shadow-sm transition-all border border-white/20">
                View Divine Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

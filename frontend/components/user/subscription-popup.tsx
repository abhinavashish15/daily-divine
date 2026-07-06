import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SubscriptionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionPopup({ isOpen, onClose }: SubscriptionPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300 animate-in fade-in zoom-in-95">
      <div className="bg-[#FCFBF8] bg-[url('/herosection.png')] bg-cover bg-center rounded-[32px] p-8 max-w-[360px] w-full relative shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#D4A017]/30 overflow-hidden">
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl z-0" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <button 
            onClick={onClose}
            className="absolute -top-4 -right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A017] to-[#E2BB53] flex items-center justify-center mb-6 shadow-lg shadow-[#D4A017]/20 border-[3px] border-white">
            <span className="text-3xl">✨</span>
          </div>
          
          <h2 className="font-heading text-2xl font-bold text-[#1F1F1F] mb-3 leading-tight">
            Welcome Divine Blessings
          </h2>
          <p className="text-[#5E5E5E] text-[14px] font-medium leading-relaxed mb-8">
            Subscribe today to receive personalized daily prayers, beautiful devotional images, and festival greetings directly on your WhatsApp.
          </p>
          
          <Link href="/pricing" className="w-full">
            <Button className="w-full h-[48px] rounded-[16px] bg-gradient-to-r from-[#D4A017] to-[#E2BB53] hover:opacity-90 text-white font-bold text-[15px] shadow-[0_8px_25px_rgba(212,160,23,0.3)] transition-all border border-white/20">
              View Divine Plans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

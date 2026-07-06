import { FadeIn } from "@/components/shared/FadeIn";
import { Mail, MessageSquare, Phone } from "lucide-react";

export const metadata = {
  title: "Contact Us - Divine Daily",
  description: "Get in touch with the Divine Daily team.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 bg-[#FCFBF8] bg-[url('/mobile_background.png')] lg:bg-[url('/herosection.png')] bg-cover bg-center bg-fixed bg-no-repeat relative overflow-hidden py-4">
      {/* Full Background Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-white/30 z-0"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-[1400px]">
        <FadeIn className="text-center mb-8 flex flex-col items-center">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#1F1F1F] mb-4 leading-tight">Get in Touch</h1>
          <p className="text-[14px] md:text-[15px] text-[#5E5E5E] max-w-2xl mx-auto font-medium leading-relaxed px-4">
            Have a question or need support? We're here to help you on your spiritual journey.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="max-w-lg mx-auto">
          <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-[28px] p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex flex-col items-center text-center space-y-6">
            <div>
              <h3 className="font-heading text-xl font-bold text-[#1F1F1F] mb-1">Contact Information</h3>
              <p className="text-[#9A9A9A] text-[13px]">Reach out to us directly through any of the channels below.</p>
            </div>

            <div className="w-full space-y-3">
              <div className="flex flex-col md:flex-row items-center gap-4 bg-white/50 border border-white/60 rounded-[16px] p-4 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#FBF3DC] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#D4A017]" />
                </div>
                <div className="md:text-left text-center">
                  <p className="text-[11px] font-bold text-[#9A9A9A] uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-[15px] font-bold text-[#1F1F1F]">abhinavashissh@gmail.com</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 bg-white/50 border border-white/60 rounded-[16px] p-4 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#FBF3DC] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#D4A017]" />
                </div>
                <div className="md:text-left text-center">
                  <p className="text-[11px] font-bold text-[#9A9A9A] uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="text-[15px] font-bold text-[#1F1F1F]">+91 63765 06645</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 bg-white/50 border border-white/60 rounded-[16px] p-4 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#FBF3DC] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-[#D4A017]" />
                </div>
                <div className="md:text-left text-center">
                  <p className="text-[11px] font-bold text-[#9A9A9A] uppercase tracking-wider mb-0.5">WhatsApp Support</p>
                  <p className="text-[15px] font-bold text-[#1F1F1F]">+91 63765 06645</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

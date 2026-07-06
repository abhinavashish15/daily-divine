"use client";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/FadeIn";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlayCircle, Star, ShieldCheck, CalendarHeart, Globe, MessageCircle, ArrowRight,
  Image as ImageIcon, Sparkles, Gift, Clock, Heart,
  UserPlus, Sliders, CheckCircle, MessageSquare, Users, ChevronLeft, ChevronRight
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center bg-[#FCFBF8] bg-[url('/mobile_background.png')] lg:bg-[url('/herosection.png')] bg-cover bg-center bg-fixed bg-no-repeat min-h-screen relative overflow-hidden">
      {/* Hero Background Wrapper */}
      <div className="w-full relative flex flex-col justify-center pt-12 pb-16 lg:pb-20">
        {/* Hero Section Container */}
        <section className="w-full max-w-[1400px] mx-auto px-6 lg:px-[80px] relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* LEFT SIDE (50%) */}
          <div className="w-full lg:col-span-6 flex flex-col items-start text-left relative z-20 mt-4 lg:mt-0">
            <FadeIn className="w-full bg-white/30 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 sm:p-8 lg:p-0 rounded-[24px] lg:rounded-none border border-white/40 lg:border-none shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:shadow-none">
              <div className="inline-flex items-center rounded-full bg-[#FBF3DC] px-[18px] py-[8px] text-[12px] font-bold text-[#D4A017] mb-6 shadow-[0_2px_10px_rgba(212,160,23,0.1)]">
                <span className="mr-2">✨</span> Start Your Day with Divine Blessings
              </div>

              <h1 className="font-heading text-[42px] md:text-[52px] lg:text-[60px] font-bold text-[#1F1F1F] leading-[1.1] md:leading-[1.1] tracking-[-0.02em] mb-6">
                Receive Daily Divine <br className="hidden md:block" />
                Blessings on <span className="text-[#D4A017]">WhatsApp</span>
              </h1>

              <p className="font-sans text-[16px] md:text-[18px] text-[#5E5E5E] leading-[30px] max-w-[480px] font-medium mb-10">
                Start every morning with beautiful devotional images, AI-generated captions, prayers, and festival greetings delivered directly to your WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-[12px] w-full sm:w-auto mb-12">
                <Link href="/register">
                  <Button
                    className="w-full sm:w-auto h-[50px] px-[28px] rounded-[16px] bg-gradient-to-r from-[#D4A017] to-[#E2BB53] hover:opacity-90 text-white text-[15px] font-bold shadow-[0_8px_25px_rgba(212,160,23,0.3)] border border-white/20 transition-all flex items-center justify-center group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-[50px] px-[28px] rounded-[12px] border-[#E8E8E8] bg-white text-[15px] font-bold text-[#1F1F1F] transition-all hover:bg-[#F9F9F9] flex items-center justify-center"
                  >
                    View Demo
                    <PlayCircle className="ml-2 h-5 w-5 text-[#1F1F1F]" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT SIDE (Empty as requested) */}
          <div className="hidden lg:block lg:col-span-6">
          </div>
        </section>
      </div>

      {/* 2. Features Section (8-Card Grid) */}
      <section className="w-full max-w-[1400px] mx-auto px-6 lg:px-[80px] pt-10 pb-4 text-center">
        <div className="w-full bg-white/30 backdrop-blur-xl rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-8 md:p-12 border border-white/40">
          <FadeIn>
            <span className="text-[12px] font-bold text-[#D4A017] tracking-[0.15em] uppercase mb-4 block">Features</span>
            <h2 className="font-heading text-[28px] md:text-[32px] font-bold text-[#1F1F1F] leading-tight mb-10">
              Everything You Need for a Divine Start
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ImageIcon, title: "Daily Images", desc: "Beautiful devotional images of deities delivered daily." },
              { icon: Sparkles, title: "AI Captions", desc: "Thoughtful captions generated using AI." },
              { icon: Gift, title: "Festival Greetings", desc: "Special greetings for all major Hindu festivals." },
              { icon: Clock, title: "Personalized Schedule", desc: "Choose your delivery time that suits you." },
              { icon: Heart, title: "Favorite Deities", desc: "Select your favorite deities and get personalized content." },
              { icon: Globe, title: "Multiple Languages", desc: "Receive messages in English, Hindi, Sanskrit & more." },
              { icon: MessageCircle, title: "WhatsApp Delivery", desc: "Delivered directly to your WhatsApp every day." },
              { icon: ShieldCheck, title: "Secure & Private", desc: "Your data and preferences are 100% safe with us." },
            ].map((feat, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="bg-white/30 backdrop-blur-xl rounded-[20px] p-5 border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col items-center text-center h-full group">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#FBF3DC]/80 flex items-center justify-center text-[#D4A017] mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white/50">
                    <feat.icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h4 className="font-bold text-[#1F1F1F] text-[15px] mb-2">{feat.title}</h4>
                  <p className="text-[#9A9A9A] text-[13px] leading-[20px]">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="w-full max-w-[1400px] mx-auto px-6 lg:px-[80px] pt-8 pb-8 mb-10 text-center">
        <div className="w-full bg-white/30 backdrop-blur-xl rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-8 md:p-12 border border-white/40">
          <FadeIn>
            <span className="text-[12px] font-bold text-[#D4A017] tracking-[0.15em] uppercase mb-4 block">How It Works</span>
            <h2 className="font-heading text-[28px] md:text-[32px] font-bold text-[#1F1F1F] leading-tight mb-14">
              Simple Steps to Daily Blessings
            </h2>
          </FadeIn>

          <div className="relative flex flex-col md:flex-row justify-between items-start max-w-[1000px] mx-auto">
            {/* Connecting Dotted Line (Hidden on Mobile) */}
            <div className="hidden md:block absolute top-[30px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#E8E8E8] z-0" />

            {[
              { step: "1. Sign Up", icon: UserPlus, desc: "Create your account in just a few seconds." },
              { step: "2. Choose Preferences", icon: Sliders, desc: "Select deities, language, and delivery time." },
              { step: "3. Subscribe", icon: CheckCircle, desc: "Choose a plan and complete payment." },
              { step: "4. Receive Blessings", icon: MessageSquare, desc: "Get daily devotional messages on your WhatsApp." },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.2 * i} className="relative z-10 flex flex-col items-center w-full md:w-[22%] mb-12 md:mb-0">
                <div className="w-[60px] h-[60px] rounded-full bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#D4A017] mb-4">
                  <item.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-bold text-[#1F1F1F] text-[14px] mb-2">{item.step}</h4>
                <p className="text-[#9A9A9A] text-[12px] leading-[18px] px-2">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

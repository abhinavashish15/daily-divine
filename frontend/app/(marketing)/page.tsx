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
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center bg-[#FCFBF8] bg-[url('/herosection.png')] bg-cover bg-center bg-fixed bg-no-repeat min-h-screen relative overflow-hidden">
      {/* Hero Background Wrapper */}
      <div className="w-full relative flex flex-col justify-center pt-12 pb-16 lg:pb-20">
        {/* Hero Section Container */}
        <section className="w-full max-w-[1400px] mx-auto px-6 lg:px-[80px] relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* LEFT SIDE (50%) */}
          <div className="w-full lg:col-span-6 flex flex-col items-start text-left relative z-20">
            <FadeIn>
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
                    Start Free Trial
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

              {/* Social Proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="w-[40px] h-[40px] border-[2px] border-white shadow-sm rounded-full bg-[#E8E8E8]">
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 20}`} alt={`User ${i}`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-[14px] h-[14px] fill-[#FDBA12] text-[#FDBA12]" />
                    ))}
                  </div>
                  <span className="text-[12px] font-medium text-[#9A9A9A]">Trusted by 2,500+ devotees</span>
                </div>
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
        <div className="w-full bg-white/40 backdrop-blur-xl rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-8 md:p-12 border border-white/60">
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
                <div className="bg-white/40 backdrop-blur-xl rounded-[20px] p-5 border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col items-center text-center h-full group">
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
        <div className="w-full bg-white/40 backdrop-blur-xl rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-8 md:p-12 border border-white/60">
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
                <div className="w-[60px] h-[60px] rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#D4A017] mb-4">
                  <item.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-bold text-[#1F1F1F] text-[14px] mb-2">{item.step}</h4>
                <p className="text-[#9A9A9A] text-[12px] leading-[18px] px-2">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Stats Strip */}
      <section className="w-full max-w-[1200px] mx-auto px-6 pt-0 pb-12 mb-10">
        <FadeIn>
          <div className="w-full bg-white/40 backdrop-blur-xl rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] py-5 px-8 border border-white/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:divide-x divide-[#E8E8E8]">
            {[
              { num: "2,500+", text: "Happy Devotees", icon: Users },
              { num: "75,000+", text: "Messages Delivered", icon: MessageCircle },
              { num: "4.9/5", text: "Average Rating", icon: Star },
              { num: "99.9%", text: "Delivery Success", icon: ShieldCheck },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-3 justify-center text-center md:text-left">
                <div className="w-[42px] h-[42px] rounded-full bg-[#FBF3DC]/80 flex items-center justify-center text-[#D4A017] shrink-0 border border-white/50">
                  <stat.icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#1F1F1F] text-[20px] tracking-tight">{stat.num}</h4>
                  <p className="text-[#9A9A9A] text-[11px] font-medium">{stat.text}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 5. Testimonials Section */}
      <section className="w-full max-w-[1400px] mx-auto px-6 lg:px-[80px] pb-10 text-center relative">
        <div className="w-full bg-white/40 backdrop-blur-xl rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-8 md:p-12 border border-white/60 relative">
          <FadeIn>
            <span className="text-[12px] font-bold text-[#D4A017] tracking-[0.15em] uppercase mb-4 block">Testimonials</span>
            <h2 className="font-heading text-[28px] md:text-[32px] font-bold text-[#1F1F1F] leading-tight mb-12">
              Loved by Devotees Everywhere
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Navigation Arrows */}
            <button className="absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 w-[44px] h-[44px] rounded-full bg-white/60 backdrop-blur-sm border border-[#E8E8E8] shadow-sm flex items-center justify-center text-[#1F1F1F] hover:bg-[#F9F9F9] z-10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 w-[44px] h-[44px] rounded-full bg-white/60 backdrop-blur-sm border border-[#E8E8E8] shadow-sm flex items-center justify-center text-[#1F1F1F] hover:bg-[#F9F9F9] z-10 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Divine Daily has become a beautiful part of my morning routine. The images and messages bring peace and positivity every day.",
                  name: "Anjali Sharma", location: "Bengaluru, Karnataka", img: "21"
                },
                {
                  quote: "The AI-generated captions are so meaningful. It feels like a personal blessing every single morning.",
                  name: "Rahul Verma", location: "Pune, Maharashtra", img: "11"
                },
                {
                  quote: "I love how I can customize my preferences. The festival greetings are always on time and beautiful.",
                  name: "Meera Iyer", location: "Chennai, Tamil Nadu", img: "5"
                }
              ].map((t, i) => (
                <FadeIn key={i} delay={0.2 * i}>
                  <div className="bg-white/40 backdrop-blur-xl rounded-[20px] p-6 border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-left flex flex-col h-full relative">
                    <p className="text-[#5E5E5E] text-[14px] leading-[24px] mb-6 flex-grow">
                      &quot;{t.quote}&quot;
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-[#FDBA12] text-[#FDBA12]" />)}
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-[44px] h-[44px]">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${t.img}`} />
                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <h5 className="font-bold text-[#1F1F1F] text-[14px]">{t.name}</h5>
                        <span className="text-[#9A9A9A] text-[11px] font-medium">{t.location}</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

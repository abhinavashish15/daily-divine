import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pricing - Divine Daily",
  description: "Choose the perfect plan for your daily devotional journey.",
};

const plans = [
  {
    name: "Weekly",
    price: "₹19",
    duration: "per week",
    description: "Perfect for a quick, focused spiritual boost.",
    features: [
      "Up to 3 Deities",
      "Daily Morning Image",
      "AI Generated Captions",
      "English & Hindi",
    ],
    buttonText: "Subscribe Weekly",
    highlighted: false,
  },
  {
    name: "Monthly",
    price: "₹59",
    duration: "per month",
    description: "The complete daily spiritual experience.",
    features: [
      "Unlimited Deities",
      "Daily Image & Prayers",
      "AI Captions & Greetings",
      "All Languages",
      "Custom Delivery Time",
    ],
    buttonText: "Get Monthly",
    highlighted: true,
  },
  {
    name: "Yearly",
    price: "₹649",
    duration: "per year",
    description: "Uninterrupted blessings for the entire year.",
    features: [
      "Everything in Monthly",
      "Up to 5 WhatsApp Numbers",
      "Individual Preferences",
      "Priority Support",
    ],
    buttonText: "Choose Yearly",
    highlighted: false,
  },
];

const compareFeatures = [
  { name: "Daily Devotional Image", basic: true, premium: true, family: true },
  { name: "Deity Selection", basic: "Up to 3", premium: "Unlimited", family: "Unlimited" },
  { name: "AI Generated Captions", basic: true, premium: true, family: true },
  { name: "Language Support", basic: "Eng, Hin", premium: "All", family: "All" },
  { name: "Festival Greetings", basic: false, premium: true, family: true },
  { name: "Custom Delivery Time", basic: false, premium: true, family: true },
  { name: "Daily Prayers & Mantras", basic: false, premium: true, family: true },
  { name: "Multiple Recipients", basic: false, premium: false, family: "Up to 5" },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center bg-[#FCFBF8] bg-[url('/mobile_background.png')] lg:bg-[url('/herosection.png')] bg-cover bg-center bg-fixed bg-no-repeat min-h-[calc(100vh-80px)] relative overflow-hidden pt-8 pb-24">
      {/* Full Background Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-white/30 z-0"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-[1400px]">
        <FadeIn className="text-center mb-16 flex flex-col items-center pt-8">
          <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F1F1F] mb-4 leading-tight">
            Invest in Your Daily Peace
          </h1>
          <p className="text-[15px] md:text-[16px] text-[#5E5E5E] font-medium leading-relaxed px-4">
            Select a plan to welcome uninterrupted blessings, personalized prayers, and beautiful devotional images into your everyday life.
          </p>
        </FadeIn>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
          {plans.map((plan, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={`flex flex-col h-full p-8 rounded-[24px] border backdrop-blur-2xl transition-all duration-300 ${plan.highlighted ? 'bg-white/80 border-[#D4A017]/40 shadow-[0_12px_40px_rgba(212,160,23,0.15)] scale-105 z-10 relative' : 'bg-white/50 border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]'}`}>
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#D4A017] to-[#E2BB53] text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#1F1F1F] mb-2">{plan.name}</h3>
                  <p className="text-[#9A9A9A] text-sm h-10 leading-relaxed">{plan.description}</p>
                </div>
                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tight text-[#1F1F1F]">{plan.price}</span>
                  <span className="text-[#9A9A9A] font-medium">{plan.duration}</span>
                </div>
                <ul className="flex-1 space-y-4 mb-10">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="w-[20px] h-[20px] rounded-full bg-[#FBF3DC] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#D4A017] stroke-[3]" />
                      </div>
                      <span className="text-[15px] font-medium text-[#5E5E5E]">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard/billing" className="w-full mt-auto">
                  <Button size="lg" className={`w-full rounded-[16px] h-[52px] text-[15px] font-bold transition-all ${plan.highlighted ? 'bg-gradient-to-r from-[#D4A017] to-[#E2BB53] hover:opacity-90 text-white shadow-[0_8px_25px_rgba(212,160,23,0.3)] border border-white/20' : 'bg-white text-[#1F1F1F] hover:bg-[#F9F9F9] border border-[#E8E8E8]'}`}>
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Comparison Table */}
        <FadeIn delay={0.4}>
          <div className="max-w-5xl mx-auto bg-white/40 backdrop-blur-xl rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-8 md:p-12 border border-white/40">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-center text-[#1F1F1F] mb-12">Compare Plans in Detail</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#E8E8E8]">
                    <th className="p-5 font-bold text-[#9A9A9A] text-[13px] uppercase tracking-wider">Features</th>
                    <th className="p-5 font-bold text-[#1F1F1F] text-center text-[15px]">Weekly</th>
                    <th className="p-5 font-bold text-[#D4A017] text-center text-[15px]">Monthly</th>
                    <th className="p-5 font-bold text-[#1F1F1F] text-center text-[15px]">Yearly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E8]/50">
                  {compareFeatures.map((feat, i) => (
                    <tr key={i} className="hover:bg-white/20 transition-colors">
                      <td className="p-5 font-medium text-[#5E5E5E] text-[15px]">{feat.name}</td>
                      {[feat.basic, feat.premium, feat.family].map((val, j) => (
                        <td key={j} className="p-5 text-center">
                          {typeof val === 'boolean' ? (
                            val ? (
                              <div className="w-[24px] h-[24px] rounded-full bg-[#FBF3DC] mx-auto flex items-center justify-center">
                                <Check className="w-4 h-4 text-[#D4A017] stroke-[3]" />
                              </div>
                            ) : (
                              <X className="w-5 h-5 mx-auto text-[#9A9A9A]/30 stroke-[2]" />
                            )
                          ) : (
                            <span className="text-[14px] font-bold text-[#1F1F1F]">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

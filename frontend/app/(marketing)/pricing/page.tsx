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
    name: "Free Trial",
    price: "₹0",
    duration: "for 7 days",
    description: "Experience the peace before committing.",
    features: [
      "1 Deity Selection",
      "Daily Morning Image",
      "Standard Caption",
      "English Language",
    ],
    buttonText: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Basic",
    price: "₹99",
    duration: "per month",
    description: "Perfect for a simple, focused daily devotion.",
    features: [
      "Up to 3 Deities",
      "Daily Morning Image",
      "AI Generated Captions",
      "English & Hindi",
    ],
    buttonText: "Subscribe Basic",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "₹199",
    duration: "per month",
    description: "The complete spiritual experience.",
    features: [
      "Unlimited Deities",
      "Daily Image & Prayers",
      "AI Captions & Greetings",
      "All Languages",
      "Custom Delivery Time",
    ],
    buttonText: "Get Premium",
    highlighted: true,
  },
  {
    name: "Family",
    price: "₹499",
    duration: "per month",
    description: "Share the blessings with your loved ones.",
    features: [
      "Everything in Premium",
      "Up to 5 WhatsApp Numbers",
      "Individual Preferences",
      "Priority Support",
    ],
    buttonText: "Choose Family",
    highlighted: false,
  },
];

const compareFeatures = [
  { name: "Daily Devotional Image", free: true, basic: true, premium: true, family: true },
  { name: "Deity Selection", free: "1", basic: "Up to 3", premium: "Unlimited", family: "Unlimited" },
  { name: "AI Generated Captions", free: false, basic: true, premium: true, family: true },
  { name: "Language Support", free: "English", basic: "Eng, Hin", premium: "All", family: "All" },
  { name: "Festival Greetings", free: false, basic: false, premium: true, family: true },
  { name: "Custom Delivery Time", free: false, basic: false, premium: true, family: true },
  { name: "Daily Prayers & Mantras", free: false, basic: false, premium: true, family: true },
  { name: "Multiple Recipients", free: false, basic: false, premium: false, family: "Up to 5" },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center py-24 bg-background min-h-screen">
      <div className="container px-4 md:px-6 mx-auto">
        <FadeIn className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that best fits your spiritual journey. Start with a free trial and upgrade anytime.
          </p>
        </FadeIn>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-24">
          {plans.map((plan, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={`flex flex-col h-full p-8 rounded-3xl border transition-all ${plan.highlighted ? 'bg-primary/5 border-primary shadow-xl scale-105 z-10 relative' : 'bg-card border-border/50 shadow-sm'}`}>
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm h-10">{plan.description}</p>
                </div>
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tighter">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.duration}</span>
                </div>
                <ul className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="w-full mt-auto">
                  <Button size="lg" className="w-full rounded-full" variant={plan.highlighted ? "default" : "outline"}>
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Comparison Table */}
        <FadeIn delay={0.4}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-10">Compare Plans in Detail</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="p-4 font-semibold text-muted-foreground">Features</th>
                    <th className="p-4 font-semibold text-center">Free Trial</th>
                    <th className="p-4 font-semibold text-center">Basic</th>
                    <th className="p-4 font-semibold text-center text-primary">Premium</th>
                    <th className="p-4 font-semibold text-center">Family</th>
                  </tr>
                </thead>
                <tbody>
                  {compareFeatures.map((feat, i) => (
                    <tr key={i} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                      <td className="p-4 font-medium">{feat.name}</td>
                      {[feat.free, feat.basic, feat.premium, feat.family].map((val, j) => (
                        <td key={j} className="p-4 text-center">
                          {typeof val === 'boolean' ? (
                            val ? <Check className="w-5 h-5 mx-auto text-primary" /> : <X className="w-5 h-5 mx-auto text-muted-foreground/30" />
                          ) : (
                            <span className="text-sm font-medium">{val}</span>
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

import { FadeIn } from "@/components/shared/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "FAQ - Divine Daily",
  description: "Frequently asked questions about Divine Daily.",
};

const faqs = [
  {
    question: "How does Divine Daily work?",
    answer: "Once you sign up and set your preferences, our system automatically sends a devotional message to your WhatsApp at your chosen time every day. It includes a high-quality image, an AI-generated caption, and a daily prayer."
  },
  {
    question: "Can I choose multiple deities?",
    answer: "Yes! Depending on your plan, you can choose multiple deities. On the Basic plan, you have a limited selection, while Premium and Family plans allow unlimited deity selections."
  },
  {
    question: "What languages are supported?",
    answer: "Currently, we support English, Hindi, and Sanskrit. You can choose your preferred language in your dashboard preferences."
  },
  {
    question: "Is my WhatsApp number secure?",
    answer: "Absolutely. We only use your WhatsApp number to deliver your daily blessings and transactional notifications. We never share your data with third parties."
  },
  {
    question: "Can I change my delivery time?",
    answer: "Yes, Premium and Family plan subscribers can customize their delivery time down to the minute. Basic users receive messages at a standard morning hour."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription at any time directly from your dashboard under the 'My Subscription' tab. There are no cancellation fees."
  }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col items-center py-24 bg-background min-h-screen">
      <div className="container px-4 md:px-6 mx-auto max-w-4xl">
        <FadeIn className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about the product and billing.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
            <Accordion className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="rounded-full">Contact Support</Button>
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}

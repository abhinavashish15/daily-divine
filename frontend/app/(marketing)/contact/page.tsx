import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Phone } from "lucide-react";

export const metadata = {
  title: "Contact Us - Divine Daily",
  description: "Get in touch with the Divine Daily team.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center py-24 bg-background min-h-screen">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <FadeIn className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question or need support? We're here to help you on your spiritual journey.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeIn delay={0.1} className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Contact Information</h3>
              <p className="text-muted-foreground mb-6">Fill out the form and our team will get back to you within 24 hours.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-lg">support@divinedaily.app</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-lg">+91 (800) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">WhatsApp Support</p>
                  <p className="text-lg">+91 (800) 123-4567</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-lg">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="h-12 bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="h-12 bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="h-12 bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message here..." className="min-h-[120px] bg-muted/50 resize-none" />
                </div>
                <Button type="button" size="lg" className="w-full h-12 text-base rounded-xl">
                  Send Message
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

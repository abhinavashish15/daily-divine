"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    try {
      setIsLoading(true);
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Welcome, Admin");
        // Redirect to dashboard
        router.push("/admin");
        router.refresh();
      } else {
        toast.error(data.error || "Invalid password");
        setPassword("");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20">
      <FadeIn className="w-full max-w-sm px-4">
        <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
          
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Admin Portal</h1>
            <p className="text-muted-foreground text-sm">Enter the master password to access the dashboard</p>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="h-11 bg-muted/50" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            
            <Button disabled={isLoading || !password} type="submit" className="w-full h-11 text-base rounded-xl mt-4">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Access Dashboard
            </Button>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}

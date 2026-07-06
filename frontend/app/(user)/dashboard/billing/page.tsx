"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QrCode, UploadCloud, Loader2 } from "lucide-react";
import Image from "next/image";
import { paymentService } from "@/services/payment.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const plans = [
  { id: "basic", name: "Basic", price: 19 },
  { id: "premium", name: "Premium", price: 49 },
  { id: "family", name: "Family", price: 129 },
];

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const selectedPlanDetails = plans.find((p) => p.id === selectedPlan);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId) {
      toast.error("Please enter a Transaction ID");
      return;
    }

    try {
      setIsSubmitting(true);
      await paymentService.submitPayment({
        plan: selectedPlan.toUpperCase(),
        amount: selectedPlanDetails?.price || 0,
        transactionId,
      });
      toast.success("Payment submitted successfully! Waiting for admin approval.");
      router.push("/dashboard/subscription");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto p-4 sm:p-8 overflow-y-auto h-full w-full pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upgrade Your Plan</h1>
        <p className="text-muted-foreground mt-2">Choose a plan, scan the QR code to pay, and submit your transaction ID.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Select a Plan</CardTitle>
            <CardDescription>Choose the subscription tier that suits you.</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
              {plans.map((plan) => (
                <div key={plan.id} className="flex items-center justify-between space-x-2 border p-4 rounded-lg bg-card cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setSelectedPlan(plan.id)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={plan.id} id={plan.id} />
                    <Label htmlFor={plan.id} className="cursor-pointer font-medium">{plan.name}</Label>
                  </div>
                  <span className="font-bold">₹{plan.price}/mo</span>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Make Payment</CardTitle>
              <CardDescription>Scan using any UPI app to pay ₹{selectedPlanDetails?.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-border flex items-center justify-center w-48 h-48 relative overflow-hidden">
                <Image src="/qr.jpeg" alt="UPI QR Code" fill className="object-contain p-2" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">UPI ID: mrabhinav1289@ibl</p>
                <p className="text-xs text-muted-foreground mt-1">Please pay the exact amount of ₹{selectedPlanDetails?.price}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submit Payment Details</CardTitle>
              <CardDescription>Enter the UTR or Transaction ID generated after payment.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transactionId">Transaction ID / UTR</Label>
                  <Input 
                    id="transactionId" 
                    placeholder="e.g. 123456789012" 
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit for Verification
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

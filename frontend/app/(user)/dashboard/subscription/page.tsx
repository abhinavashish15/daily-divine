"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { dashboardService, UserDashboardData } from "@/services/dashboard.service";
import { toast } from "sonner";
import { format } from "date-fns";

export default function SubscriptionPage() {
  const { user } = useAuthStore();
  const [data, setData] = useState<UserDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await dashboardService.getUserDashboard();
        setData(dashboardData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast.error("Failed to load subscription data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const hasActiveSubscription = !!data?.subscription;
  const planName = data?.subscription?.plan || (user?.role === 'ADMIN' ? 'Admin' : 'Free');

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
        <p className="text-muted-foreground mt-2">Manage your current plan and billing history.</p>
      </div>

      <Card className="border-primary/20 shadow-md">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the {planName} plan.</CardDescription>
        </CardHeader>
        <CardContent>
          {hasActiveSubscription ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Your subscription is active.</span>
              </div>
              {data.subscription?.renewalDate && (
                <p className="text-sm text-muted-foreground">
                  Your plan will renew on {format(new Date(data.subscription.renewalDate), 'MMMM dd, yyyy')}.
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-primary">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">You need an active subscription to receive daily messages.</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/billing" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              {hasActiveSubscription ? "Change Plan" : "Upgrade Plan"}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

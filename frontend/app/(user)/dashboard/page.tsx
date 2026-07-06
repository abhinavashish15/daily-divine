"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Image as ImageIcon, MessageCircle, Settings, Play, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/auth.store";
import { dashboardService, UserDashboardData } from "@/services/dashboard.service";
import { toast } from "sonner";
import { format, addDays } from "date-fns";

export default function DashboardHomePage() {
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
        toast.error("Failed to load dashboard data");
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

  const planName = data?.subscription?.plan || "Free";
  const statusLabel = data?.subscription ? "Active" : "Inactive";
  const statusColor = data?.subscription 
    ? "bg-green-500/10 text-green-600 border-green-500/20" 
    : "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
    
  const deliveryTime = "06:00 AM";
  const deitiesCount = data?.preference?.preferredDeities?.length || 0;
  const deitiesNames = data?.preference?.preferredDeities?.join(", ") || "None selected";

  return (
    <div className="space-y-4 md:space-y-6 flex flex-col h-full max-h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
          Welcome, {user?.name ? user.name.split(" ")[0] : "User"}
        </h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={`text-sm px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md ${statusColor}`}>
            Status: {statusLabel}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 shrink-0">
        <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border-white/30 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Current Plan</CardTitle>
            <div className="p-2 bg-white/50 dark:bg-black/50 rounded-xl shadow-sm">
              <Settings className="h-4 w-4 text-gray-700 dark:text-gray-200" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{planName}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {data?.subscription?.renewalDate 
                ? `Renews on ${format(new Date(data.subscription.renewalDate), 'MMM dd, yyyy')}` 
                : "Upgrade to a paid plan"}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border-white/30 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Next Delivery</CardTitle>
            <div className="p-2 bg-white/50 dark:bg-black/50 rounded-xl shadow-sm">
              <Clock className="h-4 w-4 text-gray-700 dark:text-gray-200" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{deliveryTime}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {data?.subscription ? "Scheduled for tomorrow" : "Requires active plan"}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border-white/30 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Favorite Deities</CardTitle>
            <div className="p-2 bg-white/50 dark:bg-black/50 rounded-xl shadow-sm">
              <ImageIcon className="h-4 w-4 text-gray-700 dark:text-gray-200" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{deitiesCount} Selected</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{deitiesNames}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 min-h-0 relative">
        <Card className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-2xl border-white/30 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-3xl flex flex-col overflow-hidden">
          <CardHeader className="shrink-0 bg-white/20 dark:bg-black/20 border-b border-white/20 dark:border-white/10">
            <CardTitle className="text-lg">Upcoming Schedule</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">Your preferred deities lineup.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="p-6 space-y-4">
              {data?.preference?.preferredDeities && data.preference.preferredDeities.length > 0 ? (
                data.preference.preferredDeities.slice(0, 3).map((deity, index) => (
                  <div key={index} className="flex items-center p-4 rounded-2xl bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 transition-colors border border-white/20 dark:border-white/10 shadow-sm">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-semibold leading-none capitalize text-gray-900 dark:text-gray-100">{deity}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{deliveryTime} Delivery</p>
                    </div>
                    <div className="ml-auto flex flex-col items-end">
                      <Badge variant="secondary" className="bg-white/50 dark:bg-black/50 text-xs">
                        {index === 0 ? "Tomorrow" : `In ${index + 1} days`}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-sm text-gray-500 dark:text-gray-400 py-12">
                  <div className="p-4 bg-white/30 dark:bg-black/30 rounded-full mb-4">
                    <Calendar className="h-8 w-8 opacity-50" />
                  </div>
                  <p>You haven't selected any deities yet.</p>
                  <p className="mt-1">Head to preferences to set up your schedule.</p>
                </div>
              )}
              {data?.preference?.festivalEnabled && (
                <div className="flex items-center p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 border border-amber-500/20 shadow-sm mt-4">
                  <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <span className="text-lg">🎉</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-semibold leading-none text-amber-700 dark:text-amber-400">Next Festival</p>
                    <p className="text-xs text-amber-600/70 dark:text-amber-400/70">Special Delivery</p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-amber-700 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                    Auto-scheduled
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

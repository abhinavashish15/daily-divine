"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Image as ImageIcon, MessageCircle, Settings, Play } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";

export default function DashboardHomePage() {
  const { user } = useAuthStore();
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {user?.name ? user.name.split(" ")[0] : "User"}
        </h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm px-3 py-1 bg-green-500/10 text-green-600 border-green-500/20">
            Status: Active
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Premium</div>
            <p className="text-xs text-muted-foreground">Renews on Oct 24, 2026</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Delivery</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">07:00 AM</div>
            <p className="text-xs text-muted-foreground">Tomorrow morning</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Received</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+7 in the last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite Deities</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Selected</div>
            <p className="text-xs text-muted-foreground">Shiva, Ganesha, Hanuman</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Your recently received devotional images.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square sm:aspect-video bg-muted rounded-xl border overflow-hidden group flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardDescription>What to expect in the coming days.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Monday - Lord Shiva</p>
                <p className="text-sm text-muted-foreground">07:00 AM Delivery</p>
              </div>
              <div className="ml-auto font-medium text-sm">Tomorrow</div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Tuesday - Lord Hanuman</p>
                <p className="text-sm text-muted-foreground">07:00 AM Delivery</p>
              </div>
              <div className="ml-auto font-medium text-sm text-muted-foreground">In 2 days</div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none text-primary">🎉 Diwali Special</p>
                <p className="text-sm text-muted-foreground">Goddess Lakshmi</p>
              </div>
              <div className="ml-auto font-medium text-sm text-primary">In 4 days</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

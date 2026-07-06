"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { adminService, AdminDashboardStats } from "@/services/admin.service";
import { toast } from "sonner";
import { Loader2, Users, IndianRupee, Calendar } from "lucide-react";

export default function AdminPage() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getDashboardStats();
      setStats(data.data);
    } catch (error) {
      toast.error("Failed to fetch dashboard stats");
    } finally {
      setIsLoading(false);
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan.toUpperCase()) {
      case "WEEKLY":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Weekly</Badge>;
      case "MONTHLY":
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none">Monthly</Badge>;
      case "YEARLY":
        return <Badge className="bg-[#D4A017]/20 text-[#D4A017] hover:bg-[#D4A017]/30 border-none">Yearly</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-500">Free</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-2">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of users, subscriptions, and revenue.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white/40 backdrop-blur-xl border border-white/40 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats?.totalRevenue.toLocaleString() || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">From all approved payments</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/40 backdrop-blur-xl border border-white/40 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers.toLocaleString() || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="bg-white/40 backdrop-blur-xl border border-white/40 shadow-sm">
        <CardHeader>
          <CardTitle>User Subscriptions</CardTitle>
          <CardDescription>A detailed list of all users and their current subscription status.</CardDescription>
        </CardHeader>
        <CardContent>
          {stats?.users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No users found.
            </div>
          ) : (
            <div className="rounded-md border bg-white/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Details</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Active Plan</TableHead>
                    <TableHead className="text-right">Days Left</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats?.users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium text-[#1F1F1F]">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                        {user.phone && user.phone !== 'N/A' && (
                          <div className="text-xs text-muted-foreground">{user.phone}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={user.role === 'ADMIN' ? 'bg-black text-white' : ''}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getPlanBadge(user.plan)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end font-medium">
                          {user.daysLeft > 0 ? (
                            <>
                              <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                              <span className={user.daysLeft <= 3 ? "text-orange-500" : "text-green-600"}>
                                {user.daysLeft} days
                              </span>
                            </>
                          ) : (
                            <span className="text-muted-foreground text-sm">Expired / None</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

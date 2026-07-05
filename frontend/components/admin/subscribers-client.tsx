"use client";

import { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { apiClient } from '@/lib/api-client';

type User = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  receiveAutomatedMessages: boolean;
  createdAt: string;
};

export function SubscribersClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiClient.get('/users');
        setUsers(res.data);
      } catch {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleAutomation = async (id: string, currentValue: boolean) => {
    const newValue = !currentValue;
    // Optimistic UI update
    setUsers(users.map(u => u.id === id ? { ...u, receiveAutomatedMessages: newValue } : u));
    
    try {
      await apiClient.patch(`/users/${id}/automation`, { 
        receiveAutomatedMessages: newValue 
      });
      toast.success(newValue ? 'Automation Enabled' : 'Automation Paused');
    } catch {
      toast.error('Failed to update settings');
      // Revert UI on failure
      setUsers(users.map(u => u.id === id ? { ...u, receiveAutomatedMessages: currentValue } : u));
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <Card className="shadow-lg border-primary/10">
      <CardHeader className="bg-primary/5 pb-8">
        <CardTitle className="text-2xl font-bold tracking-tight">Automation Subscribers</CardTitle>
        <CardDescription>
          Manage which users receive daily WhatsApp blessings. Unsubscribed users will not be targeted by the morning cron job.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold pl-6">User</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Joined</TableHead>
                <TableHead className="text-right font-semibold pr-6">Send Daily Blessings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                    No users registered yet.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} className="group hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium pl-6 py-4">{user.name || 'Anonymous'}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell className="text-muted-foreground">{user.phone || 'No Phone'}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <span className={`text-sm font-medium ${user.receiveAutomatedMessages ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                          {user.receiveAutomatedMessages ? 'Active' : 'Paused'}
                        </span>
                        <Switch 
                          checked={user.receiveAutomatedMessages} 
                          onCheckedChange={() => toggleAutomation(user.id, user.receiveAutomatedMessages)}
                          className={user.receiveAutomatedMessages ? "data-[state=checked]:bg-green-500" : ""}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { logService, SystemLog } from "@/services/log.service";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle, Info } from "lucide-react";

export default function LogsPage() {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const data = await logService.getSystemLogs();
      setLogs(data.data || []);
    } catch (error) {
      toast.error("Failed to fetch system logs");
    } finally {
      setIsLoading(false);
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes("APPROVED")) return <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />;
    if (action.includes("REJECTED")) return <XCircle className="w-4 h-4 text-red-500 mr-2" />;
    return <Info className="w-4 h-4 text-blue-500 mr-2" />;
  };

  const getActionBadge = (action: string) => {
    if (action.includes("APPROVED")) return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">{action}</Badge>;
    if (action.includes("REJECTED")) return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">{action}</Badge>;
    return <Badge variant="outline">{action}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Logs</h1>
        <p className="text-muted-foreground mt-2">View a complete history of system actions, including payment approvals and rejections.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>The most recent 100 actions performed in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No system logs found.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getActionBadge(log.action)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center font-medium">
                          {getActionIcon(log.action)}
                          {log.message}
                        </div>
                        {log.metadata && (
                          <div className="mt-1 text-xs text-muted-foreground ml-6 font-mono bg-muted p-1 rounded inline-block">
                            {JSON.stringify(log.metadata)}
                          </div>
                        )}
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

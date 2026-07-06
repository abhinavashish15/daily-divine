"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { paymentService, Payment } from "@/services/payment.service";
import { toast } from "sonner";
import { Check, X, Loader2 } from "lucide-react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setIsLoading(true);
      const data = await paymentService.getPendingPayments();
      setPayments(data.data || []);
    } catch (error) {
      toast.error("Failed to fetch payments");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (id: string) => {
    try {
      setActionId(id);
      await paymentService.verifyPayment(id);
      toast.success("Payment verified and subscription activated");
      fetchPayments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to verify payment");
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setActionId(id);
      await paymentService.rejectPayment(id);
      toast.success("Payment rejected");
      fetchPayments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reject payment");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments Verification</h1>
        <p className="text-muted-foreground mt-2">Approve or reject manual UPI payments submitted by users.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Payments</CardTitle>
          <CardDescription>Review the transaction IDs against your bank statement.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : payments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending payments to review.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div className="font-medium">{payment.user?.name || "User"}</div>
                        <div className="text-xs text-muted-foreground">{payment.user?.email}</div>
                        {payment.user?.phone && <div className="text-xs text-muted-foreground">{payment.user.phone}</div>}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="uppercase">{payment.plan}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">₹{payment.amount}</TableCell>
                      <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                          onClick={() => handleVerify(payment.id)}
                          disabled={actionId === payment.id}
                        >
                          {actionId === payment.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                          onClick={() => handleReject(payment.id)}
                          disabled={actionId === payment.id}
                        >
                          {actionId === payment.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4 mr-1" />}
                          Reject
                        </Button>
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

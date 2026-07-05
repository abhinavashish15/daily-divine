import { SubscribersClient } from '@/components/admin/subscribers-client';

export default function SubscribersPage() {
  return (
    <div className="flex flex-col gap-8 p-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Manage Subscribers
        </h1>
        <p className="text-muted-foreground text-lg">
          Control automated message delivery for your users.
        </p>
      </div>
      
      <SubscribersClient />
    </div>
  );
}

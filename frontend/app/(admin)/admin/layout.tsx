"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { 
  BarChart, 
  Users, 
  Image as ImageIcon, 
  MessageSquare, 
  Calendar,
  Send,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sidebarNavItems = [
  { title: "Dashboard", href: "/admin", icon: BarChart },
  { title: "Subscribers", href: "/admin/subscribers", icon: Users },
  { title: "Image Library", href: "/admin/images", icon: ImageIcon },
  { title: "AI Captions", href: "/admin/caption-generator", icon: MessageSquare },
  { title: "Scheduler", href: "/admin/scheduler", icon: Calendar },
  { title: "Campaigns", href: "/admin/campaigns", icon: Send },
  { title: "Payments", href: "/admin/payments", icon: CreditCard },
  { title: "Delivery Logs", href: "/admin/logs", icon: FileText },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // If not logged in, or not an admin, redirect
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'ADMIN') {
      toast.error("You do not have permission to access the admin portal");
      router.push('/dashboard');
    }
  }, [user, router, pathname, mounted]);

  const handleLogout = async () => {
    try {
      logout();
      toast.success("Logged out successfully");
      router.push('/login');
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  // Prevent rendering until hydrated and verified
  if (!mounted || !user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-16 items-center px-6 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tighter text-primary">
              Admin Portal
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {sidebarNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="p-4 mt-auto border-t">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-4 text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
          <div className="md:hidden flex items-center gap-4">
            <Sheet>
              <SheetTrigger className="text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-muted transition-colors flex items-center justify-center">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 flex flex-col">
                <div className="flex h-16 items-center px-6 border-b">
                  <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tighter text-primary">
                      Admin Portal
                    </span>
                  </Link>
                </div>
                <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                  {sidebarNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </nav>
                <div className="p-4 mt-auto border-t">
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-4 text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground transition-colors mt-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/admin" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tighter text-primary">
                Admin
              </span>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">Admin User</div>
          </div>
        </header>
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

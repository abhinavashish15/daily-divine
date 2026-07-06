"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { 
  LayoutDashboard, 
  CreditCard, 
  Settings, 
  History, 
  User, 
  HelpCircle,
  LogOut,
  Menu
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Subscription",
    href: "/dashboard/subscription",
    icon: CreditCard,
  },
  {
    title: "Preferences",
    href: "/dashboard/preferences",
    icon: Settings,
  },
  {
    title: "Message History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-16 items-center px-6 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tighter text-primary">
              Divine Daily
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
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
        <div className="p-4 mt-auto">
          <Separator className="my-4" />
          <div className="space-y-1">
            <Link href="/dashboard/support" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <HelpCircle className="h-4 w-4" />
              Support
            </Link>
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6 md:hidden">
           <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tighter text-primary">
              Divine Daily
            </span>
          </Link>
          <Sheet>
            <SheetTrigger className="text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-muted transition-colors flex items-center justify-center">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 flex flex-col">
              <div className="flex h-16 items-center px-6 border-b">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-xl font-bold tracking-tighter text-primary">
                    Divine Daily
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
                <div className="space-y-1">
                  <Link href="/dashboard/support" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <HelpCircle className="h-4 w-4" />
                    Support
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

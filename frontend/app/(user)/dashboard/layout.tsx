"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl md:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="flex h-16 items-center px-6 border-b border-white/20 dark:border-white/10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tighter text-primary">
              Divine Daily
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {sidebarNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/60 dark:bg-white/10 text-primary shadow-sm border border-white/40 dark:border-white/5"
                    : "hover:bg-white/50 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 mt-auto">
          <Separator className="my-4 bg-white/20 dark:bg-white/10" />
          <div className="space-y-1">
            <Link href="/dashboard/support" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium hover:bg-white/50 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-200">
              <HelpCircle className="h-4 w-4" />
              Support
            </Link>
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium hover:bg-red-500/10 hover:text-red-600 text-muted-foreground transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative z-0">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl px-6 md:hidden">
           <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tighter text-primary">
              Divine Daily
            </span>
          </Link>
          <Sheet>
            <SheetTrigger className="text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-white/50 dark:hover:bg-white/10 transition-colors flex items-center justify-center">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 flex flex-col bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-r border-white/20">
              <div className="flex h-16 items-center px-6 border-b border-white/20">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-xl font-bold tracking-tighter text-primary">
                    Divine Daily
                  </span>
                </Link>
              </div>
              <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                {sidebarNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-white/60 dark:bg-white/10 text-primary shadow-sm border border-white/40 dark:border-white/5"
                          : "hover:bg-white/50 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <item.icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 mt-auto border-t border-white/20">
                <div className="space-y-1">
                  <Link href="/dashboard/support" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium hover:bg-white/50 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-200">
                    <HelpCircle className="h-4 w-4" />
                    Support
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium hover:bg-red-500/10 hover:text-red-600 text-muted-foreground transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <div className="flex-1 p-4 sm:p-6 overflow-hidden">
          <div className="h-full w-full mx-auto max-w-6xl flex flex-col">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

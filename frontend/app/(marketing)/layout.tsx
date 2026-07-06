import { Button } from "@/components/ui/button";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col bg-background font-sans">
      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="border-t border-[#E8E8E8] py-8 bg-white/40 backdrop-blur-xl mt-0">
        <div className="mx-auto flex flex-col items-center justify-between gap-4 md:flex-row max-w-[1400px] px-6 lg:px-[80px]">
          <p className="text-center text-sm text-[#9A9A9A] md:text-left">
            &copy; {new Date().getFullYear()} Divine Daily. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

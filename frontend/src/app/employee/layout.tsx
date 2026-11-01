"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  ScanBarcode, 
  History, 
  CalendarDays, 
  Bell, 
  LogOut, 
  Menu,
  X,
  User,
  Settings
} from "lucide-react";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
    { name: "Scan Attendance", href: "/employee/scan", icon: ScanBarcode },
    { name: "My History", href: "/employee/history", icon: History },
    { name: "Leave Requests", href: "/employee/leaves", icon: CalendarDays },
    { name: "Profile & ID", href: "/employee/profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden glass border-b border-border p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded text-white">
            <ScanBarcode size={20} />
          </div>
          <span className="font-bold">SmartWorkforce</span>
        </div>
        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-muted rounded-md">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-72 glass-card border-r border-border flex flex-col z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg text-white shadow-lg shadow-primary/20">
              <ScanBarcode size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight">Employee</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 hover:bg-muted rounded-md">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white font-bold border-2 border-background">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          </div>
          <Link 
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors font-medium w-full"
          >
            <LogOut size={20} />
            Log out
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="hidden md:flex h-20 glass border-b border-border items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="text-2xl font-bold tracking-tight capitalize">
            {pathname.split('/').pop() || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-full hover:bg-muted relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
            </button>
            <button className="p-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>
        <div className="p-4 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}

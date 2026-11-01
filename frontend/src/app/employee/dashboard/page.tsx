"use client";

import { motion } from "framer-motion";
import { 
  Clock, 
  CalendarCheck, 
  AlertCircle, 
  TrendingUp, 
  ScanBarcode, 
  Coffee
} from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { name: "Mon", hours: 8.5 },
  { name: "Tue", hours: 9.0 },
  { name: "Wed", hours: 8.0 },
  { name: "Thu", hours: 8.5 },
  { name: "Fri", hours: 7.5 },
  { name: "Sat", hours: 0 },
  { name: "Sun", hours: 0 },
];

export default function EmployeeDashboard() {
  const stats = [
    { title: "Present Days", value: "22", subtitle: "This Month", icon: CalendarCheck, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Total Hours", value: "174.5", subtitle: "This Month", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Late Marks", value: "2", subtitle: "-30 mins penalty", icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { title: "Overtime", value: "14.5", subtitle: "Hours", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute top-[-50%] right-[-5%] w-[40%] h-[200%] bg-gradient-to-l from-primary/10 to-transparent transform rotate-12 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Good Morning, John! 👋</h2>
            <p className="text-muted-foreground text-lg">Your shift started at 09:00 AM. You checked in at 08:55 AM.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-lg font-bold text-green-500 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span> Active Shift
              </p>
            </div>
            <Link 
              href="/employee/scan"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-105 flex items-center gap-2"
            >
              <ScanBarcode size={20} /> Checkout
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground font-medium mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground font-medium">
              {stat.subtitle}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Working Hours Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6 border border-border/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Working Hours</h3>
            <select className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/50">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6 border border-border/50 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Today&apos;s Log</h3>
            <Link href="/employee/history" className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border rounded-full"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center shrink-0">
                  <ScanBarcode size={14} className="text-green-500" />
                </div>
                <div>
                  <p className="font-semibold">Checked In</p>
                  <p className="text-sm text-muted-foreground">08:55 AM • Web Browser</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center shrink-0">
                  <Coffee size={14} className="text-yellow-500" />
                </div>
                <div>
                  <p className="font-semibold">Break Started</p>
                  <p className="text-sm text-muted-foreground">01:00 PM</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center shrink-0">
                  <Coffee size={14} className="text-yellow-500" />
                </div>
                <div>
                  <p className="font-semibold">Break Ended</p>
                  <p className="text-sm text-muted-foreground">01:45 PM</p>
                </div>
              </div>

              <div className="flex gap-4 opacity-50">
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-muted-foreground flex items-center justify-center shrink-0">
                  <Clock size={14} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Pending Checkout</p>
                  <p className="text-sm text-muted-foreground">Expected 06:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

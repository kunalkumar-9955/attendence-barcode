"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  TrendingUp, 
  MoreVertical,
  Calendar,
  FileSpreadsheet
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";

const weeklyData = [
  { name: "Mon", present: 145, absent: 5, late: 10 },
  { name: "Tue", present: 142, absent: 8, late: 12 },
  { name: "Wed", present: 148, absent: 2, late: 8 },
  { name: "Thu", present: 140, absent: 10, late: 15 },
  { name: "Fri", present: 135, absent: 15, late: 20 },
  { name: "Sat", present: 80, absent: 70, late: 5 },
];

const departmentData = [
  { name: "Engineering", value: 65, color: "#3b82f6" },
  { name: "Sales", value: 45, color: "#10b981" },
  { name: "Marketing", value: 25, color: "#f59e0b" },
  { name: "HR & Admin", value: 15, color: "#8b5cf6" },
];

const liveEmployees = [
  { name: "John Doe", dept: "Engineering", time: "08:55 AM", status: "On Time", avatar: "JD" },
  { name: "Jane Smith", dept: "Marketing", time: "09:15 AM", status: "Late", avatar: "JS" },
  { name: "Mike Johnson", dept: "Sales", time: "08:45 AM", status: "On Time", avatar: "MJ" },
  { name: "Sarah Williams", dept: "HR", time: "09:05 AM", status: "Late", avatar: "SW" },
  { name: "Robert Brown", dept: "Engineering", time: "08:30 AM", status: "On Time", avatar: "RB" },
];

export default function AdminDashboard() {
  const stats = [
    { title: "Total Employees", value: "150", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { title: "Present Today", value: "138", icon: UserCheck, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
    { title: "Absent Today", value: "12", icon: UserX, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
    { title: "Late Check-ins", value: "18", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview Dashboard</h2>
          <p className="text-muted-foreground">Monitor your workforce attendance in real-time.</p>
        </div>
        <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1 shadow-sm">
          <button className="px-3 py-1.5 rounded-md bg-muted font-medium text-sm">Today</button>
          <button className="px-3 py-1.5 rounded-md hover:bg-muted/50 text-muted-foreground font-medium text-sm transition-colors">Week</button>
          <button className="px-3 py-1.5 rounded-md hover:bg-muted/50 text-muted-foreground font-medium text-sm transition-colors">Month</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass-card rounded-2xl p-6 border ${stat.border} hover:shadow-lg transition-all relative overflow-hidden group`}
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${stat.bg} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-muted-foreground font-medium mb-2">{stat.title}</p>
                <h3 className="text-4xl font-bold">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            {idx === 1 && (
              <div className="mt-4 flex items-center text-sm font-medium text-green-500">
                <TrendingUp size={16} className="mr-1" /> +2% from yesterday
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6 border border-border/50"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Weekly Attendance Trend</h3>
            <button className="p-2 hover:bg-muted rounded-md text-muted-foreground">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  cursor={{ fill: 'hsl(var(--muted))' }}
                />
                <Bar dataKey="present" name="Present" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="late" name="Late" fill="#f59e0b" radius={[0, 0, 0, 0]} stackId="a" />
                <Bar dataKey="absent" name="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Department Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6 border border-border/50 flex flex-col"
        >
          <h3 className="text-xl font-bold mb-6">Workforce by Department</h3>
          <div className="flex-1 min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))', padding: '8px 12px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold">150</span>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            {departmentData.map((dept, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                <span className="text-muted-foreground">{dept.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Live Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Scans */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 glass-card rounded-2xl border border-border/50 overflow-hidden"
        >
          <div className="p-6 border-b border-border/50 flex items-center justify-between bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <h3 className="text-lg font-bold">Live Check-ins</h3>
            </div>
            <Link href="/admin/attendance" className="text-sm text-primary hover:underline font-medium">View All Logs</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/10">
                <tr>
                  <th className="px-6 py-4 font-medium">Employee</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Time</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {liveEmployees.map((emp, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary/80 to-blue-500/80 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          {emp.avatar}
                        </div>
                        <span className="font-medium">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{emp.dept}</td>
                    <td className="px-6 py-4 font-medium">{emp.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        emp.status === 'On Time' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-2xl p-6 border border-border/50"
        >
          <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all group text-left">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                <Users size={20} className="text-primary group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium">Add New Employee</p>
                <p className="text-xs text-muted-foreground">Register & generate Barcode</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all group text-left">
              <div className="bg-blue-500/10 p-2 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <FileSpreadsheet size={20} className="text-blue-500 group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium">Export Monthly Report</p>
                <p className="text-xs text-muted-foreground">Download Excel/PDF</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all group text-left">
              <div className="bg-purple-500/10 p-2 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <Calendar size={20} className="text-purple-500 group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium">Manage Leave Requests</p>
                <p className="text-xs text-muted-foreground">3 pending approvals</p>
              </div>
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

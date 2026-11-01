"use client";

import { motion } from "framer-motion";
import { Calendar, Search, Filter, Download, ArrowRight, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

export default function EmployeeHistoryPage() {
  const historyData = [
    { date: "Oct 24, 2023", checkIn: "08:55 AM", checkOut: "05:05 PM", status: "Present", hours: "8h 10m", late: false },
    { date: "Oct 23, 2023", checkIn: "09:15 AM", checkOut: "05:30 PM", status: "Present", hours: "8h 15m", late: true },
    { date: "Oct 20, 2023", checkIn: "08:50 AM", checkOut: "04:55 PM", status: "Present", hours: "8h 05m", late: false },
    { date: "Oct 19, 2023", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present", hours: "8h 00m", late: false },
    { date: "Oct 18, 2023", checkIn: "--:--", checkOut: "--:--", status: "Absent", hours: "0h", late: false },
    { date: "Oct 17, 2023", checkIn: "08:45 AM", checkOut: "06:15 PM", status: "Overtime", hours: "9h 30m", late: false },
    { date: "Oct 16, 2023", checkIn: "08:58 AM", checkOut: "05:02 PM", status: "Present", hours: "8h 04m", late: false },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance History</h2>
          <p className="text-muted-foreground">View and export your past attendance records.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border hover:bg-muted transition-colors font-medium text-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      <div className="glass-card rounded-3xl border border-border/50 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row gap-4 justify-between items-center bg-muted/10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by date..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          
          <div className="flex items-center gap-4 text-sm w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span> Present
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span> Absent
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Late
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span> Overtime
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/20">
              <tr>
                <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><Calendar size={14}/> Date</div></th>
                <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><ArrowRight size={14}/> Check In</div></th>
                <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><ArrowRight size={14} className="rotate-180"/> Check Out</div></th>
                <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><Clock size={14}/> Total Hours</div></th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {historyData.map((record, idx) => (
                <motion.tr 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{record.date}</td>
                  <td className="px-6 py-4">
                    <span className={`font-mono ${record.late ? 'text-yellow-500 font-bold' : ''}`}>
                      {record.checkIn}
                    </span>
                    {record.late && <span className="ml-2 text-[10px] uppercase bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full font-bold">Late</span>}
                  </td>
                  <td className="px-6 py-4 font-mono">{record.checkOut}</td>
                  <td className="px-6 py-4 font-medium">{record.hours}</td>
                  <td className="px-6 py-4">
                    {record.status === 'Present' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20"><CheckCircle2 size={12}/> Present</span>}
                    {record.status === 'Absent' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20"><AlertTriangle size={12}/> Absent</span>}
                    {record.status === 'Overtime' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500 border border-purple-500/20"><Clock size={12}/> Overtime</span>}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-border/50 flex items-center justify-between bg-muted/10 text-sm">
          <span className="text-muted-foreground">Showing 1 to 7 of 30 records</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded-md hover:bg-muted disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-muted bg-primary/10 text-primary border-primary/20">1</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-muted">2</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-muted">3</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-muted">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}

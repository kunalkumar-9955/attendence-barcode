"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, Briefcase, MapPin, Building, Calendar, Edit, Shield } from "lucide-react";

export default function EmployeeProfilePage() {
  const profileInfo = {
    name: "John Doe",
    email: "emp@test.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    role: "Senior Frontend Developer",
    branch: "New York HQ",
    joinDate: "January 15, 2023",
    status: "Active",
    shift: "09:00 AM - 05:00 PM",
    barcodeId: "EMP-2023-0849"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">Manage your personal information and preferences.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
          <Edit size={18} /> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - ID Card & Quick Info */}
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-8 border border-border/50 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-blue-500/20"></div>
            
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-full border-4 border-background bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              JD
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            
            <h3 className="text-2xl font-bold mb-1">{profileInfo.name}</h3>
            <p className="text-muted-foreground mb-4">{profileInfo.role}</p>
            
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/20">
              <Shield size={14} /> {profileInfo.status} Employee
            </span>
          </motion.div>

          {/* Barcode / ID Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-3xl p-6 border border-border/50 flex flex-col items-center justify-center"
          >
            <p className="text-sm text-muted-foreground font-medium mb-4 uppercase tracking-widest">Employee Barcode ID</p>
            {/* Simulated Barcode */}
            <div className="w-full flex justify-center mb-2">
              <div className="h-16 w-full max-w-[200px] flex gap-[2px]">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-full bg-foreground" 
                    style={{ 
                      width: (i % 3 === 0 || i % 7 === 0) ? '4px' : '2px', 
                      opacity: (i % 5 === 0 && i % 2 !== 0) ? 0 : 1 
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <p className="font-mono font-bold tracking-widest">{profileInfo.barcodeId}</p>
          </motion.div>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-8 border border-border/50"
          >
            <h3 className="text-xl font-bold mb-6 pb-4 border-b border-border/50">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><User size={16} /> Full Name</p>
                <p className="font-medium text-lg">{profileInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><Mail size={16} /> Email Address</p>
                <p className="font-medium text-lg">{profileInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><Phone size={16} /> Phone Number</p>
                <p className="font-medium text-lg">{profileInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><MapPin size={16} /> Location</p>
                <p className="font-medium text-lg">San Francisco, CA</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-3xl p-8 border border-border/50"
          >
            <h3 className="text-xl font-bold mb-6 pb-4 border-b border-border/50">Employment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><Briefcase size={16} /> Department</p>
                <p className="font-medium text-lg">{profileInfo.department}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><Building size={16} /> Branch</p>
                <p className="font-medium text-lg">{profileInfo.branch}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><Calendar size={16} /> Date Joined</p>
                <p className="font-medium text-lg">{profileInfo.joinDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><Calendar size={16} /> Assigned Shift</p>
                <p className="font-medium text-lg">{profileInfo.shift}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

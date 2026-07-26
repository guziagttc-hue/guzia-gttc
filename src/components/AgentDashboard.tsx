import React, { useState } from "react";
import { motion } from "motion/react";
import { Screen } from "../types.ts";
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Users, 
  History, 
  TrendingUp,
  Settings,
  LogOut,
  Check,
  User,
  DollarSign,
  HelpCircle
} from "lucide-react";

interface AgentStats {
  commission: string;
  totalCashIn: string;
  totalCashOut: string;
  activeUsers: number;
}

export const AgentDashboard = ({ onBack, onNavigate }: { onBack: () => void; onNavigate: (screen: Screen) => void }) => {
  const [stats] = useState<AgentStats>({
    commission: "৳ ১,৪৫০.০০",
    totalCashIn: "৳ ৪৫,০০০.০০",
    totalCashOut: "৳ ১২,৫০০.০০",
    activeUsers: 124
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen text-slate-800">
      {/* Agent Header */}
      <div className="bg-[#0b2240] pt-12 pb-24 px-6 rounded-b-[40px] relative text-white">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div onClick={() => onNavigate("admin-panel" as Screen)} className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-[#0b2240] shadow-lg relative cursor-pointer">
              <User size={24} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0b2240] rounded-full flex items-center justify-center">
                <Check size={8} className="text-white" strokeWidth={4} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold leading-none">এজেন্ট ড্যাশবোর্ড</h1>
                <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase px-1.5 py-0.5 rounded border border-emerald-500/30">Verified</span>
              </div>
              <button onClick={() => onNavigate("admin-panel" as Screen)} className="text-amber-400 text-[10px] font-bold tracking-widest uppercase mt-1 hover:text-amber-300 transition">সন্ধ্যা এজেন্ট পয়েন্ট</button>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
          >
            <LogOut size={18} className="rotate-180" />
          </button>
        </div>

        {/* Commission Card */}
        <div className="absolute -bottom-16 left-6 right-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">মোট কমিশন (এই মাস)</p>
                <h2 className="text-2xl font-black text-[#0b2240] tracking-tight">{stats.commission}</h2>
              </div>
              <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">ক্যাশ ইন</p>
                <p className="text-sm font-bold text-slate-700">{stats.totalCashIn}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">ক্যাশ আউট</p>
                <p className="text-sm font-bold text-slate-700">{stats.totalCashOut}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-20 px-6 space-y-6 pb-24">
        {/* Quick Actions */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">এজেন্ট টুলস</h3>
          <div className="grid grid-cols-4 gap-4">
            <AgentTool icon={<ArrowUpRight size={20} />} label="ক্যাশ ইন" color="bg-emerald-50 text-emerald-600" />
            <AgentTool icon={<ArrowDownLeft size={20} />} label="বি২বি" color="bg-blue-50 text-blue-600" />
            <AgentTool icon={<Users size={20} />} label="ইউজার" color="bg-amber-50 text-amber-600" />
            <AgentTool icon={<DollarSign size={20} />} label="টাকা চান" color="bg-indigo-50 text-indigo-600" onClick={() => onNavigate("admin-request" as Screen)} />
            <AgentTool icon={<HelpCircle size={20} />} label="হেল্পলাইন" color="bg-rose-50 text-rose-600" onClick={() => onNavigate("helpline" as Screen)} />
          </div>
        </div>

        {/* Earning Information */}
        <div className="bg-amber-400/10 border border-amber-400/20 rounded-3xl p-5 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-amber-400 rounded-lg text-[#0b2240]">
              <Wallet size={16} />
            </div>
            <h3 className="text-xs font-black text-[#0b2240] uppercase tracking-wide">আয়ের বিস্তারিত</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-amber-100">
              <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">ক্যাশ ইন কমিশন</p>
              <p className="text-xs font-black text-slate-800 tracking-tight">৳ ৪.৫০ <span className="text-[8px] text-slate-400 font-normal">/ ১০০০৳</span></p>
            </div>
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-amber-100">
              <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">ক্যাশ আউট কমিশন</p>
              <p className="text-xs font-black text-slate-800 tracking-tight">৳ ৬.০০ <span className="text-[8px] text-slate-400 font-normal">/ ১০০০৳</span></p>
            </div>
          </div>
          <p className="text-[9px] text-slate-500 font-medium leading-relaxed italic">
            * আপনার লব্ধ কমিশন প্রতি দিন শেষে মেইন ব্যালেন্সে যোগ করা হয়। যত বেশি লেনদেন, তত বেশি আয়!
          </p>
        </div>

        {/* Recent Agent Activity */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">সাম্প্রতিক এক্টিভিটি</h3>
            <button className="text-[10px] font-bold text-slate-500 flex items-center gap-1">সব দেখুন <History size={10} /></button>
          </div>
          <div className="space-y-3">
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentTool = ({ icon, label, color, onClick }: { icon: React.ReactNode, label: string, color: string, onClick?: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group">
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition duration-200`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold text-slate-700">{label}</span>
  </button>
);

const ActivityItem = ({ title, subtitle, amount, time, type }: { title: string, subtitle: string, amount: string, time: string, type: string }) => (
  <div className="bg-white p-3 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
        ${type === 'success' ? 'bg-emerald-50 text-emerald-600' : 
          type === 'commission' ? 'bg-amber-50 text-amber-600' : 
          'bg-slate-100 text-slate-600'}
      `}>
        {type === 'success' ? '✓' : type === 'commission' ? '৳' : '⇄'}
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-800">{title}</p>
        <p className="text-[9px] text-slate-400">{subtitle}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`text-xs font-black ${amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-800'}`}>{amount}</p>
      <p className="text-[8px] text-slate-400 font-medium">{time}</p>
    </div>
  </div>
);

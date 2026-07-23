import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Filter, Search, ArrowRightLeft, Calendar } from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  type: "send" | "cash-out" | "merchant" | "receive";
  status: "সফল" | "অপেক্ষমান" | "ব্যর্থ";
  date: string;
  amount: string;
  color: string;
  iconBg: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [];

export const TransactionHistory = ({ transactions, onBack }: { transactions: any[], onBack: () => void }) => {
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week">("all");

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === "all" || t.type === filterType;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Simple date filtering logic
    let matchesDate = true;
    if (dateFilter === "today") {
      matchesDate = t.date === new Date().toLocaleDateString('bn-BD'); 
    } else if (dateFilter === "week") {
      // Mock "last 7 days" 
      matchesDate = true; 
    }
    
    return matchesType && matchesSearch && matchesDate;
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#0b2240] pt-12 pb-6 px-6 rounded-b-[32px] text-white sticky top-0 z-10 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="w-9 h-9 bg-white/10 rounded-full flex justify-center items-center">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-sm font-bold">লেনদেন ইতিহাস</h2>
          <div className="w-9" />
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="লেনদেন খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:bg-white/20 transition"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <FilterTab active={filterType === "all"} label="সব" onClick={() => setFilterType("all")} />
          <FilterTab active={filterType === "send"} label="সেন্ড মানি" onClick={() => setFilterType("send")} />
          <FilterTab active={filterType === "cash-out"} label="ক্যাশ আউট" onClick={() => setFilterType("cash-out")} />
          <FilterTab active={filterType === "merchant"} label="পেমেন্ট" onClick={() => setFilterType("merchant")} />
          <FilterTab active={filterType === "receive"} label="রিসিভ" onClick={() => setFilterType("receive")} />
        </div>
      </div>

      {/* Transaction List */}
      <div className="flex-1 px-6 py-6 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ফলাফল: {filteredTransactions.length}</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setDateFilter(dateFilter === "today" ? "all" : "today")}
              className={`flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-lg border transition ${
                dateFilter === "today" ? "bg-amber-400 border-amber-400 text-[#0b2240]" : "bg-white border-slate-100 text-slate-500"
              }`}
            >
              আজ
            </button>
            <button 
              onClick={() => setDateFilter(dateFilter === "week" ? "all" : "week")}
              className={`flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-lg border transition ${
                dateFilter === "week" ? "bg-amber-400 border-amber-400 text-[#0b2240]" : "bg-white border-slate-100 text-slate-500"
              }`}
            >
              সপ্তাহ
            </button>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredTransactions.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-100 rounded-2xl p-4 flex justify-between items-center shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${t.iconBg} rounded-full flex justify-center items-center`}>
                  <ArrowRightLeft size={18} className={t.color} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{t.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md ${
                      t.status === "সফল" ? "bg-emerald-50 text-emerald-700" : 
                      t.status === "ব্যর্থ" ? "bg-rose-50 text-rose-700" : 
                      "bg-amber-50 text-amber-700"
                    }`}>
                      {t.status}
                    </span>
                    <span className="text-[9px] text-slate-400">{t.date}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${t.color}`}>৳ {t.amount}</p>
                <p className="text-[8px] text-slate-400 font-medium">আইডি: TXN{t.id}829</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <Search size={32} />
            </div>
            <p className="text-xs font-medium">কোনো লেনদেন পাওয়া যায়নি</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterTab = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap border transition-all ${
      active 
        ? "bg-amber-400 border-amber-400 text-[#0b2240] shadow-lg shadow-amber-400/20" 
        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
    }`}
  >
    {label}
  </button>
);

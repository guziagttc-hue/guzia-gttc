import { motion } from "motion/react";
import { ArrowRightLeft, ChevronRight } from "lucide-react";

interface TransactionProps {
  name: string;
  status: string;
  date: string;
  amount: string;
  color: string;
  iconBg: string;
}

const TransactionItem = ({ name, status, date, amount, color, iconBg }: TransactionProps) => (
  <motion.div 
    initial={{ x: -20, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true }}
    className="bg-white border border-slate-100 rounded-2xl p-3 flex justify-between items-center shadow-sm"
  >
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 ${iconBg} rounded-full flex justify-center items-center font-bold text-sm`}>
        <ArrowRightLeft size={14} className={color} />
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-800">{name} পাঠানো হলো</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1.5 py-0.25 rounded-md">{status}</span>
          <span className="text-[9px] text-slate-400">{date}</span>
        </div>
      </div>
    </div>
    <span className={`text-xs font-extrabold ${color}`}>৳ {amount}</span>
  </motion.div>
);

export const RecentTransactions = ({ onSeeAll }: { onSeeAll?: () => void }) => {
  return (
    <div className="px-5 flex-1 overflow-y-auto mb-20 no-scrollbar">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-slate-800">সাম্প্রতিক লেনদেন</span>
        <button 
          onClick={onSeeAll}
          className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-0.5"
        >
          সব ইতিহাস 
          <ChevronRight size={10} />
        </button>
      </div>
      
      <div className="space-y-3">
      </div>
    </div>
  );
};

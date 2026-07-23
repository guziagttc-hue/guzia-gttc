import { Bell, ArrowLeft, AlertCircle, Info, Tag } from "lucide-react";
import { motion } from "motion/react";
import { Notification } from "../types.ts";

export const Notifications = ({ onBack, notifications }: { onBack: () => void, notifications: Notification[] }) => {

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="bg-white p-6 pt-12 border-b border-slate-100 flex items-center gap-4">
        <button onClick={onBack} className="text-slate-800">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-slate-800">নোটিফিকেশন</h2>
      </div>
      
      <div className="p-6 space-y-4">
        {notifications.map((n) => (
          <motion.div 
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4"
          >
            <div className={`p-2 rounded-xl h-fit ${n.type === 'security' ? 'bg-red-50 text-red-500' : n.type === 'offer' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'}`}>
              {n.type === 'security' ? <AlertCircle size={20} /> : n.type === 'offer' ? <Tag size={20} /> : <Info size={20} />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">{n.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{n.message}</p>
              <p className="text-[10px] text-slate-400 mt-2">{n.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

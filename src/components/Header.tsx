import { motion } from "motion/react";
import { Eye, QrCode, Bell, User } from "lucide-react";
import { useState } from "react";
import { UserData } from "../types";
import { useTranslation } from "../context/LanguageContext";

export const Header = ({ 
  balance = "৳ ৫,৪২০.৫০", 
  onQRClick,
  onNotificationClick,
  userData
}: { 
  balance?: string, 
  onQRClick?: () => void,
  onNotificationClick?: () => void,
  userData?: UserData
}) => {
  const [showBalance, setShowBalance] = useState(false);
  const { language, toggleLanguage } = useTranslation();

  return (
    <div className="bg-[#0b2240] pt-12 pb-6 px-5 rounded-b-[36px] relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-amber-500/10 border border-amber-400/30 rounded-xl flex justify-center items-center text-amber-400">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M12 8a2.5 2.5 0 0 1 2 4 2.5 2.5 0 0 1-4 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-white text-sm font-bold leading-none tracking-wider">Shondho</h1>
            <p className="text-amber-400 text-[10px] font-bold tracking-widest uppercase">MFS</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onNotificationClick}
            className="w-9 h-9 bg-white/10 rounded-xl flex justify-center items-center text-amber-400 hover:bg-white/20 transition"
          >
            <Bell size={18} />
          </button>
          <button 
            onClick={onQRClick}
            className="w-9 h-9 bg-white/10 rounded-xl flex justify-center items-center text-amber-400 hover:bg-white/20 transition"
          >
            <QrCode size={18} />
          </button>
          <div className="flex items-center gap-1.5 bg-white/10 pl-2 pr-1 py-1 rounded-full border border-white/10">
            <div className="text-right">
              <p className="text-[9px] text-slate-300 leading-none">গ্রাহক</p>
              {userData?.name && <p className="text-[10px] text-white font-semibold">{userData.name}</p>}
            </div>
            {userData?.profilePictureUrl ? (
              <img 
                src={userData.profilePictureUrl} 
                alt="User" 
                className="w-7 h-7 rounded-full object-cover border border-amber-400"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-slate-500/50 flex items-center justify-center border border-amber-400">
                <User size={14} className="text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#e2edf8] rounded-2xl p-5 shadow-lg border-b-[5px] border-amber-400/80"
      >
        <div className="flex justify-between items-center text-slate-600 mb-2">
          <span className="text-xs font-bold">বর্তমান ব্যালেন্স</span>
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center gap-1 text-[10px] bg-slate-200/80 px-2 py-0.5 rounded-full hover:bg-slate-300/80 transition"
          >
            <Eye size={10} />
            <span className="text-[9px] font-semibold">{showBalance ? "লুকান" : "দেখুন"}</span>
          </button>
        </div>
        <div className="text-3xl font-extrabold text-[#0b2240] tracking-tight">
          {showBalance ? balance : "৳ •••••••"}
        </div>
      </motion.div>
      
      <div className="flex justify-center gap-1.5 mt-3">
        <span className="w-2.5 h-1.5 bg-amber-400 rounded-full"></span>
        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
      </div>
    </div>
  );
};

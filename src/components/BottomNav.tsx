import { motion } from "motion/react";
import { Home, QrCode, Tag, History, UserCircle } from "lucide-react";
import { useState } from "react";
import { ScannerModal } from "./ScannerModal";

export const BottomNav = ({ 
  onAgentClick, 
  onProfileClick,
  onHistoryClick 
}: { 
  onAgentClick?: () => void, 
  onProfileClick?: () => void,
  onHistoryClick?: () => void
}) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-50">
        <div className="h-16 bg-white/90 backdrop-blur-md rounded-2xl flex justify-between items-center px-6 shadow-xl border border-slate-200/50">
          <button className="flex flex-col items-center text-[#0b2240]">
            <Home size={20} />
            <span className="text-[9px] font-bold mt-0.5">হোম</span>
          </button>

          <button className="flex flex-col items-center text-slate-400 hover:text-slate-600">
            <Tag size={20} />
            <span className="text-[9px] font-bold mt-0.5">অফার</span>
          </button>

          <div className="relative -translate-y-5">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsScannerOpen(true)}
              className="w-14 h-14 bg-[#0b2240] rounded-full flex justify-center items-center text-white shadow-xl border-4 border-white hover:bg-[#122e54] transition"
            >
              <QrCode size={24} />
            </motion.button>
          </div>

          <button 
            onClick={onHistoryClick}
            className="flex flex-col items-center text-slate-400 hover:text-slate-600 active:scale-95 transition"
          >
            <History size={20} />
            <span className="text-[9px] font-bold mt-0.5">লেনদেন</span>
          </button>

          <button 
            onClick={onProfileClick}
            className="flex flex-col items-center text-slate-400 hover:text-slate-600 active:scale-95 transition"
          >
            <UserCircle size={20} />
            <span className="text-[9px] font-bold mt-0.5">প্রোফাইল</span>
          </button>
        </div>
      </div>

      <ScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </>
  );
};

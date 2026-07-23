import { motion } from "motion/react";
import { Send, Wallet, Store } from "lucide-react";

interface ServiceProps {
  delay?: number;
}

export const SendMoneyButton = ({ delay = 0.1, onClick }: ServiceProps & { onClick?: () => void }) => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay }}
    onClick={onClick}
    className="flex flex-col items-center cursor-pointer group"
  >
    <div className="w-14 h-14 bg-[#122e54] text-amber-300 rounded-full flex justify-center items-center shadow-md group-hover:scale-105 transition duration-200">
      <Send size={24} />
    </div>
    <span className="text-xs mt-2 font-bold text-slate-700 leading-tight">সেন্ড মানি</span>
  </motion.div>
);

export const CashOutButton = ({ delay = 0.2, onClick }: ServiceProps & { onClick?: () => void }) => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay }}
    onClick={onClick}
    className="flex flex-col items-center cursor-pointer group"
  >
    <div className="w-14 h-14 bg-[#e6be65] text-amber-950 rounded-full flex justify-center items-center shadow-md group-hover:scale-105 transition duration-200">
      <Wallet size={24} />
    </div>
    <span className="text-xs mt-2 font-bold text-slate-700 leading-tight">ক্যাশ আউট</span>
  </motion.div>
);

export const MerchantPayButton = ({ delay = 0.3, onClick }: ServiceProps & { onClick?: () => void }) => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay }}
    onClick={onClick}
    className="flex flex-col items-center cursor-pointer group"
  >
    <div className="w-14 h-14 bg-[#fef3c7] text-amber-800 rounded-full flex justify-center items-center shadow-md group-hover:scale-105 transition duration-200">
      <Store size={24} />
    </div>
    <span className="text-xs mt-2 font-bold text-slate-700 leading-tight">মার্চেন্ট পে</span>
  </motion.div>
);

export const RequestMoneyButton = ({ delay = 0.4, onClick }: ServiceProps & { onClick?: () => void }) => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay }}
    onClick={onClick}
    className="flex flex-col items-center cursor-pointer group"
  >
    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex justify-center items-center shadow-md group-hover:scale-105 transition duration-200">
      <Send size={24} className="rotate-180" />
    </div>
    <span className="text-xs mt-2 font-bold text-slate-700 leading-tight">রিকোয়েস্ট</span>
  </motion.div>
);

export const ServiceGrid = ({ onSendMoney, onCashOut, onMerchantPay, onRequestMoney }: { 
  onSendMoney?: () => void; 
  onCashOut?: () => void;
  onMerchantPay?: () => void;
  onRequestMoney?: () => void;
}) => (
  <div className="px-3 py-5">
    <div className="grid grid-cols-4 gap-1 text-center">
      <SendMoneyButton onClick={onSendMoney} />
      <CashOutButton onClick={onCashOut} />
      <MerchantPayButton onClick={onMerchantPay} />
      <RequestMoneyButton onClick={onRequestMoney} />
    </div>
  </div>
);

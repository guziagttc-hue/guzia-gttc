import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Phone, Mail, HelpCircle } from 'lucide-react';

export const Helpline = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600">
        <ArrowLeft size={20} /> ফিরে যান
      </button>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">হেল্পলাইন</h2>
        <p className="text-slate-600 mb-6">যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন</p>
        
        <div className="space-y-4 text-left">
          <a href="tel:+8801700000000" className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <Phone className="text-indigo-600" />
            <span>+৮৮০ ১৭০০০০০০০০</span>
          </a>
          <a href="mailto:support@example.com" className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <Mail className="text-indigo-600" />
            <span>support@example.com</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

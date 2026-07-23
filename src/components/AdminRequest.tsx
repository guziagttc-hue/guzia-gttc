import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, DollarSign } from 'lucide-react';

export const AdminRequest = ({ onBack }: { onBack: () => void }) => {
  const [amount, setAmount] = React.useState('');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-6">
      <button onClick={onBack} className="text-sm font-semibold text-slate-500">← ফিরে যান</button>
      <h2 className="text-xl font-bold">মুল এডমিন থেকে টাকা অনুরোধ</h2>
      
      <div className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
        <h3 className="font-semibold text-slate-800">এডমিন এর তথ্য:</h3>
        <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-indigo-600" /> +৮৮০ ১৭০০০০০০০০</div>
        <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-indigo-600" /> admin@example.com</div>
      </div>

      <div className="space-y-3">
        <input type="number" placeholder="টাকার পরিমাণ" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 rounded-lg border" />
        <button className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold">অনুরোধ পাঠান</button>
      </div>
    </motion.div>
  );
};

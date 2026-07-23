import React from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, DollarSign, MessageSquare, ArrowLeft, Bell, CreditCard } from 'lucide-react';

export const AdminPanel = ({ onBack, onAddNotification }: { onBack: () => void, onAddNotification: (title: string, message: string) => void }) => {
  const [offer, setOffer] = React.useState('');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold">এডমিন প্যানেল</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => alert('ইউজার ম্যানেজমেন্ট')} className="bg-white p-4 rounded-xl shadow-sm border text-left hover:bg-slate-50 transition">
          <div className="flex items-center gap-2 mb-2 text-indigo-600"><Users size={20} /> ইউজার</div>
          <div className="text-2xl font-bold">১,৫০০</div>
        </button>
        <button onClick={() => alert('এজেন্ট ম্যানেজমেন্ট')} className="bg-white p-4 rounded-xl shadow-sm border text-left hover:bg-slate-50 transition">
          <div className="flex items-center gap-2 mb-2 text-indigo-600"><UserPlus size={20} /> এজেন্ট</div>
          <div className="text-2xl font-bold">১২০</div>
        </button>
        <button onClick={() => alert('রেজিস্ট্রেশন অনুমোদন')} className="bg-white p-4 rounded-xl shadow-sm border text-left hover:bg-slate-50 transition">
          <div className="flex items-center gap-2 mb-2 text-indigo-600"><UserPlus size={20} /> রেজিস্ট্রেশন</div>
          <div className="text-2xl font-bold">৮৫</div>
        </button>
        <button onClick={() => alert('মানি রিকোয়েস্ট')} className="bg-white p-4 rounded-xl shadow-sm border text-left hover:bg-slate-50 transition">
          <div className="flex items-center gap-2 mb-2 text-indigo-600"><DollarSign size={20} /> মানি রিকোয়েস্ট</div>
          <div className="text-2xl font-bold">১২</div>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex items-center gap-2 mb-4 text-indigo-600"><CreditCard size={20} /> মার্চেন্ট নম্বর সেট করুন</div>
        <input type="text" placeholder="মার্চেন্ট নম্বর লিখুন..." className="w-full p-3 rounded-lg border mb-2" />
        <button onClick={() => alert('মার্চেন্ট নম্বর সেভ হয়েছে')} className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold">সেভ করুন</button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex items-center gap-2 mb-4 text-indigo-600"><Bell size={20} /> অফার ও নটিফিকেশন পাঠান</div>
        <input type="text" placeholder="মেসেজ বা অফার লিখুন..." value={offer} onChange={(e) => setOffer(e.target.value)} className="w-full p-3 rounded-lg border mb-2" />
        <button onClick={() => { onAddNotification("নতুন অফার", offer); setOffer(''); alert('পাঠানো হয়েছে'); }} className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold">পাঠান</button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <button onClick={() => alert('সাপোর্ট ম্যাসেজ')} className="w-full text-left">
            <div className="flex items-center gap-2 mb-4 text-indigo-600"><MessageSquare size={20} /> সাপোট ম্যাসেজ</div>
        </button>
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-lg text-sm">ইউজার ১: আমার টাকা আসেনি।</div>
          <div className="p-3 bg-slate-50 rounded-lg text-sm">ইউজার ২: আইডি কার্ড আপলোড হচ্ছে না।</div>
        </div>
      </div>
    </motion.div>
  );
};

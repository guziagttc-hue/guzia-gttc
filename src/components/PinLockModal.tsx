import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock } from 'lucide-react';

export const PinLockModal = ({ isOpen, onUnlock, correctPin }: { isOpen: boolean, onUnlock: () => void, correctPin: string }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = () => {
    if (pin === correctPin) {
      onUnlock();
      setPin('');
      setError('');
    } else {
      setError('ভুল পিন!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0b2240]/90 flex items-center justify-center p-6 z-[60]"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-2xl text-center"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="text-indigo-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">সেশন লক হয়েছে</h3>
            <p className="text-sm text-slate-600 mb-6">অব্যবহৃত থাকার কারণে সেশন লক হয়েছে। আবার ব্যবহার করতে আপনার পিন দিন।</p>
            
            <input 
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full text-center text-2xl tracking-widest p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="••••"
              maxLength={4}
            />
            
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button 
              onClick={handleUnlock}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition"
            >
              আনলক করুন
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

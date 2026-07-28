import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, User, Search, Star, Check } from "lucide-react";
import { Keypad, PinDisplay } from "./AuthCommon";
import { findUserByContact, transferMoney } from "../lib/firebase";
interface Contact {
  name: string;
  identifier: string;
  amount?: number;
  avatar: string;
  isPriyo: boolean;
}

export const SendMoneyFlow = ({ balance, onComplete, onCancel, addTransaction, userPin, senderId, initialRecipientIdentifier }: { balance: string, onComplete: (newBalance: number) => void, onCancel: () => void, addTransaction: (t: any) => void, userPin: string, senderId: string, initialRecipientIdentifier?: string }) => {
  const [step, setStep] = useState<"input" | "review" | "success">("input");
  const [recipient, setRecipient] = useState<Contact | null>(null);
  const [manualInput, setManualInput] = useState(initialRecipientIdentifier || "");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [txnId] = useState(`txn${Math.random().toString(36).substr(2, 9)}`);

  const charge = recipient?.isPriyo ? 0 : 5;
  const numAmount = parseFloat(amount) || 0;
  const total = numAmount + charge;

  const handleSelectContact = (c: Contact) => {
    setRecipient(c);
    setManualInput(c.identifier);
    if (c.amount) setAmount(c.amount.toString());
  };

  const handleNext = async () => {
    if (!manualInput) return alert("নম্বর বা ইমেইল লিখুন");
    if (numAmount <= 0) return alert("সঠিক পরিমাণ লিখুন");
    
    const user = await findUserByContact(manualInput);
    
    setRecipient({
      name: user ? user.name : "অজানা ইউজার",
      identifier: manualInput,
      avatar: user?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      isPriyo: false
    });
    setStep("review");
  };

  const handleSuccess = async () => {
      try {
          // Perform transfer
          const recipientUser = await findUserByContact(recipient!.identifier);
          if (!recipientUser) throw new Error("প্রাপক খুঁজে পাওয়া যায়নি");
          
          await transferMoney(senderId, recipientUser.id, numAmount);
          
          addTransaction({
              id: txnId,
              name: recipient?.name,
              type: "send",
              status: "সফল",
              date: new Date().toLocaleDateString('bn-BD'),
              amount: numAmount.toString(),
              color: "text-rose-500",
              iconBg: "bg-rose-50"
          });
          onComplete(numAmount);
          setStep("success");
      } catch (e: any) {
          setError(e.message);
      }
  };

  const handlePasswordSubmit = () => {
    if (password === userPin) {
      handleSuccess();
    } else {
      setError("ভুল পাসওয়ার্ড!");
      setPassword("");
    }
  };

  if (step === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: 0, ease: "easeInOut" }}
          className="w-24 h-24 bg-emerald-50 rounded-full flex justify-center items-center shadow-lg border border-emerald-100"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Check size={48} className="text-emerald-500" strokeWidth={3} />
          </motion.div>
        </motion.div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">লেনদেন সফল হয়েছে!</h2>
          <p className="text-xs text-slate-400">টাকা সফলভাবে পাঠানো সম্পন্ন হয়েছে</p>
        </div>
        <div className="w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4 text-left text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">প্রাপক:</span>
            <span className="font-bold text-slate-800">{recipient?.name} ({recipient?.identifier})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">পরিমাণ:</span>
            <span className="font-bold text-slate-800">৳ {numAmount.toLocaleString("bn-BD")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">চার্জ:</span>
            <span className={charge === 0 ? "text-emerald-600 font-bold" : "font-bold"}>
              {charge === 0 ? "ফ্রি" : `৳ ${charge}`}
            </span>
          </div>
          <div className="border-t border-slate-50 pt-3 flex justify-between">
            <span className="text-slate-500">লেনদেন আইডি:</span>
            <span className="font-mono text-slate-400 uppercase">txn{Math.random().toString(36).substr(2, 9)}</span>
          </div>
        </div>
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => onComplete(balance ? parseFloat(balance.replace(/[^0-9.]/g, '')) : 0)}
          className="w-full bg-[#0b2240] hover:bg-[#122e54] text-amber-400 font-bold py-4 rounded-2xl shadow-lg transition"
        >
          হোমে ফিরে যান
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <AnimatePresence mode="wait">
        {step === "input" ? (
          <motion.div 
            key="input"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col p-6 space-y-6"
          >
            <div className="flex justify-between items-center">
              <button onClick={onCancel} className="w-9 h-9 bg-white border border-slate-100 rounded-full flex justify-center items-center shadow-sm">
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-sm font-bold">টাকা পাঠান</h2>
              <div className="bg-[#0b2240]/10 text-[#0b2240] px-3 py-1 rounded-full text-[10px] font-bold">
                ব্যালেন্স: {balance}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">নম্বর বা ইমেইল এড্রেস</label>
                <div className="relative">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={manualInput}
                    onChange={(e) => {
                      setManualInput(e.target.value);
                      if (recipient?.identifier !== e.target.value) setRecipient(null);
                    }}
                    placeholder="নম্বর বা ইমেইল লিখুন"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs font-bold focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">টাকার পরিমাণ</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">৳</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="০.০০"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-4 text-xl font-extrabold text-[#0b2240] focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleNext}
              className="w-full bg-[#0b2240] text-amber-400 font-bold py-4 rounded-2xl shadow-lg mt-auto"
            >
              পরবর্তী
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col p-6 space-y-8"
          >
            <div className="flex justify-between items-center">
              <button onClick={() => setStep("input")} className="w-9 h-9 bg-white border border-slate-100 rounded-full flex justify-center items-center">
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-sm font-bold">লেনদেন নিশ্চিত করুন</h2>
              <div className="w-9" />
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                <span className="text-xs text-slate-400">প্রাপক</span>
                <div className="flex items-center gap-2 text-right">
                  <div>
                    <p className="text-xs font-bold">{recipient?.name}</p>
                    <p className="text-[10px] text-slate-400">{recipient?.identifier}</p>
                  </div>
                  <img src={recipient?.avatar} className="w-8 h-8 rounded-full border" alt="" />
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">টাকার পরিমাণ</span>
                <span className="text-sm font-bold">৳ {numAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">চার্জ</span>
                <span className={`text-xs font-bold ${charge === 0 ? "text-emerald-600" : ""}`}>
                  {charge === 0 ? "ফ্রি" : `৳ ${charge}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-50">
                <span className="text-xs font-bold">সর্বমোট</span>
                <span className="text-sm font-extrabold text-[#0b2240]">৳ {total}</span>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <p className="text-xs font-semibold text-slate-500">পাসওয়ার্ড লিখুন</p>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="পাসওয়ার্ড লিখুন"
                className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs font-bold focus:border-amber-400 focus:outline-none"
              />
              {error && <p className="text-xs text-rose-500 font-bold">{error}</p>}
            </div>
            <button 
                onClick={handlePasswordSubmit}
                className="w-full bg-[#0b2240] text-amber-400 font-bold py-4 rounded-2xl shadow-lg mt-auto"
            >
                নিশ্চিত করুন
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

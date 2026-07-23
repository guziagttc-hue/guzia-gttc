import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Check, Smartphone, Mail } from "lucide-react";
import { Keypad, PinDisplay } from "./AuthCommon";

export const CashOutFlow = ({ balance, onComplete, onCancel, addTransaction, userPin }: { 
  balance: string, 
  onComplete: (newBalance: number) => void, 
  onCancel: () => void,
  addTransaction: (t: any) => void,
  userPin: string
}) => {
  const [step, setStep] = useState<"input" | "review" | "success">("input");
  const [agentId, setAgentId] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [txnId] = useState(`txn${Math.random().toString(36).substr(2, 9)}`);

  const isEmailAgent = agentId.includes("@");
  const numAmount = parseFloat(amount) || 0;
  const charge = isEmailAgent ? 0 : Math.ceil(numAmount * 0.015);
  const total = numAmount + charge;

  const handleNext = () => {
    if (!agentId) return alert("এজেন্ট নম্বর বা ইমেইল লিখুন");
    if (numAmount <= 0) return alert("সঠিক পরিমাণ লিখুন");
    
    // Check if balance is enough
    // For demo, we assume user has 5420.50
    const currentBalanceNum = 5420.50; 
    if (total > currentBalanceNum) {
      return alert("ব্যালেন্সের বাইরে সেটআপ সম্ভব নয়!");
    }

    setStep("review");
  };

  const handlePinSubmit = () => {
    if (pin === userPin) {
      addTransaction({
          id: txnId,
          name: "ক্যাশ আউট - " + agentId,
          type: "cash-out",
          status: "সফল",
          date: new Date().toLocaleDateString('bn-BD'),
          amount: total.toString(),
          color: "text-rose-500",
          iconBg: "bg-rose-50"
      });
      onComplete(total);
      setStep("success");
    } else {
      setError("ভুল পিন কোড!");
      setPin("");
    }
  };

  const addAmount = (val: number) => {
    const current = parseFloat(amount) || 0;
    setAmount((current + val).toString());
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
          <h2 className="text-xl font-bold text-slate-800">ক্যাশ আউট সফল হয়েছে!</h2>
          <p className="text-xs text-slate-400">এজেন্ট পয়েন্ট থেকে টাকা সফলভাবে তোলা সম্পন্ন হয়েছে</p>
        </div>
        <div className="w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4 text-left text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">এজেন্ট আইডি:</span>
            <span className="font-bold text-slate-800">{agentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">পরিমাণ:</span>
            <span className="font-bold text-slate-800">৳ {numAmount.toLocaleString("bn-BD")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">চার্জ:</span>
            <span className={charge === 0 ? "text-emerald-600 font-bold" : "font-bold text-amber-600"}>
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
          onClick={onCancel}
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
              <h2 className="text-sm font-bold">এজেন্ট ক্যাশ আউট</h2>
              <div className="bg-[#0b2240]/10 text-[#0b2240] px-3 py-1 rounded-full text-[10px] font-bold">
                ব্যালেন্স: {balance}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">এজেন্ট মোবাইল নম্বর বা ইমেইল</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs">🏧</span>
                  <input 
                    type="text" 
                    value={agentId}
                    onChange={(e) => setAgentId(e.target.value)}
                    placeholder="নম্বর বা ইমেইল এড্রেস লিখুন"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs font-bold focus:border-amber-400 focus:outline-none transition"
                  />
                </div>
                <div className="flex gap-2 pt-1 text-[10px]">
                  <button onClick={() => setAgentId("০১৮৯৯-৮৮৭৭৬৬")} className="bg-indigo-50 hover:bg-indigo-100 text-[#0b2240] px-2.5 py-1 rounded-lg border border-indigo-100 font-bold flex items-center gap-1">
                    <Smartphone size={10} /> ডেমো নম্বর
                  </button>
                  <button onClick={() => setAgentId("agent@shondho.com")} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-100 font-bold flex items-center gap-1">
                    <Mail size={10} /> ডেমো ইমেইল
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">টাকার পরিমাণ লিখুন</label>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center gap-1 w-full">
                    <span className="text-2xl font-bold text-slate-400">৳</span>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="০.০০"
                      className="w-full text-center text-4xl font-extrabold text-[#0b2240] tracking-tight focus:outline-none bg-transparent"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 text-center">চার্জ: মোবাইল নম্বরে ১.৫% | ইমেইল এজেন্টে সম্পূর্ণ ফ্রি!</p>
                </div>
                
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[500, 1000, 5000].map(v => (
                    <button key={v} onClick={() => addAmount(v)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition">+{v}</button>
                  ))}
                  <button onClick={() => setAmount("")} className="bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold py-2.5 rounded-xl transition">মুছুন</button>
                </div>
              </div>
            </div>

            <button 
              onClick={handleNext}
              className="w-full bg-[#0b2240] text-amber-400 font-bold py-4 rounded-2xl shadow-lg mt-auto"
            >
              পরবর্তী ধাপে যান
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
              <button onClick={() => setStep("input")} className="w-9 h-9 bg-white border border-slate-100 rounded-full flex justify-center items-center shadow-sm">
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-sm font-bold">ক্যাশ আউট নিশ্চিত করুন</h2>
              <div className="w-9" />
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                <span className="text-xs text-slate-400">এজেন্ট আইডি</span>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 mb-0.5">
                    <p className="text-xs font-bold text-slate-800">সন্ধ্যা এজেন্ট পয়েন্ট</p>
                    <div className="bg-emerald-500 rounded-full p-0.5">
                      <Check size={8} className="text-white" strokeWidth={4} />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Verified Agent: {agentId}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">টাকার পরিমাণ</span>
                <span className="text-sm font-bold text-[#0b2240]">৳ {numAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">চার্জ</span>
                <span className={`text-xs font-bold ${charge === 0 ? "text-emerald-600" : "text-amber-600"}`}>
                  {charge === 0 ? "ফ্রি" : `৳ ${charge}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-50">
                <span className="text-xs font-bold">সর্বমোট</span>
                <span className={`text-sm font-extrabold ${charge === 0 ? "text-emerald-600" : "text-rose-600"}`}>৳ {total}</span>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <p className="text-xs font-semibold text-slate-500">৪ ডিজিটের পিন নম্বর লিখুন</p>
              <PinDisplay length={4} value={pin} masked />
              {error && <p className="text-xs text-rose-500 font-bold">{error}</p>}
            </div>

            <Keypad 
              onKeyPress={(k) => {
                if (pin.length < 4) {
                  const newPin = pin + k;
                  setPin(newPin);
                  if (newPin.length === 4) {
                    setTimeout(() => {
                      if (newPin === "1234") handlePinSubmit();
                      else { setError("ভুল পিন কোড!"); setPin(""); }
                    }, 500);
                  }
                }
              }}
              onDelete={() => { setError(""); setPin(pin.slice(0, -1)); }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

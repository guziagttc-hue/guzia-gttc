import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Send, Link as LinkIcon, Check, Copy, AlertCircle, Key } from "lucide-react";
import { Keypad, PinDisplay } from "./AuthCommon";

export const RequestMoneyFlow = ({ 
  balance, 
  onCancel, 
  onComplete,
  addTransaction,
  userPin
}: { 
  balance: string; 
  onCancel: () => void; 
  onComplete: (newBalance: number) => void;
  addTransaction: (t: any) => void;
  userPin: string;
}) => {
  const [step, setStep] = useState<"choose" | "generate" | "view" | "pay" | "success">("choose");
  const [amount, setAmount] = useState("");
  const [requestLink, setRequestLink] = useState("");
  const [pastedLink, setPastedLink] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [txnId] = useState(`req${Math.random().toString(36).substr(2, 9)}`);

  const handleGenerateLink = () => {
    if (!amount || parseInt(amount) <= 0) return;
    const mockLink = `shondho://request?amt=${amount}&ref=${Math.random().toString(36).substring(7)}`;
    setRequestLink(mockLink);
    setStep("view");
  };

  const handleLinkSubmit = () => {
    if (!pastedLink) return;
    // Mock parsing the link
    if (pastedLink.includes("amt=")) {
      const amt = pastedLink.split("amt=")[1].split("&")[0];
      setAmount(amt);
      setStep("pay");
    } else {
      setError("সঠিক লিংক প্রদান করুন");
    }
  };

  const handlePayment = () => {
    if (pin.length === 4) {
      if (pin === userPin) {
        const reqAmt = parseInt(amount);
        addTransaction({
            id: txnId,
            name: "রিকোয়েস্ট মানি",
            type: "request-money",
            status: "সফল",
            date: new Date().toLocaleDateString('bn-BD'),
            amount: reqAmt.toString(),
            color: "text-blue-500",
            iconBg: "bg-blue-50"
        });
        onComplete(reqAmt);
        setStep("success");
      } else {
        setError("ভুল পিন, আবার চেষ্টা করুন");
        setPin("");
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#0b2240] pt-12 pb-6 px-6 rounded-b-[32px] text-white">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onCancel} className="w-9 h-9 bg-white/10 rounded-full flex justify-center items-center">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-sm font-bold">রিকোয়েস্ট মানি</h2>
          <div className="w-9" />
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <AnimatePresence mode="wait">
          {step === "choose" && (
            <motion.div 
              key="choose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <button 
                onClick={() => setStep("generate")}
                className="w-full bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group active:scale-95 transition"
              >
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition">
                  <LinkIcon size={32} />
                </div>
                <h3 className="font-bold text-slate-800">লিংক তৈরি করুন</h3>
                <p className="text-[10px] text-slate-400 mt-1">টাকা রিকোয়েস্ট করার জন্য একটি লিংক জেনারেট করুন</p>
              </button>

              <div className="relative py-4 flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">অথবা</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 text-center mb-4 text-xs">বন্ধুর লিংক পেস্ট করুন</h3>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="shondho://request?..."
                    value={pastedLink}
                    onChange={(e) => setPastedLink(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0b2240]/5"
                  />
                </div>
                {error && <p className="text-[10px] text-rose-500 font-bold mt-2 text-center">{error}</p>}
                <button 
                  onClick={handleLinkSubmit}
                  className="w-full bg-[#0b2240] text-amber-400 font-bold py-4 rounded-2xl mt-4 shadow-lg active:scale-95 transition"
                >
                  লিংক চেক করুন
                </button>
              </div>
            </motion.div>
          )}

          {step === "generate" && (
            <motion.div 
              key="generate"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">রিকোয়েস্টের পরিমাণ</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-black text-slate-400">৳</span>
                  <input 
                    type="number"
                    autoFocus
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-4xl font-black text-[#0b2240] w-32 outline-none text-center bg-transparent"
                  />
                </div>
              </div>
              <button 
                onClick={handleGenerateLink}
                disabled={!amount || parseInt(amount) <= 0}
                className="w-full bg-[#0b2240] disabled:bg-slate-200 text-amber-400 font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2"
              >
                <LinkIcon size={18} />
                লিংক কনভার্ট করুন
              </button>
            </motion.div>
          )}

          {step === "view" && (
            <motion.div 
              key="view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-8 flex-1 flex flex-col justify-center items-center"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-2">
                <Check size={40} strokeWidth={3} />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-800">লিংক তৈরি হয়েছে!</h3>
                <p className="text-xs text-slate-400 mt-1">নিচের লিংকটি আপনার বন্ধুকে পাঠান</p>
              </div>

              <div className="w-full bg-slate-100 p-4 rounded-2xl break-all text-[10px] font-mono text-slate-500 relative group">
                {requestLink}
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(requestLink);
                    alert("লিংক কপি হয়েছে!");
                  }}
                  className="absolute right-2 bottom-2 p-2 bg-white rounded-lg shadow-sm text-slate-400 hover:text-[#0b2240]"
                >
                  <Copy size={14} />
                </button>
              </div>

              <button 
                onClick={onCancel}
                className="w-full bg-[#0b2240] text-amber-400 font-bold py-4 rounded-2xl shadow-lg"
              >
                ড্যাশবোর্ডে ফিরে যান
              </button>
            </motion.div>
          )}

          {step === "pay" && (
            <motion.div 
              key="pay"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 flex-1 flex flex-col"
            >
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={24} className="rotate-180" />
                </div>
                <h3 className="font-bold text-slate-800">বন্ধুর রিকোয়েস্ট</h3>
                <p className="text-[10px] text-slate-400 mt-1">তিনি আপনার কাছে টাকা চেয়েছেন</p>
                <div className="mt-6">
                  <span className="text-4xl font-black text-[#0b2240]">৳ {amount}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end gap-6">
                <div className="flex flex-col items-center">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">নিশ্চিত করতে পিন দিন</p>
                   <PinDisplay length={4} value={pin} masked />
                   {error && (
                     <div className="flex items-center gap-1.5 text-rose-500 mt-4 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100">
                        <AlertCircle size={12} />
                        <span className="text-[10px] font-bold">{error}</span>
                     </div>
                   )}
                </div>

                <Keypad 
                  onKeyPress={(k) => {
                    if (pin.length < 4) {
                      const newPin = pin + k;
                      setPin(newPin);
                      if (newPin.length === 4) {
                        // Small delay for visual feedback before auto-submit
                        setTimeout(() => {
                           if (newPin === "1234") {
                              const currentBal = parseInt(balance.replace(/[^\d]/g, ""));
                              const reqAmt = parseInt(amount);
                              const newBal = currentBal - reqAmt;
                              onComplete(`৳ ${newBal.toLocaleString()}.৫০`);
                           } else {
                              setError("ভুল পিন, আবার চেষ্টা করুন");
                              setPin("");
                           }
                        }, 500);
                      }
                    }
                  }}
                  onDelete={() => {
                    setPin(pin.slice(0, -1));
                    setError("");
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

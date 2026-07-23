import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Check, QrCode, Store } from "lucide-react";
import { Keypad, PinDisplay } from "./AuthCommon";

export const MerchantPayFlow = ({ balance, onComplete, onCancel, addTransaction, userPin }: { 
  balance: string, 
  onComplete: (newBalance: number) => void, 
  onCancel: () => void,
  addTransaction: (t: any) => void,
  userPin: string
}) => {
  const [step, setStep] = useState<"input" | "review" | "success">("input");
  const [merchantId, setMerchantId] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [txnId] = useState(`pay${Math.random().toString(36).substr(2, 9)}`);

  const numAmount = parseFloat(amount) || 0;

  const handleNext = () => {
    if (!merchantId) return alert("মার্চেন্ট নম্বর বা আইডি লিখুন");
    if (numAmount <= 0) return alert("সঠিক পরিমাণ লিখুন");
    
    setStep("review");
  };

  const handlePinSubmit = () => {
    if (pin === userPin) {
      addTransaction({
          id: txnId,
          name: "মার্চেন্ট পেমেন্ট - " + merchantId,
          type: "merchant-pay",
          status: "সফল",
          date: new Date().toLocaleDateString('bn-BD'),
          amount: numAmount.toString(),
          color: "text-amber-500",
          iconBg: "bg-amber-50"
      });
      onComplete(numAmount);
      setStep("success");
    } else {
      setError("ভুল পিন কোড!");
      setPin("");
    }
  };

  if (step === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6"
      >
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex justify-center items-center shadow-lg border border-emerald-100">
          <Check size={40} className="text-emerald-500" strokeWidth={3} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">পেমেন্ট সফল হয়েছে!</h2>
          <p className="text-xs text-slate-400">মার্চেন্ট পেমেন্ট সফলভাবে সম্পন্ন হয়েছে</p>
        </div>
        <div className="w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4 text-left text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">মার্চেন্ট:</span>
            <span className="font-bold text-slate-800">সুপার সপ (এজেন্ট ID: {merchantId})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">পরিমাণ:</span>
            <span className="font-bold text-slate-800">৳ {numAmount.toLocaleString("bn-BD")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">চার্জ:</span>
            <span className="text-emerald-600 font-bold">ফ্রি (৳ ০.০০)</span>
          </div>
          <div className="border-t border-slate-50 pt-3 flex justify-between">
            <span className="text-slate-500">ট্রানজেকশন আইডি:</span>
            <span className="font-mono text-slate-400 uppercase">pay{Math.random().toString(36).substr(2, 9)}</span>
          </div>
        </div>
        <button 
          onClick={onCancel}
          className="w-full bg-[#0b2240] hover:bg-[#122e54] text-amber-400 font-bold py-4 rounded-2xl shadow-lg transition"
        >
          হোমে ফিরে যান
        </button>
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
              <h2 className="text-sm font-bold">মার্চেন্ট পেমেন্ট</h2>
              <div className="bg-[#0b2240]/10 text-[#0b2240] px-3 py-1 rounded-full text-[10px] font-bold">
                ব্যালেন্স: {balance}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">মার্চেন্ট আইডি বা নম্বর</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs">🏪</span>
                  <input 
                    type="text" 
                    value={merchantId}
                    onChange={(e) => setMerchantId(e.target.value)}
                    placeholder="মার্চেন্ট আইডি লিখুন"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs font-bold focus:border-amber-400 focus:outline-none transition"
                  />
                </div>
                <div className="pt-2">
                   <button onClick={() => setMerchantId("M-887766")} className="bg-amber-50 hover:bg-amber-100 text-amber-800 px-3 py-1.5 rounded-lg border border-amber-100 text-[10px] font-bold flex items-center gap-1">
                    <QrCode size={12} /> ডেমো কিউআর স্ক্যান করুন
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">পেমেন্ট পরিমাণ</label>
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
              <button onClick={() => setStep("input")} className="w-9 h-9 bg-white border border-slate-100 rounded-full flex justify-center items-center shadow-sm">
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-sm font-bold">পেমেন্ট নিশ্চিত করুন</h2>
              <div className="w-9" />
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                <span className="text-xs text-slate-400">মার্চেন্ট</span>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 mb-0.5">
                    <p className="text-xs font-bold text-slate-800">সুপার সপ</p>
                    <div className="bg-blue-500 rounded-full p-0.5">
                      <Check size={8} className="text-white" strokeWidth={4} />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Verified Merchant: {merchantId}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">টাকার পরিমাণ</span>
                <span className="text-sm font-bold text-[#0b2240]">৳ {numAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">চার্জ</span>
                <span className="text-xs font-bold text-emerald-600">ফ্রি</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-50">
                <span className="text-xs font-bold">সর্বমোট</span>
                <span className="text-sm font-extrabold text-[#0b2240]">৳ {numAmount}</span>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <p className="text-xs font-semibold text-slate-500">আপনার পিন নম্বর লিখুন</p>
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

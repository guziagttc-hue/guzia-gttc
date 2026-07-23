import { useState } from "react";
import { motion } from "motion/react";
import { Lock, ArrowLeft, Check } from "lucide-react";
import { Keypad, PinDisplay } from "./AuthCommon";

export function ForgotPassword({ onBack, onUpdatePin, onGoToStart }: { onBack: () => void, onUpdatePin: (info: string, pin: string) => Promise<void>, onGoToStart: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [accountInfo, setAccountInfo] = useState("");
  const [newPin, setNewPin] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const bdPhonePattern = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    if (emailPattern.test(accountInfo.trim()) || bdPhonePattern.test(accountInfo.trim())) {
      setStep(2);
      setFeedback("");
    } else {
      setFeedback("অনুগ্রহ করে একটি সঠিক ইমেইল অথবা ১১ ডিজিটের ফোন নম্বর দিন।");
      setIsError(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col justify-center p-8 bg-white min-h-screen"
    >
      <div className="w-full max-w-sm mx-auto text-center">
        {step === 1 ? (
          <>
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex justify-center items-center mx-auto mb-6">
              <Lock size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">পিন ভুলে গেছেন?</h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              আপনার নিবন্ধিত ইমেইল বা ফোন নম্বর দিন।
            </p>

            <form onSubmit={handleSubmit} className="text-left mb-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">ইমেইল অথবা ফোন নম্বর</label>
                <input 
                  type="text" 
                  value={accountInfo}
                  onChange={(e) => setAccountInfo(e.target.value)}
                  placeholder="017xxxxxxxx" 
                  className="w-full p-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  required 
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 shadow-md">
                পরবর্তী
              </button>
            </form>

            {feedback && (
              <p className={`text-sm font-semibold text-center mb-6 ${isError ? 'text-rose-600' : 'text-emerald-600'}`}>
                {feedback}
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">নতুন পিন সেট করুন</h2>
            <PinDisplay length={4} value={newPin} masked />
            <Keypad 
              onKeyPress={(k) => newPin.length < 4 && setNewPin(newPin + k)}
              onDelete={() => setNewPin(newPin.slice(0, -1))}
            />
            <button 
                onClick={async () => {
                    setIsSubmitting(true);
                    await onUpdatePin(accountInfo, newPin);
                    setIsSubmitting(false);
                }}
                disabled={newPin.length < 4 || isSubmitting}
                className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 shadow-md mt-6 disabled:bg-slate-300"
            >
                {isSubmitting ? "নিশ্চিত করা হচ্ছে..." : "নিশ্চিত করুন"}
            </button>
          </>
        )}

        <div className="flex flex-col gap-4 mt-6">
          <button onClick={onBack} className="flex items-center justify-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold text-sm">
            <ArrowLeft size={16} /> লগইন পেজে ফিরে যান
          </button>
          <button onClick={onGoToStart} className="flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm">
            প্রথম পেজে যান
          </button>
        </div>
      </div>
    </motion.div>
  );
}

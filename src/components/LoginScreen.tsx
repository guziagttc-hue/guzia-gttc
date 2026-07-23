import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Keypad, PinDisplay } from "./AuthCommon";
import { Fingerprint, Check } from "lucide-react";

export const LoginScreen = ({ userName, userRole, biometricEnabled, correctPin, onLogin, onForgotPassword }: { 
  userName: string; 
  userRole: 'user' | 'agent';
  biometricEnabled?: boolean;
  correctPin: string;
  onLogin: (pin: string) => void;
  onForgotPassword: () => void;
}) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  const t = {
    bn: {
      forgotPin: "পিন ভুলে গেছেন?",
      helpline: "হেল্পলাইন",
      enterPin: "আপনার পিন দিয়ে অ্যাপে প্রবেশ করুন",
      error: "ভুল পিন! আবার চেষ্টা করুন।",
      biometric: "বায়োমেট্রিক লগইন",
      agent: "এজেন্ট",
      terms: "নিয়ম ও শর্তাবলী"
    },
    en: {
      forgotPin: "Forgot PIN?",
      helpline: "Helpline",
      enterPin: "Enter your PIN to login",
      error: "Incorrect PIN! Try again.",
      biometric: "Biometric Login",
      agent: "Agent",
      terms: "Terms & Conditions"
    }
  }[lang];

  const handleKeyPress = (key: string) => {
    if (pin.length < 4) {
      const newPin = pin + key;
      setPin(newPin);
      if (newPin.length === 4) {
        // Simple mock validation
        setTimeout(() => {
          if (newPin === correctPin) {
            onLogin(newPin);
          } else {
            setError(true);
            setPin("");
          }
        }, 500);
      }
    }
  };

  const handleDelete = () => {
    setError(false);
    setPin(pin.slice(0, -1));
  };

  const handleBiometricLogin = () => {
    setIsScanning(true);
    // Simulate biometric login
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col justify-between p-6 pt-12 bg-slate-50 text-slate-800 min-h-screen"
    >
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
          className="text-xs font-bold text-slate-500 bg-slate-200 px-4 py-2 rounded-full hover:bg-slate-300"
        >
          {lang === 'bn' ? 'English' : 'বাংলা'}
        </button>
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="w-16 h-16 bg-amber-400 text-[#0b2240] rounded-2xl flex justify-center items-center mb-4 shadow-lg shadow-amber-400/20">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-1 text-center">{userName}</h2>
        {userRole === 'agent' && (
          <div className="bg-amber-400 text-[#0b2240] px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest mb-2">
            {t.agent}
          </div>
        )}
        <p className="text-xs text-slate-500 mb-6 text-center">{t.enterPin}</p>
        
        <PinDisplay length={4} value={pin} masked />
        
        {biometricEnabled && (
          <div className="flex flex-col items-center gap-4 my-6">
            <button 
              onClick={handleBiometricLogin}
              className="flex flex-col items-center gap-2 group p-4"
            >
              <div className="w-14 h-14 bg-slate-200/50 border border-slate-300 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-slate-300 transition-all relative overflow-hidden">
                 <Fingerprint size={28} />
                 {isScanning && !scanComplete && (
                   <motion.div 
                     initial={{ y: "100%" }}
                     animate={{ y: "-100%" }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 bg-amber-400/20 flex items-center justify-center border-t-2 border-amber-400"
                   />
                 )}
                 {scanComplete && (
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     className="absolute inset-0 bg-emerald-500 flex items-center justify-center"
                   >
                     <Check size={28} className="text-white" strokeWidth={3} />
                   </motion.div>
                 )}
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.biometric}</span>
            </button>
          </div>
        )}
        
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-rose-600 font-semibold mb-4 text-center"
          >
            {t.error}
          </motion.p>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-4 mb-4">
          <button 
            onClick={onForgotPassword}
            className="text-xs text-slate-500 hover:text-amber-500 font-semibold underline py-2 px-1"
          >
            {t.forgotPin}
          </button>
          <button 
            onClick={() => alert(lang === 'bn' ? "কাস্টমার কেয়ার: ১৬১৬৫\nকল করুন সরাসরি।" : "Customer Care: 16165\nCall directly.")}
            className="text-xs text-slate-500 hover:text-amber-500 font-semibold underline py-2 px-1"
          >
            {t.helpline}
          </button>
          <button 
            onClick={() => alert(lang === 'bn' ? "নিয়ম ও শর্তাবলী: অ্যাপের ভার্সন v1.0.0। সকল অধিকার সংরক্ষিত।" : "Terms & Conditions: App version v1.0.0. All rights reserved.")}
            className="text-xs text-slate-500 hover:text-amber-500 font-semibold underline py-2 px-1"
          >
            {t.terms}
          </button>
        </div>

      </div>

      <Keypad 
        onKeyPress={handleKeyPress} 
        onDelete={handleDelete} 
      />
    </motion.div>
  );
};

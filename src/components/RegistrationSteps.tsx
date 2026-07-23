import React from "react";
import { motion } from "motion/react";

interface StepProps {
  onNext: () => void;
  onPrev?: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
  onBackToLogin?: () => void;
  onGoToStart?: () => void;
}

export const StepWrapper = ({ onNext, onPrev, title, description, children, onBackToLogin, onGoToStart }: StepProps) => (
  <motion.div 
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -20, opacity: 0 }}
    className="flex-1 flex flex-col justify-between p-6"
  >
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-xs text-slate-500 leading-relaxed mb-6">{description}</p>
      {children}
    </div>
    <div className="flex flex-col gap-3 mt-8">
      <div className="flex gap-3">
        {onPrev && (
          <button 
            onClick={onPrev}
            className="w-1/3 bg-slate-100 text-slate-700 font-bold py-4 rounded-2xl transition hover:bg-slate-200"
          >
            ফিরে যান
          </button>
        )}
        <button 
          onClick={onNext}
          className={`${onPrev ? "w-2/3" : "w-full"} bg-[#0b2240] hover:bg-[#122e54] text-amber-400 font-bold py-4 rounded-2xl shadow-lg transition duration-150`}
        >
          পরবর্তী ধাপে যান
        </button>
      </div>
      {onBackToLogin && (
        <button onClick={onBackToLogin} className="text-slate-500 hover:text-indigo-600 font-semibold text-sm">
          লগইন পেজে ফিরে যান
        </button>
      )}
      {onGoToStart && (
        <button onClick={onGoToStart} className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm">
          প্রথম পেজে যান
        </button>
      )}
      <div className="flex justify-between mt-4 text-xs font-semibold text-slate-500">
        <button onClick={() => alert("পিন ভুলে গেছেন?")}>পিন ভুলে গেছেন?</button>
        <button onClick={() => alert("হেল্পলাইন")}>হেল্পলাইন</button>
        <button onClick={() => alert("নিয়ম ও শর্তাবলী")}>নিয়ম ও শর্তাবলী</button>
      </div>
    </div>
  </motion.div>
);

export const Step1 = ({ onNext, onBackToLogin, onGoToStart }: { 
  onNext: (data: { phone: string; email: string, role: 'user' | 'agent' }) => void;
  onBackToLogin: () => void;
  onGoToStart: () => void;
}) => {
  const [role, setRole] = React.useState<'user' | 'agent'>('user');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');

  const handleNext = () => {
    if (phone.length !== 11) {
      setError("মোবাইল নম্বর ১১ সংখ্যার হতে হবে");
      return;
    }
    if (!email) {
      setError("ইমেইল এড্রেস দিতেই হবে");
      return;
    }
    setError('');
    onNext({ phone, email, role });
  };

  return (
    <StepWrapper 
      onNext={handleNext}
      onBackToLogin={onBackToLogin}
      onGoToStart={onGoToStart}
      title="একাউন্ট তৈরি করুন"
      description="Shondho MFS-এ আপনাকে স্বাগতম। আপনার একাউন্টের ধরণ নির্বাচন করুন এবং তথ্য প্রদান করুন।"
    >
      <div className="space-y-4">
        {/* Role Selector */}
        <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
          <button 
            onClick={() => setRole('user')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${role === 'user' ? 'bg-[#0b2240] text-amber-400 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            পারসোনাল
          </button>
          <button 
            onClick={() => setRole('agent')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${role === 'agent' ? 'bg-[#0b2240] text-amber-400 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            এজেন্ট
          </button>
        </div>

        {error && <p className="text-xs text-rose-600 font-bold">{error}</p>}

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 block">{role === 'agent' ? 'এজেন্ট নম্বর' : 'মোবাইল নম্বর'}</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-xs font-bold text-slate-400">+৮৮০</span>
            <input 
              type="tel" 
              placeholder="১৭XXXXXXXX" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-14 pr-4 py-3 text-sm font-semibold focus:border-amber-400 focus:outline-none transition"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 block">{role === 'agent' ? 'বিজনেস ইমেইল' : 'ইমেইল এড্রেস'}</label>
          <input 
            type="email" 
            placeholder="example@mail.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:border-amber-400 focus:outline-none transition"
          />
        </div>

        {role === 'agent' && (
          <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl">
            <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
              * এজেন্ট হিসেবে ক্যাশ ইন এবং ক্যাশ আউট লেনদেনে আকর্ষণীয় কমিশন আয় করুন। আপনার আয়ের বিস্তারিত ড্যাশবোর্ডে দেখতে পাবেন।
            </p>
          </div>
        )}

      </div>
    </StepWrapper>
  );
};

export const Step2 = ({ onNext, onPrev, onBackToLogin, onGoToStart }: { onNext: (data: { name: string, district: string, thana: string, union: string }) => void; onPrev: () => void; onBackToLogin: () => void; onGoToStart: () => void; }) => {
  const [name, setName] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [thana, setThana] = React.useState('');
  const [union, setUnion] = React.useState('');
  const [error, setError] = React.useState('');

  const handleNext = () => {
    if (!name || !district || !thana || !union) {
      setError("সবগুলো ঘর পূরণ করা আবশ্যক");
      return;
    }
    setError('');
    onNext({ name, district, thana, union });
  };

  return (
    <StepWrapper 
      onNext={handleNext}
      onPrev={onPrev}
      onBackToLogin={onBackToLogin}
      onGoToStart={onGoToStart}
      title="আপনার বিস্তারিত তথ্য"
      description="আপনার জাতীয় পরিচয়পত্র (NID) অনুযায়ী সঠিক তথ্য প্রদান করুন।"
    >
      {error && <p className="text-xs text-rose-600 font-bold mb-4">{error}</p>}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 block">সম্পূর্ণ নাম</label>
          <input 
            type="text" 
            placeholder="আপনার নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:border-amber-400 focus:outline-none transition"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">জেলা</label>
            <input 
              type="text" 
              placeholder="জেলা"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:border-amber-400 focus:outline-none transition"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">থানা</label>
            <input 
              type="text" 
              placeholder="থানা"
              value={thana}
              onChange={(e) => setThana(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:border-amber-400 focus:outline-none transition"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">ইউনিয়ন</label>
            <input 
              type="text" 
              placeholder="ইউনিয়ন"
              value={union}
              onChange={(e) => setUnion(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:border-amber-400 focus:outline-none transition"
            />
          </div>
        </div>
      </div>
    </StepWrapper>
  );
};

export const AgentIdStep = ({ onNext, onPrev, onBackToLogin, onGoToStart }: { onNext: (data: { idCardUrl: string }) => void; onPrev: () => void; onBackToLogin: () => void; onGoToStart: () => void; }) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState('');

  const handleNext = () => {
    if (!file) {
      setError("আইডি কার্ডের ছবি আপলোড করা আবশ্যক");
      return;
    }
    setError('');
    onNext({ idCardUrl: URL.createObjectURL(file) });
  };

  return (
    <StepWrapper 
      onNext={handleNext}
      onPrev={onPrev}
      onBackToLogin={onBackToLogin}
      onGoToStart={onGoToStart}
      title="এজেন্ট আইডি কার্ড আপলোড"
      description="আপনার জাতীয় পরিচয়পত্র (NID) এর সামনের দিকের ছবি আপলোড করুন।"
    >
      {error && <p className="text-xs text-rose-600 font-bold mb-4">{error}</p>}
      <div className="space-y-4">
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition">
          {file ? (
            <div className="text-xs font-semibold text-slate-700">{file.name}</div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
              <svg className="w-8 h-8 mb-3 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 8"/></svg>
              <p className="text-xs text-slate-500 font-semibold">ছবি সিলেক্ট করতে ক্লিক করুন</p>
            </div>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>
      </div>
    </StepWrapper>
  );
};

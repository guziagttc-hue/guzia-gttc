import React, { useState } from 'react';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

interface AuthScreenProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (email: string, password: string, name: string, role: 'user' | 'agent') => Promise<void>;
}

export const AuthScreen = ({ onLogin, onRegister }: AuthScreenProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'agent'>('user');
  const { language, toggleLanguage } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'login') {
      await onLogin(email, password);
    } else {
      if (password !== confirmPassword) {
        alert('পাসওয়ার্ড মিলছে না!');
        return;
      }
      await onRegister(email, password, name, role);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center p-6 bg-gradient-to-br from-indigo-50 to-slate-100 min-h-screen">
      <div className="bg-white p-10 md:p-12 rounded-[2rem] shadow-xl w-full border border-slate-100 relative">
        <button 
             onClick={toggleLanguage}
             className="absolute top-4 right-4 bg-slate-100 px-3 py-2 rounded-xl text-indigo-600 font-bold text-xs hover:bg-slate-200 transition"
          >
            বাংলা / English
          </button>
        <div className="flex flex-col items-center mb-8">
            <img src="/src/assets/images/app_logo_1785137051338.jpg" alt="Shondho Pay Logo" className="w-20 h-20 rounded-2xl mb-4 shadow-sm" />
            <h1 className="text-3xl font-extrabold text-slate-900">Shondho Pay</h1>
            <p className="text-slate-500 mt-2 text-sm">আপনার সুবিধামতো আর্থিক সেবা</p>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
          <button 
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${activeTab === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            onClick={() => setActiveTab('login')}
          >
            লগইন
          </button>
          <button 
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${activeTab === 'register' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            onClick={() => setActiveTab('register')}
          >
            রেজিস্ট্রেশন
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {activeTab === 'register' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">আপনার নাম</label>
                <div className="relative">
                    <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="আপনার নাম লিখুন" required />
                </div>
              </div>
              
              <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">একাউন্টের ধরন</label>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setRole('user')} className={`flex-1 py-3 rounded-xl border ${role === 'user' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-slate-50 border-slate-200'}`}>সাধারণ গ্রাহক</button>
                    <button type="button" onClick={() => setRole('agent')} className={`flex-1 py-3 rounded-xl border ${role === 'agent' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-slate-50 border-slate-200'}`}>এজেন্ট</button>
                  </div>
              </div>
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">ইমেইল</label>
            <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="example@mail.com" required />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">পাসওয়ার্ড</label>
            <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="••••••••" required />
            </div>
          </div>
          {activeTab === 'register' && (
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">কনফার্ম পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-10 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="••••••••" required />
              </div>
            </div>
          )}
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-200 mt-2">
            {activeTab === 'login' ? 'লগইন করুন' : 'রেজিস্ট্রেশন করুন'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          {activeTab === 'login' && (
            <button className="text-sm text-indigo-600 font-medium">পাসওয়ার্ড ভুলে গেছেন?</button>
          )}
          <p className="text-xs text-slate-500">
             লগইন বা রেজিস্ট্রেশন করলে আপনি আমাদের <span className="text-indigo-600 font-medium underline">শর্তাবলি</span> মেনে নিচ্ছেন।
          </p>
          {activeTab === 'register' && (
            <p className="text-sm text-slate-600">
              ইতিমধ্যে অ্যাকাউন্ট আছে? <button onClick={() => setActiveTab('login')} className="text-indigo-600 font-bold">লগইন করুন</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

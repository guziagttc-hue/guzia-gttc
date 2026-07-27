import React, { useState } from 'react';

interface AuthScreenProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (email: string, password: string, name: string) => Promise<void>;
}

export const AuthScreen = ({ onLogin, onRegister }: AuthScreenProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'login') {
      await onLogin(email, password);
    } else {
      if (password !== confirmPassword) {
        alert('পাসওয়ার্ড মিলছে না!');
        return;
      }
      await onRegister(email, password, name);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center p-6 bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button 
            className={`flex-1 py-2 rounded-lg font-bold ${activeTab === 'login' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
            onClick={() => setActiveTab('login')}
          >
            লগইন
          </button>
          <button 
            className={`flex-1 py-2 rounded-lg font-bold ${activeTab === 'register' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
            onClick={() => setActiveTab('register')}
          >
            রেজিস্ট্রেশন
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'register' && (
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">নাম</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-slate-200 rounded-lg" required />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">ইমেইল</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-slate-200 rounded-lg" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">পাসওয়ার্ড</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-slate-200 rounded-lg" required />
          </div>
          {activeTab === 'register' && (
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">কনফার্ম পাসওয়ার্ড</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 border border-slate-200 rounded-lg" required />
            </div>
          )}
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700">
            {activeTab === 'login' ? 'লগইন করুন' : 'রেজিস্ট্রেশন করুন'}
          </button>
        </form>
      </div>
    </div>
  );
};

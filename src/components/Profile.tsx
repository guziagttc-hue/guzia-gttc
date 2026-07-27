import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ChevronLeft, 
  User, 
  ShieldCheck, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Phone,
  Mail,
  Award,
  Bell,
  Fingerprint,
  Database
} from "lucide-react";
import { UserData } from "../types";

export const Profile = ({ 
  userData, 
  balance,
  onBack, 
  onLogout,
  onUpdateUser
}: { 
  userData: UserData, 
  balance: string,
  onBack: () => void,
  onLogout: () => void,
  onUpdateUser: (data: Partial<UserData>) => void
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<UserData>>(userData);
  const [needsAuth, setNeedsAuth] = useState(true);

  const handleSave = () => {
    onUpdateUser(editedData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-screen overflow-y-auto">
      {/* Profile Header */}
      <div className="bg-[#0b2240] pt-8 pb-20 px-4 sm:px-6 rounded-b-[32px] sm:rounded-b-[40px] relative text-white">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <button onClick={onBack} className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 rounded-full flex justify-center items-center">
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-xs sm:text-sm font-bold tracking-tight">আমার প্রোফাইল</h2>
          <button className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 rounded-full flex justify-center items-center">
            <Bell size={16} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            {userData.profilePictureUrl ? (
              <img 
                src={userData.profilePictureUrl}
                alt={userData.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover shadow-xl border-4 border-white/10"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-amber-400 rounded-3xl flex items-center justify-center text-[#0b2240] shadow-xl border-4 border-white/10 overflow-hidden">
                <User size={40} sm-size={48} strokeWidth={1.5} />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 bg-emerald-500 border-4 border-[#0b2240] rounded-full flex items-center justify-center shadow-lg">
              <ShieldCheck size={12} sm-size={14} className="text-white" />
            </div>
          </div>
          <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-black">{userData.name}</h3>
          <div className="flex items-center gap-1.5 mt-1">
             <span className="bg-amber-400/20 text-amber-400 text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded border border-amber-400/30">
               {userData.role === 'agent' ? 'Premium Agent' : 'Verified User'}
             </span>
          </div>
        </div>

        {/* Balance Card Overlay */}
        <div className="absolute -bottom-10 sm:-bottom-12 left-4 sm:left-6 right-4 sm:right-6">
           <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">বর্তমান ব্যালেন্স</p>
                <h4 className="text-lg sm:text-xl font-black text-[#0b2240]">{balance}</h4>
              </div>

           </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="px-4 sm:px-6 mt-14 sm:mt-16 space-y-5 sm:space-y-6 pb-20 sm:pb-24">
        {/* Biometric Toggle Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                <Fingerprint size={20} />
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-slate-800">বায়োমেট্রিক লগইন</h4>
                <p className="text-[9px] text-slate-400">সহজে প্রবেশের জন্য সক্রিয় করুন</p>
              </div>
           </div>
           <button 
             onClick={() => onUpdateUser({ biometricEnabled: !userData.biometricEnabled })}
             className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${userData.biometricEnabled ? 'bg-emerald-500' : 'bg-slate-200'}`}
           >
             <motion.div 
               animate={{ x: userData.biometricEnabled ? 24 : 2 }}
               className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm"
             />
           </button>
        </div>

        {/* Contact Info Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
           <div className="flex justify-between items-start">
             <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ব্যক্তিগত তথ্য</h4>
             {isEditing ? (
               <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)} className="text-[10px] font-bold text-slate-400">বাতিল</button>
                  <button onClick={handleSave} className="text-[10px] font-bold text-emerald-600">সংরক্ষণ</button>
               </div>
             ) : (
               <button onClick={() => setIsEditing(true)} className="text-[10px] font-bold text-blue-600">এডিট করুন</button>
             )}
           </div>
           
           {isEditing ? (
             <div className="space-y-3 pt-4 border-t border-slate-50">
                <input value={editedData.name} onChange={(e) => handleInputChange("name", e.target.value)} className="w-full p-2 border rounded" placeholder="নাম" />
                <input 
                  value={editedData.phone || ""} 
                  onChange={(e) => handleInputChange("phone", e.target.value)} 
                  className="w-full p-2 border rounded" 
                  placeholder="ফোন নম্বর" 
                  disabled={!!userData.phone}
                />
                <input value={editedData.district || ""} onChange={(e) => handleInputChange("district", e.target.value)} className="w-full p-2 border rounded" placeholder="জেলা" />
                <input value={editedData.thana || ""} onChange={(e) => handleInputChange("thana", e.target.value)} className="w-full p-2 border rounded" placeholder="থানা" />
                <input value={editedData.union || ""} onChange={(e) => handleInputChange("union", e.target.value)} className="w-full p-2 border rounded" placeholder="ইউনিয়ন" />
                <input value={editedData.address || ""} onChange={(e) => handleInputChange("address", e.target.value)} className="w-full p-2 border rounded" placeholder="ঠিকানা" />
             </div>
           ) : (
             <div className="pt-4 border-t border-slate-50 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ইমেইল এড্রেস</p>
                    <p className="text-xs font-bold text-slate-700">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ফোন নম্বর</p>
                    <p className="text-xs font-bold text-slate-700">{userData.phone || "N/A"}</p>
                  </div>
                </div>
             </div>
           )}
        </div>


        {/* Transaction Limits */}
        <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-100">
           <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={16} className="text-emerald-600" />
              <h4 className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">লেনদেনের লিমিট (আজ)</h4>
           </div>
           <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-emerald-700 mb-1">
                  <span>সেন্ড মানি</span>
                  <span>৳ ০ / ০</span>
                </div>
                <div className="h-1.5 bg-emerald-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 w-0 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold text-emerald-700 mb-1">
                  <span>ক্যাশ আউট</span>
                  <span>৳ ০ / ১০,০০০</span>
                </div>
                <div className="h-1.5 bg-emerald-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 w-0 rounded-full" />
                </div>
              </div>
           </div>
        </div>

        {/* Google Drive Integration */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Google Drive</h4>
          <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
            {needsAuth ? (
              <button 
                onClick={() => alert("এই ফিচারটি শীঘ্রই আসছে!")}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition border-b border-slate-50 last:border-0 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition">
                    <Database size={18} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Connect Google Drive</span>
                </div>
              </button>
            ) : (
              <div className="p-4 text-xs font-bold text-emerald-600 flex items-center gap-2">
                <ShieldCheck size={16} />
                Google Drive Connected
              </div>
            )}
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">অ্যাকাউন্ট সেটিংস</h4>
          <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
             <ProfileMenuItem icon={<ShieldCheck size={18} />} label="নিরাপত্তা ও পিন পরিবর্তন" color="text-emerald-500" />
             <ProfileMenuItem icon={<Award size={18} />} label="রেফার করুন ও আয় করুন" color="text-amber-500" />
             <ProfileMenuItem icon={<Settings size={18} />} label="অ্যাপ সেটিংস ও ভাষা" color="text-blue-500" />
             <ProfileMenuItem icon={<HelpCircle size={18} />} label="হেল্প ও কাস্টমার সাপোর্ট" color="text-indigo-500" />
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full bg-rose-50 text-rose-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-100 transition active:scale-[0.98]"
        >
          <LogOut size={18} />
          <span>লগ আউট করুন</span>
        </button>

        <p className="text-center text-[10px] text-slate-400 font-medium pb-8 leading-relaxed">
          Shondho MFS Version 2.0.4 (Stable)<br/>
          &copy; ২০২৪ সন্ধ্যা টেকনোলজিস লিমিটেড
        </p>
      </div>
    </div>
  );
};

const ProfileMenuItem = ({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) => (
  <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition border-b border-slate-50 last:border-0 group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition`}>
        {icon}
      </div>
      <span className="text-xs font-bold text-slate-700">{label}</span>
    </div>
    <ChevronRight size={16} className="text-slate-300" />
  </button>
);

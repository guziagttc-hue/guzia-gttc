import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, Share2, Download, Shield } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export const MyQR = ({ name, identifier, onBack }: { name: string, identifier: string, onBack: () => void }) => {
  return (
    <div className="flex-1 flex flex-col bg-[#0b2240] min-h-screen text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="w-9 h-9 bg-white/10 rounded-full flex justify-center items-center">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-sm font-bold">আমার কিউআর কোড</h2>
        <div className="w-9" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="bg-white p-6 rounded-[40px] shadow-2xl relative">
          <div className="bg-white rounded-3xl p-3 border-2 border-slate-100">
             <QRCodeSVG 
               value={identifier} 
               size={220}
               level="H"
               includeMargin={false}
               imageSettings={{
                 src: "", // Can be a custom logo URL
                 height: 40,
                 width: 40,
                 excavate: true,
               }}
             />
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-[#0b2240] shadow-md border-2 border-white">
                  <Shield size={24} strokeWidth={2.5} />
                </div>
             </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-400 text-[#0b2240] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-lg">
            SHONDHO MFS Verified
          </div>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-xs text-slate-400 font-mono tracking-wider">{identifier}</p>
        </div>

        <div className="flex gap-4 w-full max-w-xs">
          <button className="flex-1 bg-white/10 hover:bg-white/20 py-3.5 rounded-2xl flex flex-col items-center gap-1 transition">
            <Download size={20} className="text-amber-400" />
            <span className="text-[10px] font-bold">ডাউনলোড</span>
          </button>
          <button className="flex-1 bg-white/10 hover:bg-white/20 py-3.5 rounded-2xl flex flex-col items-center gap-1 transition">
            <Share2 size={20} className="text-amber-400" />
            <span className="text-[10px] font-bold">শেয়ার</span>
          </button>
        </div>
      </div>
      
      <p className="text-[10px] text-slate-500 text-center mt-8 px-8">
        টাকা গ্রহণ করতে এই কিউআর কোডটি অন্যকে স্ক্যান করতে বলুন। এটি আপনার একাউন্টের জন্য অনন্য।
      </p>
    </div>
  );
};

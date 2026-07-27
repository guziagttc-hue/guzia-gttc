import React, { useState } from 'react';

interface RegistrationDetailsProps {
  onComplete: (idNumber: string, phoneNumber: string) => Promise<void>;
}

export const RegistrationDetails = ({ onComplete }: RegistrationDetailsProps) => {
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onComplete(idNumber, phoneNumber);
  };

  return (
    <div className="flex-1 flex flex-col justify-center p-6 bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-6 text-center text-slate-800">অতিরিক্ত তথ্য</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">আইডি কার্ড নম্বর</label>
            <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="w-full p-3 border border-slate-200 rounded-lg" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">ফোন নম্বর</label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-3 border border-slate-200 rounded-lg" required />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 mt-4">
            সংরক্ষণ করুন
          </button>
        </form>
      </div>
    </div>
  );
};

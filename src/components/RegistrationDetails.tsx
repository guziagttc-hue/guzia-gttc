import React, { useState } from 'react';
import { CreditCard, Phone } from 'lucide-react';

interface RegistrationDetailsProps {
  onComplete: (data: any) => Promise<void>;
}

export const RegistrationDetails = ({ onComplete }: RegistrationDetailsProps) => {
  const [formData, setFormData] = useState({
    nameBn: '',
    nameEn: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    nidNumber: '',
    village: '',
    postOffice: '',
    thana: '',
    district: '',
    phoneNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onComplete(formData);
  };

  return (
    <div className="flex-1 flex flex-col justify-center p-6 bg-slate-50 min-h-screen">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md mx-auto border border-slate-100">
        <h2 className="text-2xl font-extrabold mb-2 text-center text-slate-900">অতিরিক্ত তথ্য</h2>
        <p className="text-slate-500 mb-8 text-center text-sm">আপনার পরিচয় নিশ্চিত করুন</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nameBn" onChange={handleChange} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="নাম (বাংলা)" required />
          <input name="nameEn" onChange={handleChange} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="Name (English)" required />
          <input name="fatherName" onChange={handleChange} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="পিতার নাম" required />
          <input name="motherName" onChange={handleChange} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="মাতার নাম" required />
          <input name="dateOfBirth" type="date" onChange={handleChange} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="জন্ম তারিখ" required />
          <input name="nidNumber" onChange={handleChange} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="NID নম্বর" required />
          <input name="village" onChange={handleChange} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="গ্রাম/রাস্তা" required />
          <input name="postOffice" onChange={handleChange} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="ডাকঘর" required />
          <input name="thana" onChange={handleChange} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="থানা" required />
          <input name="district" onChange={handleChange} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="জেলা" required />
          <input name="phoneNumber" onChange={handleChange} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="ফোন নম্বর" required />
          
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 mt-4">
            সংরক্ষণ করুন
          </button>
        </form>
      </div>
    </div>
  );
};

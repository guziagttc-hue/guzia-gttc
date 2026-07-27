import React from 'react';

export const Keypad = ({ onKeyPress, onDelete }: { onKeyPress: (key: string) => void, onDelete: () => void }) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full mt-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "⌫"].map((key) => (
        <button
          key={key}
          onClick={() => {
            if (key === "C") {
              // Not strictly used by all flows but good to have
            } else if (key === "⌫") {
              onDelete();
            } else {
              onKeyPress(key.toString());
            }
          }}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-lg font-bold py-4 rounded-xl transition"
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export const PinDisplay = ({ length, value, masked }: { length: number, value: string, masked: boolean }) => {
  return (
    <div className="flex gap-2">
      {[...Array(length)].map((_, i) => (
        <div 
          key={i} 
          className={`w-8 h-8 rounded-lg flex items-center justify-center border ${value[i] ? 'bg-[#0b2240] border-[#0b2240]' : 'bg-white border-slate-200'}`}
        >
            {value[i] && !masked && <span className="text-white font-bold">{value[i]}</span>}
            {value[i] && masked && <div className="w-2 h-2 rounded-full bg-white"></div>}
        </div>
      ))}
    </div>
  );
};

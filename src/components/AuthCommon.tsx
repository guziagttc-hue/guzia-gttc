import { motion } from "motion/react";
import { Delete } from "lucide-react";

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onBack?: () => void;
  backLabel?: string;
  dark?: boolean;
}

export const Keypad = ({ onKeyPress, onDelete, onBack, backLabel, dark }: KeypadProps) => (
  <div className={`pt-6 border-t ${dark ? "border-slate-800" : "border-slate-100"} bg-transparent`}>
    <div className="grid grid-cols-3 gap-y-3 gap-x-6 text-center max-w-xs mx-auto">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((key) => (
        <button 
          key={key}
          onClick={() => onKeyPress(key)}
          className={`py-3 text-lg font-bold rounded-xl transition ${dark ? "text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"}`}
        >
          {key}
        </button>
      ))}
      <button 
        onClick={onBack}
        className={`py-3 text-[10px] font-bold rounded-xl flex justify-center items-center ${dark ? "text-slate-400 hover:bg-white/10" : "text-slate-400 hover:bg-slate-100"}`}
      >
        {backLabel}
      </button>
      <button 
        onClick={() => onKeyPress("0")}
        className={`py-3 text-lg font-bold rounded-xl transition ${dark ? "text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"}`}
      >
        0
      </button>
      <button 
        onClick={onDelete}
        className={`py-3 rounded-xl flex justify-center items-center transition ${dark ? "text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"}`}
      >
        <Delete size={20} className={dark ? "text-slate-400" : "text-slate-500"} />
      </button>
    </div>
  </div>
);

interface PinDisplayProps {
  length: number;
  value: string;
  dark?: boolean;
  masked?: boolean;
}

export const PinDisplay = ({ length, value, dark, masked }: PinDisplayProps) => (
  <div className="flex gap-4 justify-center mb-6">
    {Array.from({ length }).map((_, i) => (
      <div 
        key={i}
        className={`w-12 h-12 rounded-xl border flex justify-center items-center text-xl font-extrabold transition-all duration-200
          ${dark ? "border-slate-700" : "border-slate-200"}
          ${value[i] ? (dark ? "bg-amber-400 border-amber-400 text-[#0b2240]" : "bg-white border-amber-400 text-[#0b2240]") : (dark ? "bg-transparent" : "bg-white")}
        `}
      >
        {masked ? (value[i] ? "●" : "") : (value[i] || "")}
      </div>
    ))}
  </div>
);

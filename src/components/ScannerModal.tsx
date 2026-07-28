import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Zap, Image as ImageIcon } from "lucide-react";

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

export const ScannerModal = ({ isOpen, onClose, onScan }: ScannerModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      import("html5-qrcode").then(({ Html5Qrcode }) => {
        Html5Qrcode.scanFile(e.target.files![0], false)
          .then((decodedText) => {
            onScan(decodedText);
          })
          .catch((err) => {
            console.error("Gallery scan error:", err);
            setError("কিউআর কোড খুঁজে পাওয়া যায়নি।");
          });
      });
    }
  };
  
  useEffect(() => {
    import("html5-qrcode").then(({ Html5QrcodeScanner }) => {
        if (!isOpen) return;

        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
        );

        scanner.render(
            (decodedText) => {
                scanner.clear();
                onScan(decodedText);
            },
            (err) => {
                console.warn(err);
            }
        );

        return () => {
            scanner.clear();
        };
    });
  }, [isOpen, onScan]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 pt-12 text-white z-10">
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
              <X size={24} />
            </button>
            <h2 className="text-lg font-bold">QR স্ক্যান করুন</h2>
            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Camera View */}
          <div className="flex-1 relative overflow-hidden">
            <div id="reader" className="w-full h-full" />
          </div>

          {/* Bottom Actions */}
          <div className="p-10 pb-16 flex justify-evenly items-center text-white">
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-white/10 rounded-full flex justify-center items-center group-hover:bg-white/20 transition">
                <Zap size={24} />
              </div>
              <span className="text-xs font-bold">ফ্ল্যাশ</span>
            </button>
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 bg-white/10 rounded-full flex justify-center items-center group-hover:bg-white/20 transition">
                <ImageIcon size={24} />
              </div>
              <span className="text-xs font-bold">গ্যালারি</span>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileScan}
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

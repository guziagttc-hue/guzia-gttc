import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Zap, Image as ImageIcon } from "lucide-react";

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScannerModal = ({ isOpen, onClose }: ScannerModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Camera error:", err);
        setHasPermission(false);
        setError("ক্যামেরা ব্যবহারের অনুমতি পাওয়া যায়নি।");
      }
    };

    if (isOpen) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen]);

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
            {hasPermission === false ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex justify-center items-center mb-4">
                  <X size={32} className="text-rose-500" />
                </div>
                <p className="text-sm font-medium">{error}</p>
                <button 
                  onClick={onClose}
                  className="mt-6 px-6 py-2 bg-amber-400 text-[#0b2240] font-bold rounded-xl"
                >
                  ফিরে যান
                </button>
              </div>
            ) : (
              <>
                <video 
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Darkened edges */}
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Scanning Area (Cutout) */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ clipPath: 'polygon(0% 0%, 0% 100%, 10% 100%, 10% 30%, 90% 30%, 90% 70%, 10% 70%, 10% 100%, 100% 100%, 100% 0%)' }}
                  >
                    {/* The cutout itself is just transparent, the above clip-path handles the darkening around it in a more complex way, but let's simplify for the overlay UI */}
                  </div>

                  {/* Better Overlay approach: 4 dark blocks around the center square */}
                  <div className="absolute top-0 left-0 right-0 h-[25%]" />
                  <div className="absolute bottom-0 left-0 right-0 h-[25%]" />
                  <div className="absolute top-[25%] bottom-[25%] left-0 w-[10%]" />
                  <div className="absolute top-[25%] bottom-[25%] right-0 w-[10%]" />

                  {/* The actual scan box */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      {/* Corner Borders */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-400 rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-400 rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-400 rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-400 rounded-br-lg" />
                      
                      {/* Scanning Line Animation */}
                      <motion.div 
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-0.5 bg-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.8)] z-20"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="p-10 pb-16 flex justify-center gap-12 text-white">
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-white/10 rounded-full flex justify-center items-center group-hover:bg-white/20 transition">
                <Zap size={24} />
              </div>
              <span className="text-xs font-bold">ফ্ল্যাশ</span>
            </button>
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-white/10 rounded-full flex justify-center items-center group-hover:bg-white/20 transition">
                <ImageIcon size={24} />
              </div>
              <span className="text-xs font-bold">গ্যালারি</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

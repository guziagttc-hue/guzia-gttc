import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Modal = ({ isOpen, title, message, onClose }: { isOpen: boolean, title: string, message: string, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-sm text-slate-600 mb-6">{message}</p>
            <button 
              onClick={onClose}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700"
            >
              ঠিক আছে
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

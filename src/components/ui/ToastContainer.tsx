'use client';

import React from 'react';
import { useToastStore } from '@/store/useToastStore';
import { ShieldTick, CrossIcon } from '@/components/icons';
import { motion, AnimatePresence } from 'framer-motion';

export function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        className="pointer-events-auto w-[380px] bg-[#00C853] rounded-[8px] p-4 shadow-lg flex items-start gap-4 relative overflow-hidden"
                    >
                        {/* Progress bar effect (optional, but looks premium) */}
                        <motion.div 
                            initial={{ width: '100%' }}
                            animate={{ width: 0 }}
                            transition={{ duration: 5, ease: 'linear' }}
                            className="absolute bottom-0 left-0 h-[3px] bg-white/20"
                        />

                        <div className="mt-0.5">
                            <ShieldTick className="w-8 h-8 text-white" />
                        </div>
                        
                        <div className="flex-1 flex flex-col gap-1">
                            <h4 className="text-white font-inter font-semibold text-[15px] leading-[16px]">
                                {toast.title}
                            </h4>
                            <p className="text-white font-inter font-normal text-[14px] leading-[20px]">
                                {toast.description}
                            </p>
                        </div>

                        <button 
                            onClick={() => removeToast(toast.id)}
                            className="text-white/80 hover:text-white transition-colors mt-0.5"
                        >
                            <CrossIcon className="w-[12px] h-[12px]" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

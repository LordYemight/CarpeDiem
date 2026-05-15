'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  description = 'Modal content',
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/10 backdrop-blur-[2px]"
              />
            </Dialog.Overlay>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <Dialog.Content
                asChild
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="relative z-10 w-full max-w-[520px] bg-white rounded-[12px] shadow-[0px_10px_14px_0px_rgba(15,42,81,0.03)] border border-CarpeDiemBlueLight outline-none"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-CarpeDiemBlueLight">
                    <Dialog.Title className="text-CarpeDiemGreyDark font-proxima font-semibold text-[15px] leading-[15px]">
                        {title}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="text-CarpeDiemGrey hover:text-CarpeDiemGreyDark transition-colors cursor-pointer"
                        aria-label="Close modal"
                      >
                        <X size={20} />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="p-6">
                    {children}
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

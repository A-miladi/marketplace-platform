import { useOutSideClick } from "@/hooks";
import { cn } from "@/utils";
import React, { useRef } from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

function Modal({ children, isOpen, onClose, className }: ModalProps) {
  const ref = useRef(null);
  useOutSideClick(ref, onClose);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black/15 backdrop-blur-sm">
          <div className={cn("p-4 md:p-6", className)} ref={ref}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;

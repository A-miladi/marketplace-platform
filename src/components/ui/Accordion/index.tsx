"use client";

import { ArrowDown } from "@/components/icons";
import { useOutSideClick } from "@/hooks";
import { cn } from "@/utils";
import { ReactNode, useRef, useState } from "react";

interface IAccordion {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Accordion = ({ label, icon, className, children }: IAccordion) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useOutSideClick(ref, () => {
    setIsOpen(false);
  });

  return (
    <div
      ref={ref}
      className={cn("group z-20 h-full w-full cursor-pointer", className)}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "z-20 flex h-full w-full cursor-pointer items-center justify-between",
          "transition-colors duration-200",
        )}
      >
        <span className="text-base font-medium text-neutral-800">{label}</span>
        <div
          className={cn(
            "transform cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        >
          {icon ? icon : <ArrowDown color="currentColor" size={18} />}
        </div>
      </div>

      <div
        className={cn(
          "hidden transition-all duration-200 ease-[cubic-bezier(0.87,_0,_0.13,_1)]",
          isOpen ? "mt-2 block opacity-100" : "mt-0 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;

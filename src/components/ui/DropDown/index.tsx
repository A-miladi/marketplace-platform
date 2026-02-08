"use client";

import { useOutSideClick } from "@/hooks";
import { IDropDown } from "@/types";
import { cn } from "@/utils";
import { useRef } from "react";

const DropDown = ({ children, icon, label, open, setOpen }: IDropDown) => {
  const ref = useRef(null);

  useOutSideClick(ref, () => {
    setOpen(false);
  });

  const toggleDropDown = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full">
      <button onClick={toggleDropDown} className="flex items-center gap-2">
        {label}
        {icon && <div>{icon}</div>}
      </button>
      <div
        ref={ref}
        className={cn(
          "absolute z-30 hidden max-h-72 min-w-[115px] scale-95 overflow-auto rounded-lg border border-neutral-50 bg-white opacity-0 transition-all",
          {
            "block scale-100 opacity-100": open,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;

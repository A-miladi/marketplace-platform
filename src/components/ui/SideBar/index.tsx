import { CloseSquare } from "@/components/icons";
import { useOutSideClick } from "@/hooks";
import { ISideBar } from "@/types";
import { cn } from "@/utils";
import { useRef } from "react";

export const SideBar = ({
  label,
  children,
  open,
  onClose,
  className,
  icon,
}: ISideBar) => {
  const ref = useRef(null);

  useOutSideClick(ref, () => {
    onClose();
  });

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 h-full w-full overflow-auto bg-black/50 transition-all duration-300",
        open
          ? "pointer-events-auto opacity-100 backdrop-blur-sm"
          : "pointer-events-none opacity-0 backdrop-blur-0",
      )}
    >
      <div
        ref={ref}
        className={cn(
          "absolute left-0 top-0 h-full w-5/6 bg-white pb-5 pt-6 shadow-xl transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:w-1/3",
          open ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 pb-3 text-neutral-950">
          <p className="truncate text-lg font-medium">{label}</p>
          <div
            onClick={onClose}
            className="cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-red-500"
          >
            {icon ? icon : <CloseSquare size={20} color="currentColor" />}
          </div>
        </div>

        <div className="h-full px-5">{children}</div>
      </div>
    </div>
  );
};

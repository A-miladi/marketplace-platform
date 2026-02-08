import { cn } from "@/utils";
import { forwardRef, ReactNode } from "react";

interface CustomDatePickerProps {
  placeholder: string;
  value?: string;
  onClick?: () => void;
  className?: string;
  endIcon?: ReactNode;
}

// Use forwardRef to properly pass ref from DatePicker
const CustomDatePicker = forwardRef<HTMLInputElement, CustomDatePickerProps>(
  ({ placeholder, value, onClick, className, endIcon }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full flex-1 items-center rounded-lg border border-gray-400 px-3 text-xs outline-none placeholder:text-xs focus:outline-none md:h-12 md:text-sm md:placeholder:text-sm",
            {
              "pr-10": endIcon,
            },
            className,
          )}
          placeholder={!value ? placeholder : ""}
          value={value || ""}
          onClick={onClick}
          readOnly
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {endIcon}
          </div>
        )}
      </div>
    );
  },
);

CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;

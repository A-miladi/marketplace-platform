import { ITextAreaProps } from "@/types";
import { cn } from "@/utils";

export function TextArea({
  error,
  helperText,
  label,
  name,
  className,
  labelClassName,
  dir = "ltr",
  ...rest
}: ITextAreaProps) {
  return (
    <div className="flex h-full w-full flex-col">
      {label && (
        <label
          className={cn("mb-1 pr-1 text-sm text-black", labelClassName)}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="flex items-center justify-start">
        <textarea
          id={name}
          name={name}
          className={cn(
            "border-sm w-full rounded-lg border-gray-400 px-2 py-[6px] text-xs outline-none focus:border-2 focus:border-primary-700 disabled:bg-gray-100",
            {
              "border-2 focus:border-red-500": error,
              "placeholder:text-right": dir === "rtl",
              "placeholder:text-left": dir === "ltr",
            },
            className,
          )}
          {...rest}
        />
      </div>
      {helperText && (
        <span
          className={cn("text-primary mt-1 text-xs", { "text-red-500": error })}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}

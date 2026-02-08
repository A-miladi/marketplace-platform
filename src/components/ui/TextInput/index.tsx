"use client";

import { Eye, EyeSlash } from "@/components/icons";
import { IInputProps } from "@/types";
import { cn } from "@/utils";
import { useState } from "react";

function TextInput({
  error,
  parent,
  helperText,
  label,
  disabled,
  icon,
  className,
  labelClassName,
  dir = "ltr",
  type = "text",
  prefix,
  ...rest
}: IInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className={cn("flex flex-col gap-1", parent)}>
      {label && (
        <label
          className={`mb-1 pr-1 text-left font-medium text-black ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center justify-start bg-transparent">
        {prefix && (
          <div className="absolute left-2 mt-0.5 text-sm text-neutral-400">
            {prefix}
          </div>
        )}
        {icon && <div className="absolute right-3 overflow-hidden">{icon}</div>}
        <input
          disabled={disabled}
          type={isPassword && showPassword ? "text" : type}
          className={cn(
            "h-10 w-full rounded-lg bg-neutral-50 px-2 text-xs placeholder:text-neutral-400 read-only:cursor-default read-only:bg-white focus:border-2 focus:border-primary-700 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-neutral-100 md:min-h-12 md:px-4 md:py-3.5",
            {
              "pr-6": icon,
              "px-5": prefix,
              "border-red-500 outline-red-500 focus:border-2 focus:border-red-500":
                error,
              "pr-8 placeholder:text-right": dir === "rtl",
              "placeholder:text-left": dir === "ltr",
              "pr-10": isPassword,
            },
            className,
          )}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 flex items-center justify-center bg-transparent text-neutral-500 hover:text-neutral-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </button>
        )}
      </div>
      {helperText && (
        <span
          className={cn("pl-1 pt-0.5 text-xs text-primary-500", {
            "text-xs text-red-500": error,
          })}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}

export default TextInput;

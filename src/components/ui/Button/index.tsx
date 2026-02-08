import { ButtonProps } from "@/types";
import { cn } from "@/utils";
import React from "react";
import { Spinner } from "../Spinner";

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  color = "secondary",
  variant = "contained",
  size = "sm",
  loading = false,
  disabled,
  startIcon,
  endIcon,
  ...rest
}: ButtonProps) => {
  const styleMap: {
    [key in "primary" | "secondary"]: {
      [key in "contained" | "outlined"]: string;
    };
  } = {
    primary: {
      contained: "bg-primary-800 text-white font-medium",
      outlined: "border-primary-800  border-2 text-primary-800 font-medium",
    },
    secondary: {
      contained: "bg-secondary-500 text-white",
      outlined: "border-secondary border text-secondary",
    },
  };

  const sizeMap: {
    [key in "sm" | "lg"]: string;
  } = {
    sm: "text-sm px-2 rounded-lg h-8",
    lg: "text-base px-4  font-medium h-10 rounded-lg",
  };

  type ButtonColor = keyof typeof styleMap;
  type ButtonSize = keyof typeof sizeMap;

  const buttonStyle =
    styleMap[color as ButtonColor][variant as "contained" | "outlined"];
  const buttonSize = sizeMap[size as ButtonSize];

  return (
    <button
      className={cn(
        `${buttonStyle} ${buttonSize} cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-400`,
        className,
      )}
      {...rest}
      disabled={loading || disabled}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-1.5">
          <Spinner color="white" size="small" />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          {startIcon && <div className="flex items-center">{startIcon}</div>}
          {children}
          {endIcon && <div className="flex items-center">{endIcon}</div>}
        </div>
      )}
    </button>
  );
};

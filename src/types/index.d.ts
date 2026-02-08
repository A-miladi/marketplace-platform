import { ButtonHTMLAttributes, ComponentPropsWithRef, ReactNode } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
  size?: "sm" | "lg";
  loading?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

interface IDropDown {
  label: ReactNode | string;
  icon?: ReactNode;
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

interface ISideBar {
  label: ReactNode | string;
  icon?: ReactNode;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
}

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

interface IInputProps extends ComponentPropsWithRef<"input"> {
  error?: boolean;
  helperText?: string;
  label?: string;
  parent?: string;
  icon?: ReactNode;
  prefix?: string;
  labelClassName?: string;
}

export interface ITextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
  label?: string;
  labelClassName?: string;
  dir?: "ltr" | "rtl";
}

export interface ResponseType<T> {
  data: T;
  status: number;
  message: string;
}

export type Meta = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
};

export interface ResponseWithPaginationType<T> {
  data: T;
  status: number;
  message: string;
  meta: Meta;
}

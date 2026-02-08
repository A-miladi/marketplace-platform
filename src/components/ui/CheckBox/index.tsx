import React, { ReactNode } from 'react';

interface CheckboxProps {
  label?: string;
  checked: boolean | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled,
  className,
  icon,
}) => {
  return (
    <div
    className={`flex items-center justify-between rounded-lg py-1 gap-2 ${className}`}
  >
    <label className="relative flex items-center cursor-pointer">
      {/* Input Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`rounded-md disabled:border-steel-400 disabled:bg-steel-400 relative h-5 w-5 cursor-pointer appearance-none rounded-xs border border-neutral-100 bg-white checked:border-0 checked:bg-primary-600 focus:outline-none focus:ring-offset-0`}
      />
      
      {/* Optional Icon */}
      {icon && (
        <div className="absolute transform px-0.5 z-10">
          {icon}
        </div>
      )}
    </label>

    {/* Label Text */}
    <p className="text-xs text-neutral-100">{label}</p>
  </div>
  );
};

export default Checkbox;

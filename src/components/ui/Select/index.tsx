import { ArrowDown, Search } from "@/components/icons";
import { useOutSideClick } from "@/hooks";
import { cn } from "@/utils";
import { useRef, useState } from "react";
import MultiSelect from "../MultiSelect";
import TextInput from "../TextInput";

interface SelectProps {
  options: { value: string; label: string }[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  className?: string;
  optionStyle?: string;
  isSearch?: boolean;
  multiSelect?: boolean;
  error?: boolean;
  helperText?: string;
  btnClassName?: string;
}

const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  optionStyle,
  isSearch,
  multiSelect,
  error,
  helperText,
  btnClassName,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef(null);

  useOutSideClick(ref, () => {
    setIsOpen(false);
  });

  // If multiSelect is true, render the MultiSelect component
  if (multiSelect) {
    return (
      <MultiSelect
        options={options}
        value={Array.isArray(value) ? value : []}
        onChange={(newValue) => onChange(newValue)}
        placeholder={placeholder}
        className={className}
        optionStyle={optionStyle}
        isSearch={isSearch}
        error={error}
        helperText={helperText}
        btnClassName={btnClassName}
      />
    );
  }

  // Single select logic
  const selectedValue = typeof value === "string" ? value : "";
  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || "";

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg border px-3 md:h-12",
          "border-neutral-400 transition-colors duration-200",
          "focus:border-0 focus:outline-none focus:ring-2 focus:ring-primary-700",
          {
            "border-2 border-red-500": error,
            "text-neutral-500": !selectedLabel,
          },
          btnClassName,
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate text-sm">{selectedLabel || placeholder}</span>
        <ArrowDown
          className={cn(
            "shrink-0 transform transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0",
          )}
          size={18}
          color="currentColor"
        />
      </button>

      <ul
        ref={ref}
        className={cn(
          "absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg transition-all duration-200",
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
        )}
        role="listbox"
      >
        {isSearch && (
          <div className="border-b px-3">
            <TextInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white md:px-2 md:py-0"
              placeholder="Search"
              icon={<Search color="currentColor" size={16} />}
            />
          </div>
        )}

        <div className="max-h-48 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionClick(option.value);
              }}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 px-4 py-2 text-sm transition-colors",
                "hover:bg-neutral-50",
                selectedValue === option.value
                  ? "text-primary-700"
                  : "text-neutral-800",
                optionStyle,
              )}
              role="option"
              aria-selected={selectedValue === option.value}
            >
              {option.label}
            </li>
          ))}
        </div>
      </ul>

      {error && helperText && (
        <p className="mt-1 text-xs text-red-500">{helperText}</p>
      )}
    </div>
  );
};

export default Select;

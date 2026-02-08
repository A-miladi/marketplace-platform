import { ArrowDown, Check, Search } from "@/components/icons";
import { useOutSideClick } from "@/hooks";
import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import TextInput from "../TextInput";

interface MultiSelectProps {
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  optionStyle?: string;
  isSearch?: boolean;
  error?: boolean;
  helperText?: string;
  btnClassName?: string;
}

const MultiSelect = ({
  options,
  value = [],
  onChange,
  placeholder = "Select...",
  className,
  optionStyle,
  isSearch,
  error,
  helperText,
  btnClassName,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  const ref = useRef(null);

  // Initialize tempSelected when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTempSelected(value);
    }
  }, [isOpen, value]);

  useOutSideClick(ref, () => {
    setIsOpen(false);
  });

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOptionClick = (optionValue: string) => {
    const isSelected = tempSelected.includes(optionValue);
    const newSelected = isSelected
      ? tempSelected.filter((v) => v !== optionValue)
      : [...tempSelected, optionValue];
    setTempSelected(newSelected);
  };

  const handleConfirm = () => {
    onChange(tempSelected);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleCancel = () => {
    setTempSelected(value);
    setIsOpen(false);
    setSearchQuery("");
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label);

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
            "text-neutral-500": !selectedLabels.length,
          },
          btnClassName,
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate text-sm">
          {selectedLabels.length > 0
            ? selectedLabels.length > 2
              ? `${selectedLabels.slice(0, 2).join(", ")} +${
                  selectedLabels.length - 2
                }`
              : selectedLabels.join(", ")
            : placeholder}
        </span>
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
                tempSelected.includes(option.value)
                  ? "text-primary-700"
                  : "text-neutral-800",
                optionStyle,
              )}
              role="option"
              aria-selected={tempSelected.includes(option.value)}
            >
              {option.label}
              <div
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded border border-neutral-100",
                  {
                    "bg-primary-700": tempSelected.includes(option.value),
                  },
                )}
              >
                {tempSelected.includes(option.value) && (
                  <Check size={12} color="white" />
                )}
              </div>
            </li>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 border-t px-5 py-2">
          <Button
            size="sm"
            color="primary"
            variant="contained"
            className="w-full"
            type="button"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button
            size="sm"
            type="button"
            className="w-full"
            variant="outlined"
            color="primary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </ul>

      {error && helperText && (
        <p className="mt-1 text-xs text-red-500">{helperText}</p>
      )}
    </div>
  );
};

export default MultiSelect;

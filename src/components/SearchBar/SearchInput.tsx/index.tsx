import { CloseSquare } from "@/components/icons";
import TextInput from "@/components/ui/TextInput";
import { KeyboardEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  className?: string;
  onSearch?: () => void;
}
const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder,
  className = "",
  onSearch,
}: SearchInputProps) => (
  <div className="relative">
    <TextInput
      className={`h-8 md:h-12 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onSearch) {
          e.preventDefault();
          onSearch();
        }
      }}
    />
    {value && (
      <button
        onClick={onClear}
        className="absolute right-2 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80"
        aria-label="Clear search"
      >
        <CloseSquare size={16} color="#0C0C0C" />
      </button>
    )}
  </div>
);

export default SearchInput;

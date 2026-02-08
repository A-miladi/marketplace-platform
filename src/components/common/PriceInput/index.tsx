import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import { CURRENCY_OPTIONS } from "@/constants";
import { AdvertisementFormData } from "@/types/advertisement";
import { addCommas } from "@/utils/addCommas";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";

interface PriceInputProps {
  currency: "USD" | "EURO";
  setCurrency: (value: "USD" | "EURO") => void;
  formattedPrice: string;
  setFormattedPrice: (value: string) => void;
  setValue: UseFormSetValue<AdvertisementFormData>;
  trigger?: UseFormTrigger<AdvertisementFormData>;
  errors?: {
    price?: {
      message?: string;
    };
  };
}

export const PriceInput = ({
  currency,
  setCurrency,
  formattedPrice,
  setFormattedPrice,
  setValue,
  trigger,
  errors,
}: PriceInputProps) => {
  return (
    <div className="flex flex-col pt-4 lg:pt-6">
      <p className="mb-3 text-sm font-normal lg:mb-4 lg:text-base lg:font-medium">
        Price
      </p>

      <div className="flex items-center">
        <Select
          options={CURRENCY_OPTIONS}
          value={currency}
          onChange={(value) => setCurrency(value as "USD" | "EURO")}
          placeholder="Currency"
          className="w-1/5 text-sm focus:scale-0 focus:outline-none"
          btnClassName="border-r-0 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400 rounded-r-none"
        />

        <div className="w-4/5">
          <TextInput
            type="text"
            placeholder="Enter the price of your device"
            value={formattedPrice}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              const formattedValue = addCommas(numericValue);
              setFormattedPrice(formattedValue);
              const rawValue = formattedValue.replace(/,/g, "");
              if (rawValue === "" || !isNaN(Number(rawValue))) {
                setValue("price", Number(rawValue) || 0);
                // Trigger validation after setting the value
                if (trigger) {
                  trigger("price");
                }
              }
            }}
            error={!!errors?.price}
            className="rounded-l-none border border-neutral-400 bg-white text-sm font-normal placeholder:pl-2"
            labelClassName="mb-3 lg:mb-4 font-normal text-sm lg:font-medium lg:text-base"
            prefix={currency === "USD" ? "$ " : "€ "}
          />
        </div>
      </div>
      {errors?.price && (
        <p className="mt-1 text-xs text-red-500">{errors?.price?.message}</p>
      )}
    </div>
  );
};

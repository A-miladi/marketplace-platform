import TextInput from "@/components/ui/TextInput";
import { IFilters } from "@/types/general";
import { addCommas } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface PriceFilterProps {
  watch: UseFormWatch<IFilters>;
  setValue: UseFormSetValue<IFilters>;
}

const PriceFilter = ({ setValue, watch }: PriceFilterProps) => {
  const [formattedMinPrice, setFormattedMinPrice] = useState<string>("");
  const [formattedMaxPrice, setFormattedMaxPrice] = useState<string>("");
  const searchParams = useSearchParams();

  const priceMin = watch("price_min");
  const priceMax = watch("price_max");

  // Set initial values from URL on mount
  useEffect(() => {
    const minPrice = searchParams.get("price_min");
    const maxPrice = searchParams.get("price_max");

    if (minPrice) {
      setValue("price_min", Number(minPrice));
      setFormattedMinPrice(addCommas(minPrice));
    }
    if (maxPrice) {
      setValue("price_max", Number(maxPrice));
      setFormattedMaxPrice(addCommas(maxPrice));
    }
  }, [searchParams, setValue]);

  // Sync the local state with form value for minimum price
  useEffect(() => {
    if (priceMin === null || priceMin === undefined || priceMin === 0) {
      setFormattedMinPrice("");
    } else {
      setFormattedMinPrice(addCommas(String(priceMin)));
    }
  }, [priceMin]);

  // Sync the local state with form value for maximum price
  useEffect(() => {
    if (priceMax === null || priceMax === undefined || priceMax === 0) {
      setFormattedMaxPrice("");
    } else {
      setFormattedMaxPrice(addCommas(String(priceMax)));
    }
  }, [priceMax]);

  return (
    <div className="flex w-full flex-col gap-6">
      <TextInput
        type="text"
        className="h-10 border bg-white md:h-12"
        placeholder="Min Price"
        value={formattedMinPrice}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/[^0-9]/g, "");
          const formattedValue = addCommas(numericValue);
          setFormattedMinPrice(formattedValue);
          const rawValue = formattedValue.replace(/,/g, "");
          setValue("price_min", Number(rawValue));
        }}
      />
      <TextInput
        type="text"
        placeholder="Max Price"
        className="h-10 border bg-white md:h-12"
        value={formattedMaxPrice}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/[^0-9]/g, "");
          const formattedValue = addCommas(numericValue);
          setFormattedMaxPrice(formattedValue);
          const rawValue = formattedValue.replace(/,/g, "");
          setValue("price_max", Number(rawValue));
        }}
      />
    </div>
  );
};

export default PriceFilter;

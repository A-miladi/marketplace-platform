import CustomeDatePicker from "@/components/ui/CustomDatePicker";
import { IFilters } from "@/types/general";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface DateFilterProps {
  watch: UseFormWatch<IFilters>;
  setValue: UseFormSetValue<IFilters>;
}

const DateFilter = ({ setValue, watch }: DateFilterProps) => {
  const searchParams = useSearchParams();

  // Set initial values from URL on mount
  useEffect(() => {
    const dateFrom = searchParams.get("date_from");
    const dateTo = searchParams.get("date_to");

    if (dateFrom) {
      setValue("date_from", new Date(dateFrom));
    }
    if (dateTo) {
      setValue("date_to", new Date(dateTo));
    }
  }, [searchParams, setValue]);

  return (
    <div className="flex items-center gap-4">
      <DatePicker
        selected={watch("date_from")}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => setValue("date_from", date)}
        placeholderText="From Date"
        customInput={<CustomeDatePicker placeholder="From Date" />}
        popperPlacement="bottom-end"
      />
      <DatePicker
        selected={watch("date_to")}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => setValue("date_to", date)}
        placeholderText="To Date"
        customInput={<CustomeDatePicker placeholder="To Date" />}
      />
    </div>
  );
};

export default DateFilter;

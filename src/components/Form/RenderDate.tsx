import { Calendar } from "@/components/icons";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { PropsInput } from "@/types/Forms";
import { cn } from "@/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useController } from "react-hook-form";

const RenderDate = ({ input }: PropsInput) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: input.name,
    control: input.control,
    rules: {
      required: input.is_required ? `${input.label} is required` : false,
      ...input.rules,
    },
    defaultValue: input.defaultValue ?? null,
  });

  return (
    <div className="relative w-full">
      <DatePicker
        selected={field.value ? new Date(field.value) : null}
        wrapperClassName="w-full"
        dateFormat="yyyy-MM-dd"
        onChange={(date) => {
          if (date) {
            const formattedDate = date.toISOString().split("T")[0];
            field.onChange(formattedDate);
          } else {
            field.onChange(null);
          }
        }}
        placeholderText={input.placeholder || ""}
        customInput={
          <CustomDatePicker
            className={cn(
              "w-full text-sm placeholder:text-sm placeholder:font-normal placeholder:text-neutral-400",
              {
                "border-2 border-red-500": error,
              },
            )}
            placeholder={input.placeholder || ""}
            endIcon={<Calendar size={24} color="#6D6D6D" />}
          />
        }
        popperPlacement="bottom-end"
        showYearDropdown
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        minDate={
          input.validation?.min_date
            ? new Date(input.validation.min_date)
            : undefined
        }
        maxDate={
          input.validation?.max_date
            ? new Date(input.validation.max_date)
            : undefined
        }
      />
    </div>
  );
};

export default RenderDate;

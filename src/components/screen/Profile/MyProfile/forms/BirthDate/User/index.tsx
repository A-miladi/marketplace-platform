import { Calendar } from "@/components/icons";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { UpdateProfileRequest } from "@/types/user";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import DatePicker from "react-datepicker";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface BirthDateProps {
  watch: UseFormWatch<UpdateProfileRequest>;
  setValue: UseFormSetValue<UpdateProfileRequest>;
  error?: boolean;
  helperText?: string;
}

const UserBirthDate = ({
  setValue,
  watch,
  error,
  helperText,
}: BirthDateProps) => {
  const t = useTranslations("UserProfile.MyProfile.BirthDate");

  return (
    <div className="w-full">
      <p className="mb-1 text-sm font-medium text-neutral-900">Birth Date</p>
      <DatePicker
        selected={watch("birth_date") ? new Date(watch("birth_date")) : null}
        wrapperClassName="w-full"
        dateFormat="yyyy-MM-dd"
        onChange={(date) => {
          if (date) {
            const formattedDate = date.toISOString().split("T")[0];
            setValue("birth_date", formattedDate, {
              shouldValidate: true,
              shouldDirty: true,
            });
          } else {
            setValue("birth_date", "", {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        }}
        placeholderText={t("Placeholder")}
        customInput={
          <CustomDatePicker
            className={cn(
              "w-full text-sm placeholder:text-sm placeholder:font-normal placeholder:text-neutral-400",
              {
                "border-2 border-red-500": error,
              },
            )}
            placeholder={t("Label")}
            endIcon={<Calendar size={24} color="#6D6D6D" />}
          />
        }
        popperPlacement="bottom-end"
        withPortal
        showYearDropdown
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        maxDate={new Date()}
        minDate={new Date(1900, 0, 1)}
      />
      {helperText && (
        <p className={cn("mt-1 text-xs", { "text-red-500": error })}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default UserBirthDate;

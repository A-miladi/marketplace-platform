import { Calendar } from "@/components/icons";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { UpdateCompanyRequest } from "@/types/user";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import DatePicker from "react-datepicker";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface PurchaseScheduleProps {
  watch: UseFormWatch<UpdateCompanyRequest>;
  setValue: UseFormSetValue<UpdateCompanyRequest>;
  error?: boolean;
  helperText?: string;
}

const PurchaseSchedule = ({
  setValue,
  watch,
  error,
  helperText,
}: PurchaseScheduleProps) => {
  const t = useTranslations("UserProfile.MyProfile.CompanyForm");

  return (
    <div className="w-full">
      <p className="mb-1 text-sm font-medium text-neutral-900">
        {t("PurchaseSchedule")}
      </p>
      <DatePicker
        selected={
          watch("extra_data.purchase_schedule")
            ? new Date(watch("extra_data.purchase_schedule"))
            : null
        }
        wrapperClassName="w-full"
        dateFormat="yyyy-MM-dd"
        onChange={(date) => {
          if (date) {
            const formattedDate = date.toISOString().split("T")[0];
            setValue("extra_data.purchase_schedule", formattedDate, {
              shouldValidate: true,
              shouldDirty: true,
            });
          } else {
            setValue("extra_data.purchase_schedule", "", {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        }}
        placeholderText={t("PurchaseSchedule")}
        customInput={
          <CustomDatePicker
            className={cn(
              "w-full text-sm placeholder:text-sm placeholder:font-normal placeholder:text-neutral-400",
              {
                "border-2 border-red-500": error,
              },
            )}
            placeholder={t("PurchaseSchedule")}
            endIcon={<Calendar size={24} color="#6D6D6D" />}
          />
        }
        popperPlacement="bottom-end"
        withPortal
        showYearDropdown
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        minDate={new Date()}
      />
      {helperText && (
        <p className={cn("mt-1 text-xs", { "text-red-500": error })}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default PurchaseSchedule;

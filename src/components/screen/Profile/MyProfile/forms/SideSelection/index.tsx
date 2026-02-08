import { UpdateCompanyRequest } from "@/types/user";
import { useTranslations } from "next-intl";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface SideSelectionProps {
  register: UseFormRegister<UpdateCompanyRequest>;
  errors: FieldErrors<UpdateCompanyRequest>;
  defaultSide?: "BUYER" | "SELLER" | "BOTH";
}

const SideSelection = ({
  register,
  errors,
  defaultSide,
}: SideSelectionProps) => {
  const t = useTranslations("UserProfile.MyProfile.CompanyForm");

  return (
    <div className="flex items-center gap-4">
      <label className="text-sm text-neutral-900">{t("Side")}:</label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            {...register("side")}
            value="BUYER"
            defaultChecked={defaultSide === "BUYER"}
            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-xs text-neutral-900">{t("Buyer")}</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            {...register("side")}
            value="SELLER"
            defaultChecked={defaultSide === "SELLER"}
            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-xs text-neutral-900">{t("Seller")}</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            {...register("side")}
            value="BOTH"
            defaultChecked={!defaultSide || defaultSide === "BOTH"}
            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-xs text-neutral-900">{t("Both")}</span>
        </label>
      </div>
      {errors.side && (
        <p className="text-sm text-red-500">{errors.side.message}</p>
      )}
    </div>
  );
};

export default SideSelection;

import Toggle from "@/components/ui/Toggle";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "use-intl";

interface ToggleFormProps {
  showPhone: boolean;
  setShowPhone: Dispatch<SetStateAction<boolean>>;
}

function ToggleForm({ showPhone, setShowPhone }: ToggleFormProps) {
  const t = useTranslations("SellOnUniq.ToggleForm");

  const handleToggleChange = () => {
    setShowPhone(!showPhone);
  };

  return (
    <div className="flex w-full gap-8 border-b border-neutral-100 py-8">
      <h4 className="text-base font-medium text-neutral-950">{t("title")}</h4>
      <Toggle onChange={handleToggleChange} checked={showPhone} />
    </div>
  );
}

export default ToggleForm;

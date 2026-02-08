"use client";
import { Role } from "@/types/user";
import React, { useState } from "react";
import { useTranslations } from "use-intl";

interface UserTypeProps {
  onSelect: (type: Role) => void;
}

function UserType({ onSelect }: UserTypeProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const t = useTranslations("SellOnUniq.UserType");
  const mockUserType: { type: Role }[] = [
    { type: "USER" as Role },
    { type: "COMPANY" as Role },
  ];

  const handleSelect = (idx: number, type: Role) => {
    setSelectedIndex(idx);
    onSelect(type);
  };

  return (
    <div className="flex h-8 w-full items-center justify-between gap-8 border-neutral-100">
      <h4 className="text-base font-medium text-neutral-950">{t("title")}</h4>
      <div className="flex h-full gap-4">
        {mockUserType.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleSelect(idx, item.type)}
            className={`flex h-full cursor-pointer items-center rounded-[40px] border-2 border-neutral-200 bg-neutral-50 px-4 ${selectedIndex === idx && "border-primary-700 bg-primary-100 text-primary-700"}`}
          >
            <p>{item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserType;

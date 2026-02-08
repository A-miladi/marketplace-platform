"use client";
import { Button, TextArea } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import React from "react";
import { useTranslations } from "use-intl";

function Support() {
  const t = useTranslations("UserProfile.Support");
  return (
    <div className="flex w-full flex-col">
      <h4 className="border-b-2 pb-2 font-normal text-neutral-950 lg:text-xl">
        {t("ContactSupport")}
      </h4>

      <p className="mt-3 lg:mt-6 text-[10px] font-normal text-neutral-700 md:text-base">
        {t("description")}
      </p>

      <div className="mt-10 flex flex-col gap-8">
        <TextInput
          placeholder={t("SubjectPlaceholder")}
          label={t("Subject")}
          labelClassName="font-normal text-sm"
          className="mt-3  border border-neutral-400 bg-white lg:mt-4"
        />

        <TextArea
          placeholder={t("YourMessagePlaceholder")}
          label={t("YourMessage")}
          className="mt-3 h-[208px] border border-neutral-400 bg-white px-3 py-4 lg:mt-4"
        />
      </div>

      <div className="mt-10 flex w-full justify-end">
        <Button className="h-12 w-full bg-primary-800 px-[62px] font-medium lg:w-auto">
          {t("SendButton")}
        </Button>
      </div>
    </div>
  );
}

export default Support;

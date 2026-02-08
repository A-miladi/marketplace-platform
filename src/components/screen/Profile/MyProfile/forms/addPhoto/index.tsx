import { CloseSquare, Gallery } from "@/components/icons";
import { AddImage } from "@/components/icons/AddImage";
import Image from "next/image";
import React, { useRef } from "react";
import { useTranslations } from "use-intl";

interface AddPhotoProps {
  selectedImage: string | null;
  onSelectImage: (file: File | null) => void;
}

function AddPhoto({ selectedImage, onSelectImage }: AddPhotoProps) {
  const t = useTranslations("UserProfile.MyProfile");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSelectImage(file);
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onSelectImage(null);
  };

  return (
    <div className="flex flex-wrap items-center ">
      <div
        onClick={handleClick}
        className="relative flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-primary-700 text-primary-700 lg:h-[88px] lg:w-[88px]"
      >
        {selectedImage ? (
          <>
            <Image
              alt="selected"
              src={selectedImage}
              width={88}
              height={88}
              className="h-full w-full rounded-full object-cover"
            />
            <button
              onClick={(e) => handleRemove(e)}
              className="absolute right-1 top-0 rounded-md bg-white p-0.5 text-xs text-white shadow-md"
            >
              <CloseSquare color="#ef5e5e" size={16} />
            </button>
          </>
        ) : (
          <>
            <AddImage color="currentColor" size={24} className="lg:hidden" />
            <Gallery
              color="currentColor"
              size={16}
              className="hidden lg:flex"
            />
            <p className="mt-2 hidden text-xs font-normal lg:flex">
              {t("Add")}
            </p>
            <p className="hidden text-xs font-normal lg:flex">{t("Photo")}</p>
          </>
        )}
      </div>
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default AddPhoto;

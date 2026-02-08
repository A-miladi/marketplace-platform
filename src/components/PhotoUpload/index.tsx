"use client";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Add } from "../icons/Add";
import { useTranslations } from "use-intl";
import { Gallery } from "../icons";
import Image from "next/image";
import { AddImage } from "../icons/AddImage";
import toast from "react-hot-toast";

interface PhotoUploadProps {
  onImagesChange: (files: File[]) => void;
  imagePreviews: string[];
  setImagePreviews: Dispatch<SetStateAction<string[]>>;
}

function PhotoUpload({
  onImagesChange,
  imagePreviews,
  setImagePreviews,
}: PhotoUploadProps) {
  const t = useTranslations("SellOnUniq.selectPhoto");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [invalidIndexes, setInvalidIndexes] = useState<number[]>([]);

  const MAX_IMAGES = 7;
  const MAX_SIZE_MB = 1;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const validFiles: File[] = [];
      const invalidFileIndexes: number[] = [];

      newFiles.forEach((file, index) => {
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          toast.error(`File ${file.name} exceeds 1MB limit.`);
          invalidFileIndexes.push(selectedFiles.length + index);
        } else {
          validFiles.push(file);
        }
      });

      if (selectedFiles.length + validFiles.length > MAX_IMAGES) {
        toast.error(`You can upload a maximum of ${MAX_IMAGES} images.`);
        return;
      }

      const updatedFiles = [...selectedFiles, ...validFiles];
      const fileUrls = [
        ...imagePreviews,
        ...validFiles.map((file) => URL.createObjectURL(file)),
      ];

      setSelectedFiles(updatedFiles);
      setImagePreviews(fileUrls);
      setInvalidIndexes(invalidFileIndexes);

      onImagesChange(updatedFiles);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, idx) => idx !== index);
    const updatedPreviews = imagePreviews.filter((_, idx) => idx !== index);
    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    setInvalidIndexes(invalidIndexes.filter((i) => i !== index));
    onImagesChange(updatedFiles);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex w-full flex-col border-b border-neutral-100 pb-6 lg:pb-8">
      <div className="flex w-full flex-row-reverse justify-end gap-3 lg:flex-col">
        <div className="flex flex-col gap-[9px] lg:gap-3">
          <h2 className="text-xl font-medium text-neutral-950 lg:text-2xl lg:font-bold">
            {t("title")}
          </h2>
          <p className="hidden text-sm font-medium text-neutral-500 lg:flex">
            {t("description")}
          </p>
          <p className="text-xs font-normal text-neutral-500">
            {t("addPhotosForAd")}
          </p>
        </div>

        <div className="flex flex-wrap items-center lg:mt-6 lg:w-full lg:gap-8">
          <div
            onClick={handleClick}
            className="flex h-16 w-16 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary-700 text-primary-700 lg:h-[132px] lg:w-[132px] lg:rounded-2xl"
          >
            <Add size={32} color="currentColor" className="hidden lg:flex" />
            <div className="hidden items-center justify-center gap-1 lg:flex">
              <Gallery color="currentColor" size={16} />
              <p className="text-xs font-medium">{t("addPhoto")}</p>
            </div>
            <AddImage size={24} color="currentColor" className="lg:hidden" />
          </div>

          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
          />

          {imagePreviews.length > 0 ? (
            imagePreviews.map((preview, idx) => (
              <div
                key={idx}
                className="relative hidden h-[132px] w-[132px] cursor-pointer items-center justify-center rounded-2xl border lg:flex"
              >
                <Image
                  alt={`preview-${idx}`}
                  src={preview}
                  width={132}
                  height={132}
                  className="h-full w-full rounded-2xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute right-1.5 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black bg-opacity-50 text-xs font-bold text-white"
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-5">
              <div className="hidden h-[132px] w-[132px] items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 text-neutral-200 lg:flex">
                <Gallery size={32} color="currentColor" />
              </div>
              <div className="hidden h-[132px] w-[132px] items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 text-neutral-200 lg:flex">
                <Gallery size={32} color="currentColor" />
              </div>
              <div className="hidden h-[132px] w-[132px] items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 text-neutral-200 lg:flex">
                <Gallery size={32} color="currentColor" />
              </div>
            </div>
          )}
        </div>
      </div>

      {imagePreviews.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-5 lg:hidden">
          {imagePreviews.map((preview, idx) => (
            <div
              key={idx}
              className="relative flex h-[110px] w-[110px] cursor-pointer items-center justify-center rounded-2xl border lg:hidden"
            >
              <Image
                alt="preview"
                src={preview}
                width={800}
                height={800}
                className="h-full rounded-2xl object-cover"
              />

              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute right-1.5 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black bg-opacity-50 text-xs font-bold text-white"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PhotoUpload;

"use client";
import { CloseSquare } from "@/components/icons";
import { AverageEmoji } from "@/components/icons/AverageEmoji";
import { ExcellentEmoji } from "@/components/icons/ExcellentEmoji";
import { GoodEmoji } from "@/components/icons/GoodEmoji";
import { PoorEmoji } from "@/components/icons/PoorEmoji";
import { TerribleEmoji } from "@/components/icons/TerribleEmoji";
import { Tick } from "@/components/icons/Tick";
import { Button, TextArea } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { usePost } from "@/hooks";
import { ResponseType } from "@/types";
import { AddCommentRequest } from "@/types/user";
import { useTranslations } from "next-intl";
import { FC, FormEvent, useState } from "react";
import toast from "react-hot-toast";

const rateByEmoji = [
  {
    title: "Excellent",
    emoji: <ExcellentEmoji size={32} className="w-6 lg:w-8" />,
    rate: 5,
  },
  {
    title: "Good",
    emoji: <GoodEmoji size={32} className="w-6 lg:w-8" />,
    rate: 4,
  },
  {
    title: "Average",
    emoji: <AverageEmoji size={32} className="w-6 lg:w-8" />,
    rate: 3,
  },
  {
    title: "Poor",
    emoji: <PoorEmoji size={32} className="w-6 lg:w-8" />,
    rate: 2,
  },
  {
    title: "Terrible",
    emoji: <TerribleEmoji size={32} className="w-6 lg:w-8" />,
    rate: 1,
  },
];
interface IModalProps {
  onClose: () => void;
  userId: number | string;
  refetch: () => void;
}

const AddCommentModal: FC<IModalProps> = ({ onClose, userId, refetch }) => {
  const [isActiveEmoji, setIsActiveEmoji] = useState<number>(3);
  const [comment, setComment] = useState("");
  const t = useTranslations("SellerProfile.SellerAddCommaModal");

  const { execute, loading } = usePost<ResponseType<object>, AddCommentRequest>(
    API_URL.User.Comment.comment,
    {
      onSuccess: (res) => {
        toast.success(res.message);
        onClose();
        refetch();
      },

      onError: (err) => {
        toast.error(err);
      },
    },
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    execute({
      rating: isActiveEmoji,
      text: comment,
      user_id: Number(userId),
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex w-[90%] flex-col items-center rounded-xl bg-white p-4 shadow-custom_shadow lg:w-[580px] lg:p-8"
    >
      <div className="flex w-full items-center justify-between border-b pb-[14px] lg:pb-6">
        <p className="text-sm font-medium text-neutral-950 lg:text-base">
          {t("title")}
        </p>

        <Button onClick={onClose} className="bg-transparent">
          <CloseSquare color="#000" size={24} className="w-5 lg:w-6" />
        </Button>
      </div>

      <p className="mt-3 text-center lg:mt-6">{t("description")}</p>

      <div className="mt-4 flex w-full items-center justify-between lg:mt-8">
        {rateByEmoji
          .slice()
          .reverse()
          .map((item, idx) => (
            <div
              onClick={() => setIsActiveEmoji(item.rate)}
              key={idx}
              className={`relative flex h-[68px] w-[56px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 lg:h-[80px] lg:w-[80px] ${isActiveEmoji === item.rate && "border-white bg-primary-100 outline outline-2 outline-primary-600"}`}
            >
              {item.emoji}
              <p className="text-[10px] font-medium lg:text-sm lg:font-normal">
                {item.title}
              </p>

              {isActiveEmoji === item.rate && (
                <div className="absolute -right-2 -top-2 rounded-full border border-white bg-primary-700 p-0.5">
                  <Tick color="#fff" size={16} />
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="mt-5 flex w-full flex-col gap-2 lg:mt-8 lg:gap-4">
        <p className="text-base font-medium text-neutral-900">
          {t("WriteYourReview")}
        </p>

        <TextArea
          onChange={(e) => setComment(e.target.value)}
          className="h-[200px] border border-neutral-400"
          placeholder={t("TextAreaPlaceHolder")}
        />
      </div>

      <Button
        loading={loading}
        disabled={!isActiveEmoji || comment.length < 3}
        className="mt-6 h-12 w-full bg-primary-800 lg:mt-10"
      >
        {t("SubmitButton")}
      </Button>
    </form>
  );
};

export default AddCommentModal;

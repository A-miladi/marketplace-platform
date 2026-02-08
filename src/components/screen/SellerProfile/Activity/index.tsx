"use client";
import { Button } from "@/components/ui";
import UserFeedCard from "@/components/UserFeedCard";
import { IUserFeed } from "@/types/user";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "use-intl";
import SellerAds from "./SellerAds";

type SellerTab = "USER_COMMENTS" | "USER_ADVERTISEMENT";

interface ActivityProps {
  userId: number | string;
  comments: IUserFeed[];
  onChangePage: () => void;
  loadingComments: boolean;
  page: number;
  lastPage: number;
}

function Activity({
  userId,
  comments,
  onChangePage,
  loadingComments,
  page,
  lastPage,
}: ActivityProps) {
  const t = useTranslations("SellerProfile");
  const [activeTab, setActiveTab] = useState<SellerTab>("USER_COMMENTS");

  console.log({ page });

  console.log({ lastPage });

  return (
    <div className="mb-32 flex w-full flex-col gap-6 lg:mb-0">
      <div className="flex w-full gap-8 border-b-2 border-neutral-100 bg-transparent lg:gap-12">
        <Button
          onClick={() => setActiveTab("USER_COMMENTS")}
          className={`rounded-none bg-transparent ${
            activeTab === "USER_COMMENTS"
              ? "border-b border-primary-700 text-primary-700"
              : "text-neutral-950"
          }`}
        >
          {t("UserComments")}
        </Button>

        <Button
          onClick={() => setActiveTab("USER_ADVERTISEMENT")}
          className={`rounded-none bg-transparent ${
            activeTab === "USER_ADVERTISEMENT"
              ? "border-b border-primary-700 text-primary-700"
              : "text-neutral-950"
          }`}
        >
          {t("UserAdvertisement")}
        </Button>
      </div>

      {activeTab === "USER_COMMENTS" ? (
        comments.length > 0 ? (
          <div className="flex w-full flex-col gap-5">
            {comments?.map((item, index) => (
              <UserFeedCard key={`${item.id}-${index}`} data={item} />
            ))}
            {comments.length > 0 && (
              <Button
                disabled={page === lastPage}
                onClick={onChangePage}
                loading={loadingComments}
                color="primary"
                variant="contained"
                className="w-full rounded-lg md:h-12 h-10"
              >
                {page === lastPage ? "No More Comments" : "Load More"}
              </Button>
            )}
          </div>
        ) : (
          <div className="mt-20 flex h-full flex-1 flex-col items-center justify-center gap-5">
            <Image
              src="/assets/image/comment.png"
              alt="no-comments"
              width={100}
              height={100}
            />
            <p className="text-sm font-medium text-neutral-500">
              There is no comments yet!
            </p>
          </div>
        )
      ) : (
        <SellerAds userId={userId} />
      )}
    </div>
  );
}

export default Activity;

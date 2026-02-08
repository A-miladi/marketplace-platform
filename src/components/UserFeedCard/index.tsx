import Rating from "@/components/Rating";
import { IUserFeed } from "@/types/user";
import dayjs from "dayjs";
import Image from "next/image";
import { FC } from "react";
import { Profile } from "../icons";

const UserFeedCard: FC<{ data: IUserFeed }> = ({ data }) => {
  const userAvatar = data?.commented_user?.avatar;
  return (
    <div className="w-full border-b-2 pb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {userAvatar ? (
            <div className="flex h-6 w-6 items-center justify-center rounded-full border text-neutral-400">
              <Image
                alt=""
                width={800}
                height={800}
                src={userAvatar as string}
                className="h-6 w-6 rounded-full"
              />
            </div>
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full border text-neutral-400">
              <Profile color="currentColor" size={16} />
            </div>
          )}

          <p className="text-sm font-medium text-neutral-900">
            {data?.commented_user.full_name}
          </p>
        </div>
        {data.rating && <Rating rating={data?.rating} />}
      </div>
      <div className="mb-4 mt-3 w-full">
        <p className="text-sm font-normal text-neutral-300">
          {dayjs(data.created_at).format("YYYY/MM/DD")}
        </p>
      </div>
      <div>
        <p className="font-normal text-neutral-600">{data?.text}</p>
      </div>
    </div>
  );
};

export default UserFeedCard;

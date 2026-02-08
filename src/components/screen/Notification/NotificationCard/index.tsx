import { UserOctagon } from "@/components/icons";
import { PageUrls } from "@/constants";
import { INotification } from "@/types/notification";
import { cn } from "@/utils";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NotificationCardProps {
  detail: INotification;
  onReadNotification: (id: number | null) => void;
}

const NotificationCard = ({
  detail,
  onReadNotification,
}: NotificationCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (!detail.read) {
      onReadNotification(Number(detail.id));
    }

    if (detail.type === "MESSAGE") {
      router.push(
        `${PageUrls.Message.message}`,
      );
    } else if (detail.type === "AD" && detail.extra_data.ad_id) {
      router.push(
        `${PageUrls.Advertisement.advertisement}/${detail.extra_data.ad_id}`,
      );
    }
  };

  const isRejection =
    detail.type === "AD" && detail.extra_data.status === "REJECTED";

  return (
    <div
      className={cn("flex w-full p-2 flex-col gap-4 transition-all duration-200", {
        "hover:bg-neutral-50": detail.read,
        "cursor-pointer": detail.type === "AD" || detail.type === "MESSAGE",
      })}
      onClick={handleClick}
    >
      <div className="flex w-full flex-col gap-2 md:gap-3">
        <div className="flex items-center gap-2">
          {detail.extra_data?.user?.avatar && detail.type === "MESSAGE" ? (
            <Image
              src={detail.extra_data.user.avatar}
              alt="avatar"
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <UserOctagon />
          )}
          <p className="text-sm font-medium text-neutral-900 md:text-base md:font-bold">
            {detail.type == "MESSAGE"
              ? `${detail.extra_data.user.first_name} ${detail.extra_data.user.last_name}`
              : "Uniq Alpha"}
          </p>
        </div>

        <p className="text-sm text-neutral-400 md:text-xs">
          {dayjs(detail.created_at).format("YYYY/MM/DD")}
        </p>

        <div className="w-full">
          <p className="line-clamp-4 w-full text-xs leading-6 text-neutral-600 md:text-sm">
            {detail.message}
          </p>
          {isRejection && (
            <div className="mt-2 rounded-md bg-red-50 p-2">
              <p className="text-xs text-red-600">
                Rejection Message: {detail.extra_data.rejection_msg}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;

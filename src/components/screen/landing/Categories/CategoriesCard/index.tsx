import { PageUrls } from "@/constants";
import { Link } from "@/i18n/routing";
import Image from "next/image";

interface CategoriesCardProps {
  label: string;
  id: string | number;
  image: string;
}

const CategoriesCard = ({ label, id, image }: CategoriesCardProps) => {
  return (
    <Link
      href={`${PageUrls.Advertisement.advertisement}?category_ids=${id}`}
      className="relative flex h-[121px] flex-col items-center px-2 pb-2 md:h-[224px]"
    >
      <div className="relative z-20 h-full w-full px-2">
        <Image
          src={image ? image : "/assets/image/cartImage.png"}
          fill
          className="w-full rounded-xl"
          alt="uniq-alpha-category"
        />

        <div className="absolute bottom-0 left-0 z-10 flex h-full w-full items-end justify-center rounded-xl bg-gradient-to-t from-neutral-950 to-transparent pb-4">
          <p className="truncate px-2 text-xs font-medium text-white md:text-base">
            {label}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 h-[49px] w-full rounded-b-2xl rounded-t-lg bg-primary-700 md:h-[98px]"></div>
    </Link>
  );
};

export default CategoriesCard;

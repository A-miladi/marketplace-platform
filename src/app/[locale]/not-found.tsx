// app/not-found.tsx

import { ArrowDown } from "@/components/icons";
import { Link } from "@/i18n/routing";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"));

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white px-[73px] lg:px-0">
      <div className="flex w-full flex-col items-center justify-center">
        <Image
          alt="not found"
          width={800}
          height={800}
          src={"/assets/image/notFound.png"}
          className="h-[122px] w-[180px] lg:h-[210px] lg:w-[312px]"
        />
        <p className="mb-6 mt-5 text-center text-base font-medium text-neutral-300 lg:mb-12 lg:mt-10 lg:text-2xl lg:font-semibold">
          Unfortunately, the page you requested does not exist
        </p>
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 text-sm font-normal text-primary-700 lg:text-base lg:font-medium"
        >
          <ArrowDown color="currentColor" className="rotate-90" size={16} />
          Return to home page
        </Link>
      </div>
    </div>
  );
}

"use client";

import { PageUrls, USER_TOKEN } from "@/constants";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "@/i18n/routing";
import { Spinner } from "@/components/ui";

const Image = dynamic(() => import("next/image"));

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const token = Cookies.get(USER_TOKEN);

  useEffect(() => {
    if (token) {
      router.push(PageUrls.Home.home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="hidden w-4/6 bg-primary-400 lg:flex">
        <Suspense fallback={<Spinner />}>
          <Image
            priority={true}
            src="/assets/image/login.png"
            alt="login"
            width={800}
            height={800}
            className="h-full w-full object-cover"
          />
        </Suspense>
      </div>
      <div className="flex h-full w-full items-center justify-start px-4 lg:w-2/6 lg:px-5 lg:pt-0 xl:px-[56px]">
        {children}
      </div>
    </div>
  );
}

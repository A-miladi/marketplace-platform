"use client ";

import { Button } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { useRouter } from "@/i18n/routing";
import { ResponseType } from "@/types";
import { Role } from "@/types/user";
import { useState } from "react";
import UserType from "../../sellOnUniqAlpha/forms/UserType";

const AuthWithGoogle = () => {
  const [userType, setUserType] = useState<Role>("USER");

  const router = useRouter();
  const { refetch, loading } = useFetch<ResponseType<string>>(
    `${`${API_URL.Authentication.Sso}?role=${userType}`}`,
    {
      autoFetch: false, // We will call refetch manually when needed
      onSuccess: (res) => {
        router.push(res.data);
      },
    },
  );

  const handleSignUpWithGoogle = () => {
    refetch();
  };

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <p className="font-medium text-neutral-950 md:font-bold">
        Please select your account type
      </p>

      <UserType onSelect={setUserType} />

      <Button
        loading={loading}
        onClick={handleSignUpWithGoogle}
        color="primary"
        className="mt-1 h-10 w-full md:mt-2 md:h-12"
        variant="contained"
      >
        Confirm Selection
      </Button>
    </div>
  );
};

export default AuthWithGoogle;

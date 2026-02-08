import { USER_INFO } from "@/constants/Cookies";
import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialUserInfo: User = {
  id: 0,
  email: "",
  role: "USER",
  phone_number: null,
  profile: {
    first_name: "",
    last_name: "",
    full_name: "",
    avatar: null,
    birth_date: "",
    is_verified: false,
    address: "",
    zip_code: "",
    city: {
      id: 0,
      name: "",
      state: {
        id: 0,
        name: "",
      },
      country: {
        id: 0,
        name: "",
        code: "",
      },
    },
    city_id: "",
    status: "PENDING",
    email_verified_at: "",
    phone_verified_at: null,
    phone_number: null,
  },
  created_at: "",
  updated_at: "",
  rate: null,
};

interface UserInfoState {
  userInfo: User;
  setUserInfo: (userInfo: User) => void;
}

export const useUserInfoStore = create<UserInfoState>()(
  persist(
    (set) => ({
      userInfo: initialUserInfo,
      setUserInfo: (userInfo) => {
        if (userInfo.role === "COMPANY") {
          const companyUser = {
            ...userInfo,
            profile: {
              ...userInfo.profile,
              role: userInfo.profile.role || "",
              company_name: userInfo.profile.company_name || "",
              side: userInfo.profile.side || "BOTH",
              is_email_subscribed:
                userInfo.profile.is_email_subscribed || false,
            },
          };
          set({ userInfo: companyUser });
        } else {
          set({ userInfo });
        }
      },
    }),
    {
      name: USER_INFO,
    },
  ),
);

import { IProfileContentProps } from "@/types/profile";
import DeleteAccount from "../DeleteAccount";
import MyAds from "../MyAds";
import MyFavoriteAd from "../MyFavoriteAd";
import MyProfile from "../MyProfile";
import ResetPass from "../ResetPass";
import Support from "../Support";

function ProfileContent({ content }: IProfileContentProps) {
  const obj = {
    MY_PROFILE: <MyProfile />,
    MY_ADS: <MyAds />,
    MY_FAVORITE_ADS: <MyFavoriteAd />,
    SUPPORT: <Support />,
    RESET_PASS: <ResetPass />,
    DELETE_ACCOUNT: <DeleteAccount />,
    LOG_OUT: <h1>LOG_OUT</h1>,
  };

  const CurrentContent = obj[content];
  return (
    <div className="h-full w-full rounded-2xl pt-6 lg:flex lg:w-[55%] lg:px-6 lg:pt-0">
      {CurrentContent}
    </div>
  );
}

export default ProfileContent;

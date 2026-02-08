import { Roles } from "@/constants";
import { useUserInfoStore } from "@/store/useUserInfo";
import CompanyForm from "./forms/CompanyForm";
import UserForm from "./forms/UserForm";

const MyProfile = () => {
  const { userInfo: userData } = useUserInfoStore();

  return (
    <div>
      {userData.role === Roles.COMPANY ? <CompanyForm /> : <UserForm />}
    </div>
  );
};

export default MyProfile;

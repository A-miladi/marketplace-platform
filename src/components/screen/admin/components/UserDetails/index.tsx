import { Button } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { IUserInfo } from "@/types/admin";
import { FC, useReducer } from "react";

interface UserDetailsProps {
  userInfo: IUserInfo | null;
  refetch?: () => void;
  onClose: () => void;
}
interface signupEvent {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const UserDetails: FC<UserDetailsProps> = ({ userInfo }) => {
  const [event, updateEvent] = useReducer(
    (prev: signupEvent, next: signupEvent) => {
      return { ...prev, ...next };
    },
    {
      firstName: userInfo?.firstName || "",
      lastName: userInfo?.lastName || "",
      phone: userInfo?.phone || "",
      email: userInfo?.email || "",
    },
  );

  //   const { loading: putLoading, execute: putExecute } = usePut<IUserInfo, IPutUsersPayload>(
  //     `${API_URL.User.Users}/${userInfo?.id}`,
  //     {
  //       onSuccess: () => {
  //         onClose();
  //         refetch();
  //       },
  //       onError: (error) => {
  //         toast.error(error);
  //       },
  //     }
  //   );

  //   const { loading: deleteLoading, execute: deleteExecute } = useDelete(
  //     `${API_URL.User.Users}/${userInfo?.id}`,
  //     {
  //       onSuccess: () => {
  //         onClose();
  //         refetch();
  //       },
  //       onError: (error) => {
  //         toast.error(error);
  //       },
  //     }
  //   );

  //   const submitHandler = () => {
  //     putExecute({
  //       firstName: event.firstName,
  //       lastName: event?.lastName,
  //       phone: event?.phone,
  //       email: event?.email,
  //     });
  //   };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-xl bg-primary-50 p-7 shadow-xl">
      <div className="flex items-center gap-5">
        <TextInput
          onChange={(e) => updateEvent({ ...event, firstName: e.target.value })}
          labelClassName=" text-neutral-100"
          value={event?.firstName}
          label="firstName"
          parent="w-3/4"
          className="h-10 w-full border border-neutral-200 bg-neutral-600 text-neutral-100"
        />
        <TextInput
          onChange={(e) => updateEvent({ ...event, lastName: e.target.value })}
          labelClassName=" text-neutral-100"
          value={event?.lastName}
          label="lastName "
          parent="w-3/4"
          className="h-10 w-full border border-neutral-200 bg-neutral-600 text-neutral-100"
        />
      </div>

      <div className="flex items-center gap-5">
        <TextInput
          onChange={(e) => updateEvent({ ...event, phone: e.target.value })}
          labelClassName=" text-neutral-100"
          value={event?.phone}
          label=" phone"
          parent="w-3/4"
          className="h-10 w-full border border-neutral-200 bg-neutral-600 text-neutral-100"
        />

        <TextInput
          onChange={(e) => updateEvent({ ...event, email: e.target.value })}
          labelClassName=" text-neutral-100"
          value={event?.email}
          label="email"
          parent="w-3/4"
          className="h-10 w-full border border-neutral-200 bg-neutral-600 text-neutral-100"
        />
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        <Button
          //   loading={putLoading}
          //   onClick={submitHandler}
          className="cursor-pointer border border-neutral-200 px-4 py-2 text-primary-500"
        >
          ویرایش
        </Button>
        <Button
          //   loading={deleteLoading}
          //   onClick={deleteExecute}
          className="cursor-pointer border border-neutral-200 px-4 py-2 text-red-300"
        >
          حذف کاربر
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;

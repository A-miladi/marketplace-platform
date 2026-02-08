import Modal from "@/components/Modal";
import { PageUrls } from "@/constants";
import Link from "next/link";
import { useState } from "react";

const BlockModal = () => {
  const [open] = useState(true);

  return (
    <div>
      <Modal
        isOpen={open}
        onClose={() => {}}
        className="flex h-screen items-center justify-center"
      >
        <div className="flex min-h-[149px] w-full flex-col gap-6 rounded-2xl border bg-white px-3 py-4 md:min-h-[188px] md:w-[462px] md:gap-8 md:px-5 md:py-6">
          <div className="flex flex-col gap-3">
            <p className="text-center font-medium text-primary-700 md:text-xl md:font-bold">
              {`Your Account is Blocked`}
            </p>

            <p className="text-center text-sm text-neutral-500 md:text-base md:font-medium">
              {`To continue, please contact uniq alpha support.`}
            </p>
          </div>

          <Link
            href={PageUrls.Profile.profile}
            className="flex h-10 items-center justify-center rounded-lg bg-primary-800 text-sm font-normal text-white md:h-12 md:text-base md:font-medium"
          >
            Back To Profile
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default BlockModal;

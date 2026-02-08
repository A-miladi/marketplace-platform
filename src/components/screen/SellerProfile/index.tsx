"use client";
import Modal from "@/components/Modal";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { usePagination } from "@/hooks/usePagination";
import { ResponseWithPaginationType } from "@/types";
import { IUserFeed } from "@/types/user";
import { useEffect, useState } from "react";
import Activity from "./Activity";
import AddCommentForSeller from "./AddCommentForSeller";
import AddCommentModal from "./AddCommentModal";
import SellerInformation from "./SellerInformation";

const PER_PAGE = 3;

function SellerProfile({ id }: { id: string }) {
  const [showModal, setIsShowModal] = useState(false);
  const onCloseModal = () => setIsShowModal(false);

  const {
    data: comments,
    loading: loadingComments,
    total: commentsCount,
    loadMore,
    setData: setCommentsData,
    setLoading: setLoadingComments,
    page,
    reset: resetPagination,
    lastPage,
  } = usePagination<IUserFeed>({ perPage: PER_PAGE });

  const {
    data: userComments,
    loading: fetchingComments,
    refetch: refetchComments,
  } = useFetch<ResponseWithPaginationType<IUserFeed[]>>(
    `${API_URL.User.User}/${id}/comment?page=${page}&per_page=${PER_PAGE}`,
  );

  useEffect(() => {
    if (userComments) {
      setCommentsData(userComments);
    }
  }, [userComments, setCommentsData]);

  useEffect(() => {
    setLoadingComments(fetchingComments);
  }, [fetchingComments, setLoadingComments]);

  const handleCommentAdded = () => {
    // Reset pagination to first page
    resetPagination();
    // Refetch comments
    refetchComments();
  };

  return (
    <div className="relative m-auto mt-[44px] flex w-full max-w-[1224px] flex-col items-center gap-6 px-5 lg:mt-[104px] lg:flex-row lg:items-start lg:gap-7 xl:gap-12 xl:px-0">
      <div className="flex h-full w-full flex-col gap-10 lg:sticky lg:top-10 lg:w-[45%]">
        <SellerInformation commentsCount={commentsCount} id={id} />
        <div className="hidden w-full lg:flex">
          <AddCommentForSeller
            showModal={() => setIsShowModal(true)}
            sellerId={id}
          />
        </div>
      </div>
      <div className="relative w-full lg:w-[55%]">
        <Activity
          onChangePage={loadMore}
          comments={comments}
          lastPage={lastPage}
          loadingComments={loadingComments}
          page={page}
          userId={id}
        />
        <div className="fixed bottom-20 left-0 w-full p-4 lg:hidden">
          <AddCommentForSeller
            showModal={() => setIsShowModal(true)}
            sellerId={id}
          />
        </div>
      </div>

      <Modal
        className="flex items-center justify-center"
        onClose={onCloseModal}
        isOpen={showModal}
      >
        <AddCommentModal
          refetch={handleCommentAdded}
          userId={id}
          onClose={() => setIsShowModal(false)}
        />
      </Modal>
    </div>
  );
}

export default SellerProfile;

import AdminSingleCategoryPage from "@/components/screen/admin/categories/singleCategoryPage/page";

const SingleCategoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  return (
    <AdminSingleCategoryPage
      params={{
        id,
      }}
    />
  );
};

export default SingleCategoryPage;

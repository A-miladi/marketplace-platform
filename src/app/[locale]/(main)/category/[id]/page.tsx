import CategoriesAdvertisement from "@/components/screen/category";

const CategoryAdvertisementWithPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  return <CategoriesAdvertisement id={id} />;
};

export default CategoryAdvertisementWithPage;

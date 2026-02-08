import EditAdvertisement from "@/components/screen/sellOnUniqAlpha/EditAdvertisement";

const EditAdvertisementPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {

  const id = (await params).id;

  return <EditAdvertisement id={id} />;
};

export default EditAdvertisementPage;

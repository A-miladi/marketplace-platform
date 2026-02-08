import SellerProfile from "@/components/screen/SellerProfile";

interface SellerProfilePage {
  params: Promise<{ id: string }>;
}

async function SellerProfilePage({ params }: SellerProfilePage) {
  const id = (await params).id;

  return <SellerProfile id={id} />;
}

export default SellerProfilePage;

import SingleAd from "@/components/screen/advertisement/SingleAd";

async function SingleAdPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return <SingleAd id={id} />;
}

export default SingleAdPage;

import Image from "next/image";

const NoAdsMessage = () => (
  <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-5 md:gap-10">
    <Image
      src={"/assets/image/ad-block.png"}
      width={188}
      height={188}
      alt="No ads"
    />
    <p className="max-w-52 text-center font-medium text-neutral-300 md:max-w-full md:text-2xl md:font-bold">
      No ads are available on this page at the moment.
    </p>
  </div>
);

export default NoAdsMessage;

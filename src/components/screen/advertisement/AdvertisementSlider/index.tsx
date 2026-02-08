import { ArrowDown, Gallery } from "@/components/icons";
import { cn } from "@/utils";
import { useRef } from "react";

import dynamic from "next/dynamic";
import Slider from "react-slick";
const Image = dynamic(() => import("next/image"));

interface AdvertisementSliderProps {
  images: string[];
}

const AdvertisementSlider = ({ images }: AdvertisementSliderProps) => {
  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    arrows: false, // Hide the arrows
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,

          customPaging: function () {
            return <div className="dot"></div>;
          },
          dotsClass: "slick-dots slick-thumb",
        },
      },
    ],
  };

  // Create a reference for the Slider instance
  const sliderRef = useRef<Slider>(null);

  // Methods to navigate the slider
  const next = () => {
    sliderRef.current?.slickNext(); // Use optional chaining
  };

  const previous = () => {
    sliderRef.current?.slickPrev(); // Use optional chaining
  };

  return (
    <div className="slider-container relative h-full max-h-[480px] w-full bg-slate-100 md:mt-5">
      <Slider ref={sliderRef} {...settings}>
        {images.map((item, idx) => (
          <div key={idx} className={cn("relative overflow-hidden")}>
            <div className="absolute h-full w-full bg-gradient-to-b from-[#05224093] md:bg-gradient-to-t lg:mx-2" />
            <Image
              priority={true}
              src={item}
              width={408}
              height={408}
              className="max-h-[480px] w-full md:h-full lg:mx-2"
              alt="uniq-alpha"
            />
          </div>
        ))}
      </Slider>

      <div className="absolute bottom-0 left-0 hidden w-[99.5%] items-end justify-between to-transparent px-6 pb-5 md:flex">
        <div className="flex h-[38px] w-[70px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-700/70 to-primary-700 text-white">
          <Gallery size={20} color="currentColor" />
          <p>{images.length}</p>
        </div>

        {images.length > 3 && (
          <div className="flex items-center gap-5">
            <button
              onClick={previous}
              className="flex h-12 w-12 items-center justify-center rounded-[14px] border bg-white text-neutral-950"
            >
              <ArrowDown className="rotate-90" size={24} color="currentColor" />
            </button>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-[14px] border bg-white text-neutral-950"
            >
              <ArrowDown
                className="rotate-[270deg]"
                size={24}
                color="currentColor"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisementSlider;

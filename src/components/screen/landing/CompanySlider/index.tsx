"use client";

import { cn } from "@/utils";
import Image from "next/image";
import Slider from "react-slick";

// const COMPANY_SLIDES = [
//   {
//     src: "/assets/image/company-1.png",
//   },
//   {
//     src: "/assets/image/company-2.png",
//   },
//   {
//     src: "/assets/image/company-1.png",
//   },
//   {
//     src: "/assets/image/company-2.png",
//   },
// ];

const CompanySlider = () => {
  const settings = {
    // dots: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: false, // Hide the arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
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
          slidesToShow: 2.2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="relative mt-8 h-52 md:mt-28">
      <div className="absolute right-0 top-0 -z-10 hidden h-[167px] w-full -rotate-2 overflow-x-hidden bg-secondary-200 md:block"></div>

      <div className="z-20 flex h-[167px] w-full items-center justify-center bg-secondary-50">
        <div className="slider-container w-full px-4 md:max-w-[1224px] xl:px-0">
          <Slider {...settings}>
            <div className={cn("pr-2 pt-2 md:pr-6 md:pt-0", {})}>
              <Image
                src={"/assets/image/company-2.png"}
                width={218}
                height={79}
                className="object-cover"
                alt="uniq-alpha"
              />
            </div>

            <div className={cn("pr-2 md:pr-6", {})}>
              <Image
                src={"/assets/image/company-1.png"}
                width={155}
                height={87}
                className="object-cover"
                alt="uniq-alpha"
              />
            </div>

            <div className={cn("pr-2 pt-2 md:pr-6 md:pt-0", {})}>
              <Image
                src={"/assets/image/company-2.png"}
                width={217}
                height={79}
                className="object-cover"
                alt="uniq-alpha"
              />
            </div>

            <div className={cn("pr-2 md:pr-6", {})}>
              <Image
                src={"/assets/image/company-1.png"}
                width={155}
                height={87}
                className="object-cover"
                alt="uniq-alpha"
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CompanySlider;

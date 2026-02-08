"use client";

import { ArrowDown } from "@/components/icons";
import { CategoriesCardSkeleton } from "@/components/Skeletons";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { ResponseType } from "@/types";
import { ICategory } from "@/types/category";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import Slider from "react-slick";
import CategoriesCard from "./CategoriesCard";

const Categories = () => {
  const settings = {
    // dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
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

  const t = useTranslations("Categories");

  // Create a reference for the Slider instance
  const sliderRef = useRef<Slider>(null);

  // Methods to navigate the slider
  const next = () => {
    sliderRef.current?.slickNext(); // Use optional chaining
  };

  const previous = () => {
    sliderRef.current?.slickPrev(); // Use optional chaining
  };

  const { data, loading } = useFetch<ResponseType<ICategory[]>>(
    `${API_URL.Public.category}?page=1&per_page=100`,
  );

  return (
    <div className="relative mt-14 flex min-h-[150px] flex-col items-center gap-5 bg-secondary-50 pt-4 md:min-h-[259px] md:gap-12 md:pt-8 lg:mt-[148px]">
      <div className="relative flex w-full items-center justify-center gap-2">
        <hr className="absolute w-[92%] rounded-sm border-2 border-primary-700 bg-primary-700 md:w-[62%]" />
        <h2 className="relative z-10 bg-secondary-50 px-2 text-xl font-medium text-neutral-950">
          {t("Categories")}
        </h2>
      </div>

      <div className="absolute left-[8%] top-5 z-20 hidden items-center gap-5 bg-secondary-50 md:flex">
        <button
          onClick={previous}
          className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-white text-neutral-950"
        >
          <ArrowDown className="rotate-90" size={24} color="currentColor" />
        </button>
        <button
          onClick={next}
          className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-white text-neutral-950"
        >
          <ArrowDown
            className="rotate-[270deg]"
            size={24}
            color="currentColor"
          />
        </button>
      </div>

      <div className="absolute -bottom-9 flex w-full justify-center md:-bottom-20">
        <div className="slider-container w-full px-4 md:max-w-[1224px] xl:px-0">
          <Slider ref={sliderRef} {...settings}>
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="pr-2 md:pr-6">
                    <CategoriesCardSkeleton />
                  </div>
                ))
              : data?.data.map((item) => (
                  <div key={item.id} className="pr-2 md:pr-6">
                    <CategoriesCard
                      image={item.image ?? ""}
                      id={item.id}
                      label={item.name}
                    />
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Categories;

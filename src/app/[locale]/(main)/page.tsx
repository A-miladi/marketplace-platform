import { SearchBar } from "@/components/SearchBar";
import Categories from "@/components/screen/landing/Categories";
import Questions from "@/components/screen/landing/Questions";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("@/components/screen/landing/Hero"));
const AboutUs = dynamic(() => import("@/components/screen/landing/AboutUs"));
const Explore = dynamic(() => import("@/components/screen/landing/Explore"));

const Advertisement = dynamic(
  () => import("@/components/screen/landing/Advertisement"),
);

const CompanySlider = dynamic(
  () => import("@/components/screen/landing/CompanySlider"),
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="relative hidden h-8 w-full justify-center bg-primary-50 px-5 md:flex md:h-14">
        <SearchBar />
      </div>
      <Categories />
      <Advertisement />
      <CompanySlider />
      <AboutUs />
      <Explore />
      <Questions />
    </>
  );
}

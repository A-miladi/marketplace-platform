import Accordion from "@/components/ui/Accordion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MOCK_ACCORDION_DATA = [
  {
    id: 1,
    title: "this is a sample header",
    content:
      "this is a sample answer for something that I don't know anything about",
  },
  {
    id: 2,
    title: "this is a sample header 2",
    content:
      "this is a sample answer 2 for something that I don't know anything about",
  },
  {
    id: 3,
    title: "this is a sample header 3",
    content:
      "this is a sample answer 3 for something that I don't know anything about",
  },
  {
    id: 4,
    title: "this is a sample header 4",
    content:
      "this is a sample answer 4 for something that I don't know anything about",
  },
];

const Questions = () => {
  const t = useTranslations("HomePage");

  return (
    <div className=" lg:mb-0 mb-8">
      <div className="relative mt-8 flex w-full items-center justify-center gap-2 md:mt-[108px]">
        <hr className="absolute w-[92%] rounded-sm border-2 border-primary-700 bg-primary-700 md:w-[62%]" />
        <h2 className="relative z-10 bg-white px-2 text-xl font-medium text-neutral-950">
          {t("FrequentlyAskedQuestions")}
        </h2>
      </div>
      <div className="mt-5 flex items-center justify-center md:mt-14">
        <div className="relative flex w-full max-w-[814px] flex-col gap-4 px-8 md:gap-6">
          <Image
            src={"/assets/image/Subtract-blue.png"}
            width={200}
            height={325}
            className="absolute -top-8 right-0 hidden md:block"
            alt="faq-uniq-alpha"
          />

          <Image
            src={"/assets/image/Subtract-brown.png"}
            width={200}
            height={325}
            className="absolute -bottom-0 -left-8 hidden rotate-90 md:block"
            alt="faq-uniq-alpha"
          />

          {MOCK_ACCORDION_DATA.map((item) => (
            <Accordion
              key={item.id}
              className="rounded-lg border border-neutral-400 px-3 py-2 md:px-5 md:py-4"
              label={item.title}
            >
              <div className="">{item.content}</div>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;

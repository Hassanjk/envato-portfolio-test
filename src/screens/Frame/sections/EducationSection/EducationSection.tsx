import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

// Education data for mapping
const educationItems = [
  {
    id: 1,
    period: "2019-2020",
    title: "UX/UI Designer",
    description:
      "We make our customers ' products valuable in the eyes of customers. To do this, we analyze and study people, build long-term strategies for interacting with them, develop creative",
    image: "/image-10.png",
  },
  {
    id: 2,
    period: "2019-2020",
    title: "Graphic Designer",
    description:
      "Rule bearing whales. Created gathering blessed, sixth likeness male. Over were which you'll so be make moveth made saw above.",
    image: "/image-12.png",
  },
  {
    id: 3,
    period: "2019-2020",
    title: "Marketing Manager",
    description:
      "Firmament itself rule their evening, which moved very night so great them cattle bearing and gathered forth had whose bearing.",
    image: "/image-13.png",
  },
];

// Navigation items
const navItems = ["HOME", "PAGES", "BLOG", "CONTACT", "PORTFOLIO"];

export const EducationSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-16 bg-background text-[#fde3a7]">
      {/* Left vertical line decoration */}
      <img
        className="absolute w-[18px] h-[119px] top-[494px] left-[37px]"
        alt="Frame"
        src="/frame-119-1.svg"
      />

      {/* Right vertical line decoration */}
      <div className="absolute w-[3px] h-[541px] top-[284px] right-[90px] bg-[#fde3a7]">
        <div className="h-[149px] bg-[#9c4a37]" />
      </div>

      {/* Copyright text */}
      <div className="absolute w-[109px] bottom-[30px] right-[90px] font-normal text-[#fde3a7] text-base leading-[22.4px]">
        © Centrix&nbsp;&nbsp;2021.
      </div>

      {/* Arrow icon */}
      <div className="absolute bottom-[0px] left-[38px]">
        <ArrowLeftIcon className="w-[38px] h-[37px] text-[#fde3a7]" />
      </div>

      {/* Top navigation */}
      <div className="relative w-full h-[26px] mb-16">
        <div className="absolute left-[37px] font-normal text-[#fde3a7] text-[25px] leading-[25px]">
          SB.
        </div>

        <nav className="absolute left-[315px]">
          <ul className="flex space-x-[40px]">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="font-medium text-[#fde3a7] text-[15px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute right-[90px] font-medium text-[#fde3a7] text-xl leading-[18px]">
          +2 325 452 32 35
        </div>
      </div>

      {/* Main content */}
      <div className="relative w-full max-w-[1290px] mx-auto">
        {/* Section label */}
        <div className="font-medium text-[#9c4a37] text-[15px] tracking-[1.12px] leading-[19.5px]">
          MY SKILL
        </div>

        {/* Section header with title and button */}
        <div className="flex justify-between items-center mt-5 mb-16">
          <h2 className="font-normal text-[#fde3a7] text-6xl leading-[60px]">
            Education
          </h2>

          <Button className="bg-[#9c4a37] text-[#fde3a7] rounded-none px-[34px] py-[13px] h-auto">
            <span className="text-xs tracking-[0.60px] leading-3 uppercase">
              DOWNLOAD RESUME
            </span>
          </Button>
        </div>

        {/* Education items */}
        <Card className="bg-transparent border-none">
          <CardContent className="p-0">
            {educationItems.map((item, index) => (
              <div key={item.id} className="relative">
                {index === 0 && (
                  <Separator className="w-full h-px bg-[#fde3a7]" />
                )}

                <div className="py-10 flex items-start">
                  <div className="w-[60px] h-[60px] flex-shrink-0">
                    <img
                      src={item.image}
                      alt={`${item.title} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="ml-[50px] text-[28px] leading-7">
                    {item.period}
                  </div>

                  <div className="ml-[280px] text-[28px] leading-7">
                    {item.title}
                  </div>

                  <div className="ml-auto w-[410px] text-[15px] leading-[19.5px]">
                    {item.description}
                  </div>
                </div>

                <Separator className="w-full h-px bg-[#fde3a7]" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation dots */}
        <div className="flex justify-center mt-16">
          <img
            className="w-[120px] h-[41px]"
            alt="Pagination navigation"
            src="/prev-newx.png"
          />
        </div>
      </div>
    </section>
  );
};

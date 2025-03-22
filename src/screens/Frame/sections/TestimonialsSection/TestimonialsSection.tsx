import React from "react";

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-[#C4C4C4] py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex gap-[110px]">
          <div className="flex-1">
            <span className="text-[#9C4A37] text-[15px] tracking-[1.12px] uppercase">
              TESTIMONIALS
            </span>

            <h2 className="mt-[29px] text-[#FDE3A7] text-[60px] leading-[60px] max-w-[770px]">
              Creative & dedicated is things that gilber studio brings for your business
            </h2>

            <div className="mt-[209px] grid grid-cols-5 gap-8">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={`https://images.unsplash.com/photo-${i + 1}?auto=format&fit=crop&q=80`}
                  alt={`Company logo ${i + 1}`}
                  className="h-16 object-contain opacity-50"
                />
              ))}
            </div>
          </div>

          <div className="max-w-[410px]">
            <p className="text-[#FDE3A7] text-[15px] leading-[19.5px]">
              We make our customers' products valuable in the eyes of customers. 
              To do this, we analyze and study people, build long-term strategies 
              for interacting with them, develop creative ideas our customers' 
              products valuable in the eyes of
            </p>

            <h3 className="mt-11 text-[#FDE3A7] text-[25px] leading-[32.5px]">
              Dwight Schrute
            </h3>

            <p className="mt-2.5 text-[#9C4A37] text-[15px] leading-[19.5px]">
              CREATIVE MARKET INC.
            </p>

            <div className="mt-7">
              <img
                src="/prev-newx-1.png"
                alt="Navigation"
                className="w-[120px] h-[41px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
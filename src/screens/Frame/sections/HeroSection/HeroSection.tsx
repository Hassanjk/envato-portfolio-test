import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = (): JSX.Element => {
  const skillsData = [
    { name: "WORDPRESS", percentage: 80 },
    { name: "PHOTOSHOP", percentage: 70 },
    { name: "MARKETING", percentage: 76 },
  ];

  const [percentages, setPercentages] = useState(skillsData.map(() => 0));
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
          onEnter: () => {
            setPercentages(skillsData.map(skill => skill.percentage));
          },
          onLeaveBack: () => {
            setPercentages(skillsData.map(() => 0));
          }
        }
      });

      // Animate all progress bars simultaneously
      progressRefs.current.forEach((ref, index) => {
        if (!ref) return;

        tl.fromTo(
          ref.querySelector('.progress-bar-fill'),
          {
            width: "0%",
            opacity: 0,
            scale: 0.8,
          },
          {
            width: `${skillsData[index].percentage}%`,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "<" // Start all animations at the same time
        );
      });
    });

    animationRef.current = ctx;
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0E0E0E] text-[#FDE3A7] py-20"
    >
      <div className="max-w-[1440px] mx-auto px-8 flex justify-between">
        {/* Left side - Image with dot pattern */}
        <div className="relative w-[630px]">
          <div className="absolute w-[375px] h-[375px] top-0 left-0 grid grid-cols-[repeat(25,1fr)] grid-rows-[repeat(25,1fr)]">
            {Array(625).fill(0).map((_, i) => (
              <div key={i} className="relative">
                <div className="absolute w-[7px] h-[7px] bg-[#FDE3A7]/0" />
              </div>
            ))}
          </div>

          <div className="relative w-[539px] h-[674px] mt-[42px] ml-[91px]">
            <img 
              src="/assets/img/bg.jpg" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side - Experience section */}
        <div className="w-[440px]">
          <span className="text-[#9C4A37] text-[15px] tracking-[1.12px] uppercase">
            ABOUT US
          </span>

          <h2 className="text-[60px] leading-[60px] mt-7">
            My Experience
          </h2>

          <p className="mt-[42px] w-[330px] text-[15px] leading-[19.5px]">
            We make our customers' products valuable in the eyes of customers. 
            To do this, we analyze and study people, build long-term strategies 
            for interacting with them, develop creative ideas
          </p>

          <div className="mt-[142px] space-y-[52px]">
            {skillsData.map((skill, index) => (
              <div 
                key={skill.name} 
                className="w-full"
                ref={el => progressRefs.current[index] = el}
              >
                <div className="flex justify-between mb-[14px]">
                  <span className="text-[15px] font-medium">{skill.name}</span>
                  <span className="text-[15px] font-medium">
                    {percentages[index]}%
                  </span>
                </div>
                <div className="relative h-[5px] bg-[#FDE3A7]/20 rounded-full overflow-hidden">
                  <div 
                    className="progress-bar-fill absolute left-0 top-0 h-full bg-[#9C4A37] rounded-full"
                    style={{
                      width: "0%",
                      background: "linear-gradient(90deg, #9C4A37 0%, #FDE3A7 100%)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
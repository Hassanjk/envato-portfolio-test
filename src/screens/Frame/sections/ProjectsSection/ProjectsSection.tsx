import React from "react";
import { Button } from "../../../../components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export const ProjectsSection = (): JSX.Element => {
  const projects = [
    {
      name: "A cup of coffee",
      image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&q=80"
    },
    {
      name: "Exoape",
      image: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?auto=format&fit=crop&q=80"
    },
    {
      name: "Gaming",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80"
    },
    {
      name: "Balenciaga",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#0E0E0E] py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <span className="text-[#9C4A37] text-[15px] tracking-[1.12px] uppercase">
          LATEST PROJECTS
        </span>

        <div className="mt-20 grid grid-cols-2 gap-x-20 gap-y-32">
          {projects.map((project, index) => (
            <div key={project.name} className="relative">
              <h2 className="text-[#FDE3A7] text-[60px] leading-[60px] mb-8">
                {project.name}
              </h2>
              
              <div className="relative w-full h-[674px] group">
                <img 
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[81px] h-[81px] rounded-full border border-[#FDE3A7] bg-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRightIcon className="w-6 h-6 text-[#FDE3A7]" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
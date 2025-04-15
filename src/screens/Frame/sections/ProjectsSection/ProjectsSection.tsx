import React, { useEffect, useState, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { ArrowRightIcon, XIcon } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { preloadImages } from "../../../../utils";

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection = (): JSX.Element => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [sliderOpen, setSliderOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      name: "A cup of coffee",
      image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&q=80",
      description: "An exploration of the rich coffee culture and its influence on modern society. This project delves into the artisanal coffee-making process.",
      tags: ["Photography", "Lifestyle", "Food & Beverage"],
      year: "2023"
    },
    {
      name: "Exoape",
      image: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?auto=format&fit=crop&q=80",
      description: "A digital product design studio website focused on innovative experiences for forward-thinking brands and startups.",
      tags: ["Web Design", "Branding", "UX/UI"],
      year: "2022"
    },
    {
      name: "Gaming",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80",
      description: "An immersive gaming platform that redefines interactive entertainment through cutting-edge graphics and responsive design.",
      tags: ["Game Design", "3D", "Interactive"],
      year: "2023"
    },
    {
      name: "Balenciaga",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80",
      description: "A fashion-forward concept exploring the intersection of luxury and street style, inspired by Balenciaga's bold aesthetic.",
      tags: ["Fashion", "Photography", "Editorial"],
      year: "2021"
    }
  ];

  // Mouse tracking for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animate cursor
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: mousePos.x,
        y: mousePos.y,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [mousePos]);

  useEffect(() => {
    let lenis: Lenis;

    const initSmoothScrolling = () => {
      lenis = new Lenis({
        lerp: 0.2,
        smoothWheel: true
      });

      lenis.on('scroll', () => ScrollTrigger.update());

      const scrollFn = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(scrollFn);
      };
      requestAnimationFrame(scrollFn);
    };

    const scroll = () => {
      const contentElements = [...document.querySelectorAll('.project-sticky')];
      const totalContentElements = contentElements.length;

      contentElements.forEach((el, position) => {
        const isLast = position === totalContentElements - 1;
        const isPreLast = position === totalContentElements - 2;

        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: () => {
              if (isLast) {
                return 'top top';
              } else if (isPreLast) {
                return 'bottom top';
              } else {
                return 'bottom+=100% top';
              }
            },
            end: '+=100%',
            scrub: true
          }
        })
        .to(el, {
          ease: 'none',
          yPercent: -100
        }, 0)
        .fromTo(el.querySelector('.project-image'), {
          yPercent: 20,
          rotation: 0,
          scale: 1,
          filter: 'contrast(200%)'
        }, {
          ease: 'none',
          yPercent: -20,
          rotation: 0,
          scale: 1,
          filter: 'contrast(100%)',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'max',
            scrub: true
          }
        }, 0);
      });
    };

    const init = () => {
      initSmoothScrolling();
      scroll();
    };

    // Initialize after images are loaded
    preloadImages('.project-image').then(() => {
      document.body.classList.remove('loading');
      init();
    });

    return () => {
      if (lenis) {
        lenis.destroy();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animation for project detail slider
  useEffect(() => {
    if (activeProject !== null && sliderRef.current) {
      // Open the slider
      setSliderOpen(true);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      gsap.fromTo(sliderRef.current,
        { x: '-100%' },
        { 
          x: '0%', 
          duration: 0.6, 
          ease: "power3.out"
        }
      );
    }
  }, [activeProject]);

  // Close the project detail slider
  const closeProjectDetail = () => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: '-100%',
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setActiveProject(null);
          setSliderOpen(false);
          document.body.style.overflow = ''; // Restore scrolling
        }
      });
    }
  };

  const openProjectDetail = (index: number) => {
    setActiveProject(index);
  }

  return (
    <section className="relative w-full min-h-screen bg-[#0E0E0E]">
      {/* Custom cursor */}
      <div 
        ref={cursorRef}
        className={`fixed w-16 h-16 rounded-full pointer-events-none z-50 transition-all duration-200 flex items-center justify-center ${
          cursorHovered ? 'bg-[#FDE3A7] scale-100' : 'bg-transparent border border-[#FDE3A7] scale-0'
        }`}
        style={{ 
          transform: `translate(${mousePos.x - 32}px, ${mousePos.y - 32}px)`,
        }}
      >
        <ArrowRightIcon className={`w-6 h-6 ${cursorHovered ? 'text-[#0E0E0E]' : 'text-[#FDE3A7]'}`} />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <span className="text-[#9C4A37] text-[15px] tracking-[1.12px] uppercase block pt-20">
          LATEST PROJECTS
        </span>

        {/* Projects List */}
        <div className="wrap" ref={projectsRef}>
          {projects.map((project, index) => (
            <div 
              key={project.name} 
              className={`project-sticky content content--sticky content--half ${
                index % 2 === 0 ? 'bg-1' : 'bg-2'
              } relative w-full md:w-1/2 ${
                index % 2 === 0 ? 'ml-0' : 'ml-auto'
              } min-h-screen flex flex-col justify-center px-4 md:px-8 group cursor-pointer`}
              onClick={() => openProjectDetail(index)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <h2 className="text-[#FDE3A7] text-[60px] leading-[60px] mb-8 font-normal">
                <i className="font-normal">The</i> {project.name}
              </h2>
              
              <div className="project-image relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-md">
                <img 
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Project Detail Slider */}
      <div 
        ref={sliderRef} 
        className={`fixed top-0 left-0 w-full h-full bg-[#121212] z-[100] overflow-y-auto transform translate-x-[-100%]`}
      >
        {activeProject !== null && (
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-[#FDE3A7] text-[80px] leading-tight font-normal">
                <i className="font-normal">The</i> {projects[activeProject].name}
              </h1>
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full border border-[#FDE3A7] bg-transparent"
                onClick={closeProjectDetail}
              >
                <XIcon className="w-5 h-5 text-[#FDE3A7]" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="project-hero-image h-[70vh] overflow-hidden rounded-lg">
                <img 
                  src={projects[activeProject].image}
                  alt={projects[activeProject].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="p-8 bg-[#1A1A1A] rounded-lg mb-8">
                  <h3 className="text-[#FDE3A7] text-2xl mb-4">Project Overview</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    {projects[activeProject].description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mt-12">
                    <div>
                      <h4 className="text-[#9C4A37] text-sm uppercase mb-2">Year</h4>
                      <p className="text-white">{projects[activeProject].year}</p>
                    </div>
                    <div>
                      <h4 className="text-[#9C4A37] text-sm uppercase mb-2">Services</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {projects[activeProject].tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-xs rounded-full border border-[#FDE3A7] text-[#FDE3A7]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="mt-auto bg-[#9C4A37] hover:bg-[#8a3f2f] text-white px-8 py-6 h-auto rounded-md"
                >
                  View Full Case Study
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="my-16">
              <h3 className="text-[#FDE3A7] text-3xl mb-8">Related Projects</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {projects.filter((_, i) => i !== activeProject).slice(0, 3).map((project, index) => (
                  <div 
                    key={project.name} 
                    className="group cursor-pointer rounded-lg overflow-hidden"
                    onClick={() => {
                      // Calculate correct index accounting for filtered projects
                      const targetIndex = projects.findIndex(p => p.name === project.name);
                      openProjectDetail(targetIndex);
                    }}
                  >
                    <div className="h-[300px] overflow-hidden">
                      <img 
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="text-white text-xl mt-4 group-hover:text-[#FDE3A7] transition-colors">
                      {project.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
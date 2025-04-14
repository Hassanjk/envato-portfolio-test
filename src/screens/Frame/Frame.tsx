import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EducationSection } from "./sections/EducationSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection/ProjectsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { ContactSection } from "./sections/ContactSection";
import { Footer } from "./sections/Footer";
import { Loader } from "../../components/Loader";
import { preloadImages } from "../../utils";
import Lenis from "@studio-freight/lenis";

// Enhanced animation variants
const fadeInUp = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

const scaleUp = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1], // Spring-like effect
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3, // Start after loader has disappeared
    },
  },
};

// Sequential section animations
const sectionVariants = {
  initial: {
    opacity: 0,
    y: 70,
  },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.2 + custom * 0.1, // Stagger delay based on section index
    },
  }),
};

export const Frame = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [animationsReady, setAnimationsReady] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Integrate with RAF for smooth animation loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Add scroll listener for anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: 0,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      });
    });

    // Preload all images before removing the loader
    preloadImages('img, [style*="background-image"]').then(() => {
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setLoading(false);
        // Delay starting animations until loader has fully transitioned out
        setTimeout(() => setAnimationsReady(true), 800);
      }, 2000); // Match this with the loader animation duration
    });

    return () => {
      lenis.destroy();
      // Additional cleanup if needed
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader setLoading={setLoading} />}
      </AnimatePresence>

      <motion.main
        initial="initial"
        animate={animationsReady ? "animate" : "initial"}
        variants={stagger}
        className="bg-[#0e0e0e] flex flex-col items-center w-full"
      >
        <motion.div
          variants={fadeIn}
          className="bg-[#0e0e0e] w-full max-w-[1920px]"
        >
          <motion.div variants={scaleUp} id="home">
            <HeaderSection />
          </motion.div>
          
          <motion.div custom={0} variants={sectionVariants} id="about">
            <HeroSection />
          </motion.div>
          
          <motion.div custom={1} variants={sectionVariants} id="education">
            <EducationSection />
          </motion.div>
          
          <motion.div custom={2} variants={sectionVariants} id="projects">
            <ProjectsSection />
          </motion.div>
          
          <motion.div custom={3} variants={sectionVariants} id="testimonials">
            <TestimonialsSection />
          </motion.div>
          
          <motion.div custom={4} variants={sectionVariants} id="contact">
            <ContactSection />
          </motion.div>
          
          <motion.div custom={5} variants={sectionVariants}>
            <Footer />
          </motion.div>
        </motion.div>
      </motion.main>
    </>
  );
};
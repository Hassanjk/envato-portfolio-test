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

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const Frame = (): JSX.Element => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preload all images before removing the loader
    preloadImages('img, [style*="background-image"]').then(() => {
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Match this with the loader animation duration
    });
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader setLoading={setLoading} />}
      </AnimatePresence>

      <motion.main
        initial="initial"
        animate={!loading ? "animate" : "initial"}
        variants={stagger}
        className="bg-[#0e0e0e] flex flex-col items-center w-full"
      >
        <motion.div
          variants={fadeInUp}
          className="bg-[#0e0e0e] w-full max-w-[1920px]"
        >
          <HeaderSection />
          <motion.div variants={fadeInUp}>
            <HeroSection />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <EducationSection />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <ProjectsSection />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <TestimonialsSection />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <ContactSection />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Footer />
          </motion.div>
        </motion.div>
      </motion.main>
    </>
  );
};
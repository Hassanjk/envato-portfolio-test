import React from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";

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

const staggerNav = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const HeaderSection = (): JSX.Element => {
  const navItems = [
    { label: "HOME", href: "#" },
    { label: "PAGES", href: "#" },
    { label: "BLOG", href: "#" },
    { label: "CONTACT", href: "#" },
    { label: "PORTFOLIO", href: "#" },
  ];

  return (
    <section 
      className="relative w-full h-screen bg-cover" 
      style={{ 
        backgroundImage: "url('/assets/img/bg.png')",
        backgroundPosition: "center 30%" 
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-8">
        <motion.div 
          className="flex items-center justify-between pt-8"
          variants={staggerNav}
          initial="initial"
          animate="animate"
        >
          <motion.a 
            href="#" 
            className="text-[#FDE3A7] text-2xl"
            variants={fadeInUp}
          >
            SB.
          </motion.a>

          <motion.nav 
            className="hidden md:block"
            variants={staggerNav}
          >
            <ul className="flex space-x-10">
              {navItems.map((item) => (
                <motion.li 
                  key={item.label}
                  variants={fadeInUp}
                >
                  <a 
                    href={item.href}
                    className="text-[#FDE3A7] text-sm tracking-[1.5px] hover:text-[#9C4A37] transition-colors"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          <motion.a 
            href="tel:+2325452325" 
            className="text-[#FDE3A7] text-xl"
            variants={fadeInUp}
          >
            +2 325 452 32 35
          </motion.a>
        </motion.div>

        <div className="flex h-[calc(100vh-96px)]">
          <motion.div 
            className="flex flex-col justify-center space-y-8 w-12"
            variants={staggerNav}
            initial="initial"
            animate="animate"
          >
            {[
              { icon: "/mask-group.png", alt: "Facebook" },
              { icon: "/2.svg", alt: "Twitter" },
              { icon: "/mask-group-1.png", alt: "LinkedIn" },
            ].map((social, index) => (
              <motion.a
                key={social.alt}
                href="#"
                className="text-[#FDE3A7] hover:text-[#9C4A37] transition-colors"
                variants={fadeInUp}
                custom={index}
              >
                <img src={social.icon} alt={social.alt} className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            className="flex-1 flex flex-col justify-center pl-20"
            variants={staggerNav}
            initial="initial"
            animate="animate"
          >
            <div className="flex items-center">
              <motion.h1 
                className="text-[#FDE3A7] text-[140px] leading-[133px] font-normal mb-16"
                variants={fadeInUp}
              >
                Sam<br />Bailey
              </motion.h1>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="w-[105px] h-[105px] rounded-full bg-[#9C4A37] hover:bg-[#9C4A37]/90 ml-12"
                  size="icon"
                >
                  <img src="/polygon-1.svg" alt="Play" className="w-5 h-5 ml-1" />
                </Button>
              </motion.div>
            </div>

            <motion.p 
              className="text-[#FDE3A7] text-[25px] leading-[32.5px] font-normal"
              variants={fadeInUp}
            >
              Hello, my name is Sam Luise,<br />
              i'm designer
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-8 w-[calc(100%-4rem)] flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.img 
            src="/arrow.svg" 
            alt="Arrow" 
            className="w-[38px] h-[37px]"
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
          <p className="text-[#FDE3A7] text-base">© Centrix 2021.</p>
        </motion.div>
      </div>
    </section>
  );
};
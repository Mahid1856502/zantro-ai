"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GridIllustration from "./ui/grid-illustration";
import IntegrationBox from "./ui/integrationBox";
import { ChevronRight as ChevronRightIcon } from "lucide-react";
import MouseTrail from "./ui/mouse-trail";
import MatrixRain from "./ui/matrix-rain";
import { useRef } from "react";
import SpinningCard from "./ui/spinning-card";
import { GoogleCloudLogo } from "./ui/icons";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const textVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(20px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <section ref={heroRef} className="relative">
      <MouseTrail containerRef={heroRef} />
      <motion.div
        className="absolute inset-0 mx-auto max-w-[100rem] bg-dot-light-black [mask-image:radial-gradient(ellipse_at_left,transparent_20%,black)] dark:bg-dot-dark-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      ></motion.div>

      <div className="relative mx-auto max-w-[100rem] px-6 py-24">
        {/* Top Grid */}
        <motion.div
          className="absolute inset-x-0 top-0 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <GridIllustration />
        </motion.div>

        {/* Matrix Rain Container - Updated for responsiveness */}
        <motion.div
          className="absolute inset-x-0 bottom-[20%] top-[10%] lg:left-[10%] lg:right-[30%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <MatrixRain />
        </motion.div>

        {/* Add SpinningCard before the content */}
        <div className="relative -mt-[120px] sm:mt-0">
          <SpinningCard />
        </div>

        {/* Content */}
        <div className="relative mt-[20rem] mb-[5rem] flex max-w-2xl flex-col items-start px-6 sm:my-[12rem]">
          <motion.div
            className="mb-2 flex scale-95 items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* YC Badge - bg-[#f26625]*/}
            <div className="h-4 w-4 rounded-sm  text-center font-mono text-xs font-medium text-white-50 sm:h-5 sm:w-5 sm:rounded-md sm:text-sm">
              {/* Y */} 
              <GoogleCloudLogo className="h-4 w-4 sm:h-5 sm:w-5"/>
            </div>
            <Link
              href="https://www.ycombinator.com/companies/swiftor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-black/50 transition-colors hover:text-black/70 dark:text-gray-600 dark:hover:text-gray-500"
            >
              BACKED BY GOOGLE CLOUD{" "}
              <ChevronRightIcon className="h-3 w-3" strokeWidth={3} />
            </Link>
          </motion.div>

          {/* Title */}
          <div className="text-4xl font-bold sm:text-5xl">
            <motion.p
              className="bg-gradient-to-b from-neutral-700 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-50 dark:to-neutral-300"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.2,
              }}
            >
              All-in-One
            </motion.p>
            <motion.p
              className="bg-gradient-to-b from-neutral-700 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-50 dark:to-neutral-300"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.3,
              }}
            >
              AI-Powered
            </motion.p>
            <motion.p
              className="bg-gradient-to-b from-neutral-700 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-50 dark:to-neutral-300"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.4,
              }}
            >
              Hacking Dashboard
            </motion.p>
          </div>

          {/* Description */}
          <motion.div
            className="my-4 max-w-sm sm:my-6 sm:max-w-md"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.6,
            }}
          >
            <p className="text-sm font-medium text-black/60 dark:text-gray-500 sm:text-lg">
              Supercharge your hacking with a curated inventory of AI tools,
              natively integrated for a premium experience.
            </p>
          </motion.div>

          {/* Button */}
          <motion.div
            className="z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.8,
            }}
          >
            <Link href="/pricing">
              <motion.button
                className="button-radial-gradient relative rounded-xl px-4 py-1.5 sm:py-2"
                initial={{ "--x": "100%", scale: 1 }}
                animate={{ "--x": "-100%" }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 1.5,
                  delay: 1,
                  type: "spring",
                  stiffness: 20,
                  damping: 15,
                  mass: 2,
                  scale: {
                    type: "spring",
                    stiffness: 10,
                    damping: 5,
                    mass: 0.1,
                  },
                }}
              >
                <span className="button-linear-mask relative h-full w-full text-sm font-medium tracking-wide text-neutral-100 sm:text-base">
                  Try For Free
                </span>
                <span className="button-linear-overlay absolute inset-0 block rounded-xl p-[2px]" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Grid */}
        <motion.div
          className="absolute inset-x-0 bottom-0 w-full scale-y-[-1] transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <GridIllustration />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <IntegrationBox />
        </motion.div>
      </div>
    </section>
  );
}

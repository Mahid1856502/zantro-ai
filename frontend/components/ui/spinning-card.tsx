"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SpinningCard() {
  return (
    <motion.div
      className="absolute left-1/2 top-[calc(50%+200px)] -translate-x-1/2 -translate-y-1/2 sm:top-[calc(50%+300px)]"
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <motion.div
        className="relative h-[169px] w-[300px] sm:h-[360px] sm:w-[640px]"
        initial={{ rotateX: 15, rotateY: -15 }}
        animate={{
          rotateX: [15, 17, 15],
          rotateY: [-15, -12, -15],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front face */}
        <div
          className="border-white/20 absolute inset-0 rounded-lg border bg-black/40 shadow-2xl drop-shadow-2xl sm:rounded-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src="/webms/hero.png"
            alt="Card front"
            fill
            className="contrast-115 select-none rounded-lg object-cover opacity-90 brightness-110 sm:rounded-xl"
            priority
            draggable="false"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

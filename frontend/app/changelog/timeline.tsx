"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getTimePassed } from "@/utils/dateUtils";
import { motion } from "framer-motion";

type TimelineItemProps = {
  date: string;
  title: string;
  description: React.ReactNode;
  version: string;
};

export const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  description,
  version,
}) => {
  return (
    <motion.article 
      className="relative mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient vertical line - adjusted opacity and width */}
      <div className="absolute left-[177px] top-0 h-full w-[2px] bg-gradient-to-b from-primary-500/80 via-primary-500/50 to-transparent dark:from-primary-400/80 dark:via-primary-400/50 hidden lg:block" />
      
      <div className="flex gap-x-6">
        {/* Date section */}
        <motion.div 
          className="hidden w-40 flex-shrink-0 text-end lg:block"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <time dateTime={date} className="block text-base font-semibold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-400">
            {date}
          </time>
          <time dateTime={date} className="block text-sm text-gray-500 dark:text-gray-400">
            {getTimePassed(date)}
          </time>
          <motion.span 
                  className="w-fit rounded-full bg-primary-50/50 px-4 py-1.5 text-sm font-medium text-primary-700 ring-1 ring-primary-100/50 
                           dark:bg-primary-900/30 dark:text-primary-300 dark:ring-primary-800/50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
            {version}
          </motion.span>
        </motion.div>

        {/* Timeline node */}
        <div className="relative z-10 hidden h-6 w-6 items-center justify-center lg:flex">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary-500 dark:bg-primary-400 ring-[3px] ring-white dark:ring-neutral-950"
            whileHover={{ scale: 1.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </div>

        {/* Content card */}
        <motion.div 
          className="grow pl-2"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className={cn(
              "group rounded-2xl bg-white/50 dark:bg-neutral-900/50 p-8",
              "backdrop-blur-sm border border-gray-100/50 dark:border-neutral-800/50",
              "transition-all duration-500 ease-out",
              "hover:bg-white/80 dark:hover:bg-neutral-900/80",
              "hover:shadow-lg hover:shadow-gray-100/50 dark:hover:shadow-neutral-900/50"
            )}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="space-y-6">
              {/* Mobile date display */}
              <div className="flex items-center gap-x-2 text-sm text-gray-500 dark:text-gray-400 lg:hidden">
              <motion.span 
                  className="w-fit rounded-full bg-primary-50/50 px-4 py-1.5 text-sm font-medium text-primary-700 ring-1 ring-primary-100/50 
                           dark:bg-primary-900/30 dark:text-primary-300 dark:ring-primary-800/50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {version}
                </motion.span>
                <time dateTime={date} className="font-medium">
                  {date}
                </time>
                <span>•</span>
                <time dateTime={date}>
                  {getTimePassed(date)}
                </time>
              </div>

              {/* Version and title */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-x-4">
                <h3 className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-400 text-xl font-bold sm:text-2xl">
                  {title}
                </h3>
              </div>

              {/* Description */}
              <div className="prose prose-gray prose-sm dark:prose-invert max-w-none sm:prose-base lg:prose-lg">
                {description}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
};
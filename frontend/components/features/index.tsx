"use client";

import React from "react";
import { motion } from "framer-motion";
import FeatureGrid from "./feature-grid";
import FeatureTabs from "./feature-tabs";
import { featureData } from "./data";
import BlueprintGrid from "../ui/blueprint-grid";
import Customization from "./customization";
import ExpandableCards from "./expandable-cards";

export default function Features() {
  return (
    <>
      <section className="relative py-24">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <BlueprintGrid />
          </motion.div>
        </div>

        {/* Dot Pattern */}
        <motion.div
          className="absolute inset-0 mx-auto max-w-[100rem] bg-dot-light-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-dot-dark-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Main Container */}
        <div className="relative mx-auto max-w-[83rem] px-6">
          {/* Content */}
          <div className="relative px-0 pt-12 pb-24">
            {/* Section Header */}
            <motion.div 
              className="text-center mb-32"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary-600 via-purple-500 to-primary-800 bg-clip-text text-transparent mb-6">
                AI-Powered Evolution Suite
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-xl">
                Continuously evolving features powered by cutting-edge AI for next-generation security research
              </p>
            </motion.div>

            {/* Feature Grid - Main Features */}
            <FeatureGrid features={featureData.slice(0, 3)} />

            {/* Feature Tabs - Detailed Features */}
            <FeatureTabs features={featureData.slice(3)} />

            {/* Add the new Customization section */}
            <Customization />
            <ExpandableCards />
          </div>
        </div>
      </section>
    </>
  );
} 
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Feature } from "./data";
import { ChevronDown, LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

// Add this type to handle dynamic icon components
type IconName = keyof typeof Icons;

interface FeatureTabsProps {
  features: Feature[];
}

export default function FeatureTabs({ features }: FeatureTabsProps) {
  const [activeTab, setActiveTab] = useState(features[0].id);

  // Helper function to get icon component
  const getIconComponent = (iconName: string): LucideIcon | null => {
    return (Icons[iconName as IconName] as LucideIcon) || null;
  };

  return (
    <div className="grid md:grid-cols-[400px_1fr] gap-8 mt-20">
      {/* Tabs */}
      <div className="space-y-4">
        {features.map((feature) => {
          const IconComponent = getIconComponent(feature.icon);
          
          return (
            <motion.div
              key={feature.id}
              initial={false}
              animate={activeTab === feature.id ? "expanded" : "collapsed"}
              className={`
                relative rounded-lg border border-gray-200 
                transition-all duration-300 ease-in-out 
                ${activeTab === feature.id ? "ring-1 ring-black/30" : ""}
                overflow-hidden cursor-pointer
              `}
              onClick={() => setActiveTab(feature.id)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {IconComponent && (
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.color}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                    )}
                    <h3 className="text-lg font-medium">{feature.title}</h3>
                  </div>
                  <motion.div
                    variants={{
                      expanded: { rotate: 180 },
                      collapsed: { rotate: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: activeTab === feature.id ? "auto" : "0px",
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeTab === feature.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 text-sm text-gray-600"
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          {features.map((feature) => (
            activeTab === feature.id && (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {feature.videoUrl?.endsWith(".webm") ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover rounded-xl"
                  >
                    <source src={feature.videoUrl} type="video/webm" />
                  </video>
                ) : (
                  <img
                    src={feature.videoUrl}
                    alt={feature.title}
                    className="h-full w-full object-cover rounded-xl"
                  />
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 
"use client";

import React from "react";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { Feature } from "./data";
import { 
  MessageSquare, 
  Code, 
  Cloud,
  Target,
  Store,
  Trophy,
  FileText,
  Search
} from "lucide-react";

const icons = {
  MessageSquare,
  Code,
  Cloud,
  Target,
  Store,
  Trophy,
  FileText,
  Search
};

interface FeatureGridProps {
  features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <motion.div 
      className="grid grid-cols-1 gap-8 mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {/* First feature - full width */}
      <motion.div
        key={features[0].id}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className={`
          relative group rounded-2xl p-6 overflow-hidden
          bg-gradient-to-br ${features[0].color}
          transition-all duration-500
          backdrop-blur-sm
        `}
        style={{
          boxShadow: "inset 0 2px 80px rgba(0,0,0,0.03), 0 20px 60px -24px rgba(0,0,0,0.1), 0 0 0 1px rgba(240,240,240,0.5)",
        }}
        whileHover={{
          boxShadow: "inset 0 2px 80px rgba(0,0,0,0.05), 0 20px 60px -12px rgba(0,0,0,0.2), 0 0 0 1px rgba(240,240,240,0.6)",
          translateY: -5,
        }}
      >
        <FeatureContent feature={features[0]} isFirstFeature={true} />
      </motion.div>

      {/* Grid container for the next two features - now with 70/30 split */}
      <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-8">
        {features.slice(1, 3).map((feature) => {
          const Icon = icons[feature.icon as keyof typeof icons];
          
          return (
            <motion.div
              key={feature.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`
                relative group rounded-2xl p-6 overflow-hidden
                bg-gradient-to-br ${feature.color}
                transition-all duration-500
                backdrop-blur-sm
              `}
              style={{
                boxShadow: "inset 0 2px 80px rgba(0,0,0,0.03), 0 20px 60px -24px rgba(0,0,0,0.1), 0 0 0 1px rgba(240,240,240,0.5)",
              }}
              whileHover={{
                boxShadow: "inset 0 2px 80px rgba(0,0,0,0.05), 0 20px 60px -12px rgba(0,0,0,0.2), 0 0 0 1px rgba(240,240,240,0.6)",
                translateY: -5,
              }}
            >
              <FeatureContent 
                feature={feature} 
                aspectRatio={feature.id === 3 ? 10/7 : 16/9} 
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Modify the FeatureContent component to handle different layouts
function FeatureContent({ feature, isFirstFeature = false, aspectRatio = 16/9 }: { 
  feature: Feature; 
  isFirstFeature?: boolean;
  aspectRatio?: number;
}) {
  const Icon = icons[feature.icon as keyof typeof icons];
  
  if (isFirstFeature) {
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          {/* Content on the left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white/10">
                {Icon && <Icon className="w-5 h-5 text-primary-600" />}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              {feature.description}
            </p>

            <div className="space-y-2">
              {feature.features.map((item, i) => (
                <p key={i} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-primary-600">→</span>
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Image/Video on the right */}
          <div className="rounded-lg overflow-hidden">
            {feature.videoUrl?.endsWith(".webm") ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
              >
                <source src={feature.videoUrl} type="video/webm" />
              </video>
            ) : (
              <img
                src={feature.videoUrl}
                alt={feature.title}
                className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>
        </div>
      </>
    );
  }

  // Original layout for other features
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-white/10">
            {Icon && <Icon className="w-5 h-5 text-primary-600" />}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {feature.title}
          </h3>
        </div>

        <p className="text-gray-600 mb-6">
          {feature.description}
        </p>

        <div className="space-y-2 mb-6">
          {feature.features.map((item, i) => (
            <p key={i} className="text-sm text-gray-600 flex items-center gap-2">
              <span className="text-primary-600">→</span>
              {item}
            </p>
          ))}
        </div>

        <AspectRatio ratio={aspectRatio} className="rounded-lg overflow-hidden">
          {feature.videoUrl?.endsWith(".webm") ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
            >
              <source src={feature.videoUrl} type="video/webm" />
            </video>
          ) : (
            <img
              src={feature.videoUrl}
              alt={feature.title}
              className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </AspectRatio>
      </div>
    </>
  );
} 
"use client";

import React, { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import YoutubeEmbed from "./ui/YoutubeEmbed";

type FeatureInfo = {
  header: string;
  description: React.ReactNode;
  videoSource?: string;
  embedId?: string;
};

type SingleFeatureProps = {
  info: FeatureInfo;
};

// Helper function to extract bullet points
const extractBulletPoints = (description: React.ReactNode): string[] => {
  if (!description || typeof description !== 'object') return [];
  
  try {
    // @ts-ignore - accessing React element props
    const bulletPoints = description.props?.children[1]?.props?.children
      .split(/\n|<br\s*\/?>/)
      .map((text: string) => text.trim())
      .filter((text: string) => text.startsWith('•'))
      .map((text: string) => text.replace('• ', '→ '))
      .slice(0, 4);
    
    return bulletPoints || [];
  } catch (error) {
    console.error('Error extracting bullet points:', error);
    return [];
  }
};

// Alternative simpler approach for the secondary features section
const renderBulletPoints = (description: React.ReactNode) => {
  try {
    // @ts-ignore - we know our structure
    const bulletContainer = description.props?.children[1];
    if (!bulletContainer) return null;

    return (
      <div className="text-gray-600 space-y-1">
        {React.Children.map(bulletContainer.props.children, (child, index) => {
          if (typeof child === 'string' && child.includes('•')) {
            return (
              <p key={index} className="text-sm">
                {child.trim().replace('• ', '→ ')}
              </p>
            );
          }
          return null;
        }).slice(0, 4)}
      </div>
    );
  } catch (error) {
    console.error('Error rendering bullet points:', error);
    return null;
  }
};

export default function Features() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const handleFeatureClick = (index: number) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  const featureInfo = [
    {
      header: "Chat with Your VMs",
      description: (
        <>
          <p className="pb-6">
            Tired of juggling terminal commands? Just chat with{" "}
            <b>
              <code>@voice</code>
            </b>{" "}
            to control your VMs. From file operations to running tools - it's all just a message away.
          </p>
          <p>
            • Run commands through natural conversation<br />
            • Control Chrome for OSINT research<br />
            • Process data and generate reports<br />
            • Automate repetitive tasks easily
          </p>
        </>
      ),
      videoSource: "/webms/talktovms.webm",
    },
    {
      header: "Built-in Code Editor",
      description: (
        <>
          <p className="pb-6">
            A full-featured code editor right in your browser. Write, edit and manage your code without switching contexts.
          </p>
          <p>
            • Syntax highlighting for major languages<br />
            • AI-powered code suggestions<br />
            • File tree and quick navigation<br />
            • Dark theme optimized for long sessions<br />
            • Integrated with VM file system
          </p>
        </>
      ),
      videoSource: "/webms/spedupsetup.webm",
    },
    {
      header: "Cloud Storage",
      description: (
        <>
          <p className="pb-6">
            Keep your tools and files accessible across all VMs. No more copying files between machines or losing track of your payloads.
          </p>
          <p>
            • Centralized file management<br />
            • Easy file sharing between VMs<br />
            • Organized workspace structure<br />
            • Quick file search and preview<br />
            • Secure file storage
          </p>
        </>
      ),
      videoSource: "/webms/storage.png",
    },
    {
      header: "Attack Planning with Excalidraw",
      description: (
        <>
          <p className="pb-6">
            Map out your attack strategies and document your findings visually. Perfect for planning engagements and team collaboration.
          </p>
          <p>
            • Create attack flow diagrams<br />
            • Document network layouts<br />
            • Sketch out vulnerabilities<br />
            • Export diagrams for reports<br />
            • Share plans with your team
          </p>
        </>
      ),
      videoSource: "/webms/draw.png",
    },
    {
      header: "Exploit Marketplace",
      description: (
        <>
          <p className="pb-6">
            Browse and deploy common security tools and exploits directly to your VMs. Each exploit comes with documentation and usage examples.
          </p>
          <p>
            • Curated security tools<br />
            • One-click VM deployment<br />
            • Usage documentation included<br />
            • Community submissions<br />
            • Regular updates
          </p>
        </>
      ),
      videoSource: "/webms/marketplace.png",
    },
    {
      header: "Monthly CTFs & Labs",
      description: (
        <>
          <p className="pb-6">
            Put your skills to the test with our monthly challenges. From web exploitation to binary analysis, there's always something new to learn.
          </p>
          <p>
            • Fresh challenges each month<br />
            • Various difficulty levels<br />
            • Practical scenarios<br />
            • Helpful hints available<br />
            • Learn as you hack
          </p>
        </>
      ),
      videoSource: "/webms/ctf.png",
    },
    {
      header: "Notes Integration",
      description: (
        <>
          <p className="pb-6">
            Keep your pentest notes, snippets, and findings organized with our integrated SiYuan note-taking system.
          </p>
          <p>
            • Structured note organization<br />
            • Markdown support<br />
            • Code block formatting<br />
            • Link related notes<br />
            • Search across all notes
          </p>
        </>
      ),
      videoSource: "/webms/notes.png",
    },
    {
      header: "Live AI Research",
      description: (
        <>
          <p className="pb-6">
            Research vulnerabilities and stay updated on security trends with integrated Perplexity search. Get relevant answers without leaving your workspace.
          </p>
          <p>
            • Search security databases<br />
            • Find exploit references<br />
            • Research CVEs quickly<br />
            • Get relevant examples<br />
            • Access recent security news
          </p>
        </>
      ),
      videoSource: "/webms/search.png",
    },
    {
      header: "Report Builder",
      description: (
        <>
          <p className="pb-6">
            Transform your findings into professional reports with our drag-and-drop editor. Built specifically for penetration test reporting.
          </p>
          <p>
            • Pre-built report sections<br />
            • Vulnerability templates<br />
            • Include screenshots easily<br />
            • Consistent formatting<br />
            • Export to PDF
          </p>
        </>
      ),
      videoSource: "/webms/puck.png",
    },
  ];

  // Split features into different sections
  const mainFeatures = featureInfo.slice(0, 3); // First 3 major features
  const secondaryFeatures = featureInfo.slice(3, 7); // Next 4 features
  const highlightFeatures = featureInfo.slice(7); // Last 2 special features

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Hero Features - Big, alternating layout */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-6">
              Core Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Everything you need for professional penetration testing
            </p>
          </div>

          <div className="space-y-32">
            {mainFeatures.map((info, index) => (
              <div 
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-16`}
              >
                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {info.header}
                  </h3>
                  <div className="text-gray-600 text-lg">
                    {info.description}
                  </div>
                </div>

                <div className="flex-1">
                  <AspectRatio ratio={16 / 9}>
                    {info.videoSource?.endsWith(".webm") ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="rounded-lg shadow-2xl"
                      >
                        <source src={info.videoSource} type="video/webm" />
                      </video>
                    ) : (
                      <img
                        src={info.videoSource}
                        alt={info.header}
                        className="rounded-lg shadow-2xl object-cover"
                      />
                    )}
                  </AspectRatio>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Features - More creative grid with images */}
        <div className="mb-32">
          <h3 className="text-2xl font-bold text-center mb-12">Additional Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {secondaryFeatures.map((info, index) => (
              <div 
                key={index} 
                className="group relative bg-black/5 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-[260px]"
              >
                {/* Background Image with Gradient */}
                <div className="absolute inset-0">
                  <img
                    src={info.videoSource}
                    alt=""
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                </div>
                
                <div className="relative h-full p-8 flex flex-col justify-center">
                  <div className="flex items-start gap-4 text-white">
                    <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-white/90 font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-4">
                        {info.header}
                      </h4>
                      <div className="space-y-1 text-white/80">
                        {renderBulletPoints(info.description)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Features - Cards */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">Highlight Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlightFeatures.map((info, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Card Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-semibold text-lg">{index + 1}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 pt-2">
                    {info.header}
                  </h4>
                </div>

                {/* Card Content */}
                <div className="space-y-6">
                  <div className="text-gray-600">
                    {info.description}
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={info.videoSource}
                      alt={info.header}
                      className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

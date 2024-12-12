"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Layout, FileText } from "lucide-react";

const PRECONFIGURED_DISTROS = [
  { 
    name: "Kali Linux", 
    desc: "Advanced Penetration Testing",
    img: "https://cdn.thingiverse.com/assets/7b/55/8f/e6/bc/large_display_kali_linux.jpg"
  },
  { 
    name: "REMnux", 
    desc: "Malware Analysis & Reverse Engineering",
    img: "https://cdn.prod.website-files.com/65e1f74aeadd13bc01d31d46/665f239d2cc0d329b0d991df_remnux.png"
  },
  { 
    name: "ParrotOS", 
    desc: "Security & Development",
    img: "https://styles.redditmedia.com/t5_3jxys/styles/communityIcon_z9jsfziqpdac1.jpg"
  }
];

const DISTRO_VERSIONS = {
  Ubuntu: [
    { name: "22.04 LTS", code: "22.04" },
    { name: "20.04 LTS", code: "20.04" },
  ],
  Fedora: [
    { name: "37", code: "37" },
    { name: "36", code: "36" },
  ],
  Debian: [
    { name: "11", code: "11" },
    { name: "10", code: "10" },
  ],
};

export default function Customization() {
  const [selectedDistro, setSelectedDistro] = useState<string>("Ubuntu");
  const [selectedVersion, setSelectedVersion] = useState<string>("22.04");
  const [selectedDE, setSelectedDE] = useState<string>("KDE");

  return (
    <section className="relative py-24">
      <motion.div
        className="mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary-600 via-purple-500 to-primary-800 bg-clip-text text-transparent mb-6">
            Your Environment, Your Rules
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-xl">
            Choose from KDE-powered security distributions or build your perfect custom environment
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
            width="600"
            height="600"
            viewBox="0 0 100 100"
            fill="none"
          >
            <text
              x="31%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="80"
              stroke="currentColor"
              strokeWidth="0.2"
              strokeDasharray="1 0.5"
            >
              ༆
            </text>
            <text
              x="31%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="80"
              className="text-primary-600"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="40 160"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="200;0"
                dur="2s"
                begin="0s;trace.end+3s"
                id="trace"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
              ༆
            </text>
          </svg>

          <div className="grid md:grid-cols-2 gap-8 relative">
            <div className="rounded-2xl p-8 backdrop-blur-[.9px] border bg-background/30 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-primary-600" />
                <h4 className="text-2xl font-semibold">Pre-configured Distros</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                All pre-configured distributions come with KDE Plasma desktop environment
              </p>
              <div className="grid grid-cols-1 gap-4">
                {PRECONFIGURED_DISTROS.map((distro) => (
                  <div
                    key={distro.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-background/50 border gap-4 hover:border-primary-500/50 transition-colors duration-200"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{distro.name}</span>
                      <span className="text-sm text-muted-foreground">{distro.desc}</span>
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={distro.img}
                        alt={`${distro.name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-8 backdrop-blur-[.9px] border bg-background/30 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <Layout className="w-6 h-6 text-primary-600" />
                <h4 className="text-2xl font-semibold">Custom Builds</h4>
              </div>
              <p className="text-sm text-muted-foreground">Build your own environment for development and web hosting</p>
              <br />
              <div className="space-y-6">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground mb-3">Base Distribution</h5>
                  <div className="flex gap-3">
                    {["Ubuntu", "Fedora", "Debian"].map((os) => (
                      <div
                        key={os}
                        className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors duration-200 ${
                          selectedDistro === os
                            ? "bg-primary-100/50 border-primary-200 hover:border-primary-400"
                            : "bg-background/50 border hover:border-primary-500/50"
                        }`}
                        onClick={() => {
                          setSelectedDistro(os);
                        }}
                      >
                        <span className={`font-medium ${selectedDistro === os ? "text-white" : ""}`}>
                          {os}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedDistro && (
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground mb-3">Version</h5>
                    <div className="flex flex-wrap gap-3">
                      {DISTRO_VERSIONS[selectedDistro as keyof typeof DISTRO_VERSIONS].map((version) => (
                        <div
                          key={version.code}
                          className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors duration-200 ${
                            selectedVersion === version.code
                              ? "bg-primary-100/50 border-primary-200 hover:border-primary-400"
                              : "bg-background/50 border hover:border-primary-500/50"
                          }`}
                          onClick={() => setSelectedVersion(version.code)}
                        >
                          <span className={`font-medium ${selectedVersion === version.code ? "text-white" : ""}`}>
                            {version.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground mb-3">Desktop Environment</h5>
                  <div className="flex flex-wrap gap-3">
                    {["XFCE", "MATE", "i3", "KDE", "Openbox"].map((de) => (
                      <div
                        key={de}
                        className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors duration-200 ${
                          selectedDE === de
                            ? "bg-primary-100/50 border-primary-200 hover:border-primary-400"
                            : "bg-background/50 border hover:border-primary-500/50"
                        }`}
                        onClick={() => setSelectedDE(de)}
                      >
                        <span className={`font-medium ${selectedDE === de ? "text-white" : ""}`}>
                          {de}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary-600 via-purple-500 to-primary-800 bg-clip-text text-transparent mb-6">
            Professional Report Templates
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-xl">
            Comprehensive templates for various security assessments and penetration testing reports
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Web Security",
              templates: ["Web Application Assessment", "API Security Testing", "Cloud Security Review"]
            },
            {
              title: "Network Security",
              templates: ["Network Infrastructure", "Wireless Assessment", "IoT Security"]
            },
            {
              title: "Special Assessments",
              templates: ["Social Engineering", "Red Team Operations", "Mobile Application"]
            }
          ].map((category) => (
            <div
              key={category.title}
              className="rounded-2xl p-8 backdrop-blur-sm border bg-background/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary-600" />
                <h4 className="text-2xl font-semibold">{category.title}</h4>
              </div>
              <div className="space-y-3">
                {category.templates.map((template) => (
                  <div
                    key={template}
                    className="p-4 rounded-lg bg-background/50 border hover:border-primary-500/50 transition-colors duration-200"
                  >
                    <span className="font-medium">{template}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 
import React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Tweet } from "@/components/tweet";
import { components } from "./ui/my-tweet";
import { Badge } from "./ui/badge";

type VideoData = {
  src: string;
  title: string;
  description: string;
};

type VideoCardProps = VideoData;

const AboutComponent: React.FC = () => {
  return (
    <section className={"mt-36"}>
      <div className={"m-4 mt-0 flex flex-col items-center text-center lg:m-0 lg:justify-center"}>
        <h1 className="text-4xl font-bold">
          The{" "}
          <span className="relative">
            <span className="relative z-10 text-primary-700">most powerful</span>
            <span
              className="absolute bottom-0 left-0 w-full"
              style={{
                height: "1.4375rem",
                background: "rgba(20, 189, 149, 0.20)",
              }}
            ></span>
          </span>
          {" "}AI hacking platform ever built
        </h1>
        <p className="mt-4 max-w-2xl text-center text-gray-500">
          We're building the world's most advanced AI-powered security platform. 
          Imagine having an entire red team in your browser - that's Swiftor. 
          From zero to full compromise, we're revolutionizing how security testing happens.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center">
        <p className="text-xs text-gray-700">Powered by breakthrough features</p>

        <div className="m-4 mt-2 flex max-w-4xl flex-wrap items-center justify-center gap-4">
          <Badge>AI That Actually Understands Security</Badge>
          <Badge>Your Entire Attack Surface in One Place</Badge>
          <Badge>Plan Like a Red Team Master</Badge>
          <Badge>Deploy Exploits at Lightning Speed</Badge>
          <Badge>Learn from Real-World Scenarios</Badge>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center p-4 pb-0">
        <h2 className="text-4xl font-bold">
          <span className="relative">
            <span className="relative z-10">Founder</span>
            <span
              className="absolute bottom-0 left-0 w-full"
              style={{
                height: "1.4375rem",
                background: "rgba(20, 189, 149, 0.20)",
              }}
            ></span>
          </span>
        </h2>

        <div className="max-w-2xl text-gray-500">
          <p className="mt-6 text-center">
            Swiftor was born from frustration. As a HackerOne ethical hacker, I spent countless 
            hours juggling dozens of tools and platforms to setting up hacking environments. 
            I knew there had to be a better way. I needed a simple, efficient way to hack and 
            write reports side by side, and now everything is in one streamlined dashboard.
          </p>
          <p className="mt-3 text-center">
            Today, we're building the platform I wish I had: where AI meets security testing, 
            where every tool you need is just a click away, and where you can go from discovery 
            to report in record time. We're not just making another security tool - we're 
            building the future of ethical hacking.
          </p>
        </div>
      </div>
    </section>
  );
};

const VideoCard: React.FC<VideoCardProps> = ({ src, title, description }) => (
  <Card>
    <CardContent
      className="flex flex-col-reverse p-4 sm:flex-col"
      style={{
        width: "100%",
        maxWidth: "30rem",
        minHeight: "24rem",
      }}
    >
      <div
        className="relative mt-4 sm:mb-4 sm:mt-0"
        style={{
          paddingBottom: "16rem",
        }}
      >
        <iframe
          className="absolute left-0 top-0 h-full w-full rounded"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <CardDescription className="text-gray-500">{description}</CardDescription>
    </CardContent>
  </Card>
);

export default AboutComponent;

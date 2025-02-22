import Features from "@/components/features/index";
import Hero from "@/components/hero";
import Try from "@/components/try";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  canonical: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Try />
    </>
  );
}

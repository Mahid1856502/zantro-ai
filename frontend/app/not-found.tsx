import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { DonutAnimation } from "@/components/ui/DonutAnimation";

export const metadata: Metadata = constructMetadata({
  title: "Page Not Found",
  description: "The requested page could not be found.",
  canonical: "/404",
});

export default function Custom404() {
  return (
    <>
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="pb-12 pt-[15rem] md:pb-20">
            <div className="mx-auto max-w-xl">
              <div className="mb-10">
                <DonutAnimation />
              </div>
              <p className="text-center text-lg">
                Sorry, we couldn't find the resource you were after.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

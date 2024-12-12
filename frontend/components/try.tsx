import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TryPear() {
  return (
    <div className="showcase-gradient-light relative mx-auto flex min-h-[80vh] w-full max-w-full items-center justify-center sm:min-h-[120vh]">
      <div className="mt-12 flex max-w-3xl flex-col items-center px-6 text-center">
        <p className="max-w-xl text-4xl font-semibold text-black sm:text-6xl">
          Try Swiftor for free.
        </p>
        <p className="mt-4 max-w-md text-xl font-semibold text-black sm:text-3xl">
          Premium Tools, One Price.
        </p>
        <Button className="mt-10 bg-black px-20 py-4 text-sm hover:bg-black dark:hover:bg-black sm:text-base">
          <Link href="/pricing">Explore Pricing</Link>
        </Button>
        <a
          href="https://github.com/furaar/swiftor"
          className="mt-2 text-xs font-medium text-black underline decoration-dashed underline-offset-1 hover:decoration-black/20 dark:text-black"
          target="_blank"
          rel="noopener noreferrer"
        >
          Interested in contributing?
        </a>
      </div>
    </div>
  );
}

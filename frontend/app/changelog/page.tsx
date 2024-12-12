import { Metadata } from "next";
import updates from "./changelog";
import { TimelineItem } from "./timeline";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Change Logs",
  description: "The change logs for Swiftor.",
  canonical: "/changelog",
});

const ChangeLog: React.FC = () => {
  return (
    <div className="mx-auto mb-32 mt-36 min-h-screen max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <h1 className="mb-16 text-5xl font-bold text-primary-700">Change Logs</h1>
      <p className="mb-16 text-lg text-gray-600">View all the updates and improvements made to Swiftor.</p>
      <main>
        <section className="max-w-[1200px]">
          {updates.map((update, index) => (
            <TimelineItem key={index} {...update} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default ChangeLog;
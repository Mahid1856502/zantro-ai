import React from "react";
import {
  OpenInterpreterLogo,
  CodeMirrorLogo,
  WhiteRabbitNeoLogo,
  PuckEditorLogo,
  ExcalidrawLogo,
} from "./icons";

interface IntegrationItemProps {
  marginLeft: string;
  label: string;
  product: string;
  Icon: React.FC<React.ComponentProps<"svg">>;
}

const IntegrationItem = ({
  marginLeft,
  label,
  product,
  Icon,
}: IntegrationItemProps) => (
  <div
    className={`bg-white-50 dark:bg-gray-800 ${marginLeft} w-fit rounded-lg border border-gray-200 px-3 py-2 dark:border-black/50`}
  >
    <div className="flex items-center gap-2">
      <Icon className="h-6 w-6" />
      <div className="flex flex-col text-xs">
        <span className="text-gray-500 dark:text-gray-400">{label}</span>
        <span className="dark:text-white font-medium text-black">
          {product}
        </span>
      </div>
    </div>
  </div>
);

const INTEGRATIONS = [
  {
    marginLeft: "ml-0",
    label: "Report with",
    product: "Puck Editor",
    Icon: PuckEditorLogo,
  },
  {
    marginLeft: "ml-24",
    label: "Edit with",
    product: "CodeMirror",
    Icon: CodeMirrorLogo,
  },
  {
    marginLeft: "ml-40",
    label: "Plan with",
    product: "Excalidraw",
    Icon: ExcalidrawLogo,
  },
  {
    marginLeft: "ml-48",
    label: "Chat with",
    product: "WhiteRabbit Neo",
    Icon: WhiteRabbitNeoLogo,
  },
  {
    marginLeft: "ml-32",
    label: "Control with",
    product: "OpenInterpreter",
    Icon: OpenInterpreterLogo,
  },
];

const WavyLines = () => {
  const paths = [
    "M39 543C39 377.918 243 364.44 243 173.01V1.50026",
    "M77 543C77 377.918 344 364.44 344 173.01V1.50026",
    "M115 543C115 377.918 450.5 364.44 450.5 173.01C450.5 -18.419 450.5 1.50026 450.5 1.50026",
    "M153 543C153 392 553 410 553 178.898V1.50026",
    "M0.5 543C0.5 377.5 140 394 140 173.01V1.5",
  ];

  return (
    <div className="absolute right-0 top-5 overflow-hidden opacity-30">
      <svg
        width="554"
        height="543"
        viewBox="0 0 554 543"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base lines */}
        {paths.map((d, i) => (
          <path key={`line-${i}`} d={d} stroke="gray" />
        ))}

        {/* Animated highlights */}
        {paths.map((d, i) => (
          <path
            key={`highlight-${i}`}
            d={d}
            stroke="rgb(255, 0, 0)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="1000"
              to="-1000"
              dur={`${3 + i * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dasharray"
              values="0 1000;20 1000;0 1000"
              dur={`${3 + i * 0.5}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}

        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default function IntegrationBox() {
  return (
    <div className="hidden lg:block">
      <WavyLines />

      {/* Integration Cards */}
      <div className="absolute right-[8rem] top-20 flex flex-col gap-8">
        {INTEGRATIONS.map((integration, index) => (
          <IntegrationItem key={index} {...integration} />
        ))}

        {/* Bottom Card */}
        <div
          className={`-ml-[5.2rem] mt-[3rem] w-fit rounded-lg border border-gray-200 bg-white-50 px-3 py-2 dark:border-black/50 dark:bg-gray-800`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary-700 text-xs font-medium text-white-50 shadow-[0_0_12px_1px] shadow-primary-700/50">
              v3
            </div>
            <div className="flex flex-col text-xs">
              <span className="text-gray-500 dark:text-gray-400">Live now</span>
              <span className="dark:text-white font-medium text-black">
                More coming soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

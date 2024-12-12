"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingPageProps, PricingTierProps } from "@/types/pricing";
import { useCheckout } from "@/hooks/useCheckout";
import { PRICING_TIERS, CONTACT_EMAIL } from "@/utils/constants";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Info } from "lucide-react";
import { tiers } from "@/contexts/UserContext";

interface ExtendedPricingTierProps extends PricingTierProps {
  disabled?: boolean;
}

const PricingTier: React.FC<ExtendedPricingTierProps> = ({
  title,
  prevPrice,
  price,
  description,
  features,
  buttonText,
  isFree = false,
  priceId,
  user,
  index,
  disabled,
  priceUnit = "/month",
}) => {
  const { handleCheckout, isSubmitting } = useCheckout(user);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string>();
  const router = useRouter();

  // used to ensure animations run after mount client-side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log("priceId", priceId);

  const featureRowDescription = (feature: string) => {
    if (feature?.startsWith("custom-standard")) {
      return (
        <div className="flex items-center">
          <span>
            Monthly refill of PearAI Credits for market-leading AI models
            <PearCreditsTooltip type="standard" />
          </span>
        </div>
      );
    } else if (feature?.startsWith("free")) {
      return (
        <div className="flex items-center">
          <span>
            Use our free trial, your own API key, or local models
            <PearCreditsTooltip type="free" />
          </span>
        </div>
      );
    } else if (feature?.startsWith("custom-enterprise")) {
      return (
        <div className="flex items-center">
          <span>
            Monthly refill of increased PearAI Credits for market-leading AI
            models
            <PearCreditsTooltip type="enterprise" />
          </span>
        </div>
      );
    }
    return feature;
  };
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  return (
    <Card
      className={`flex h-full w-full flex-col ${index === 1 && "from-primary-600/5 ring-primary-900/40 dark:from-primary-600/5 dark:ring-primary-600/20"}`}
    >
      <div className="flex h-full w-full flex-col">
        <CardHeader className="flex-grow-0 px-6 py-6 pb-0">
          <CardTitle className="text-2xl leading-6 text-primary-700">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-5 flex flex-grow flex-col px-6">
          {!isFree ? (
            <div className="flex flex-col items-start justify-center">
              <p
                className="text-2xl text-gray-900 sm:text-3xl"
                aria-label={`Price: $${price} per month`}
              >
                ${price}
                <small className="text-base text-gray-400 sm:text-lg">
                  {priceUnit}
                </small>
                &nbsp;
                <small className="text-base text-primary-700 sm:text-lg">
                  &#40;Early Bird&#41;
                </small>
              </p>
              <p
                className="text-base text-gray-400 sm:text-lg"
                aria-label={`Original price: $${prevPrice} per month`}
              >
                <del>${prevPrice}</del>
                <small>{priceUnit}</small>
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-center">
              <p
                className="text-2xl text-gray-900 sm:text-3xl"
                aria-label="Price: Free"
              >
                Free
              </p>
            </div>
          )}
          <p className="text-base font-normal text-gray-600 sm:text-base md:text-sm">
            {index === 0 && isFree && (
              <span className="w-full rounded mt-5">
                Free requests out of the box, no credit card required. 🤓
              </span>
            )}
            {!isFree && description}
          </p>
          {isFree && <span className="w-full rounded mt-12" />}
          {!isFree && (
            <>
              {disabled ? (
                <Button className="w-full rounded mt-5" disabled>
                  Coming Soon
                </Button>
              ) : (
                <Button
                  className="w-full rounded mt-5"
                  onClick={() => priceId && handleCheckout(priceId)}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  aria-label={`Subscribe to ${title} plan`}
                >
                  {isSubmitting ? "Processing..." : buttonText}
                </Button>
              )}
            </>
          )}
          {features && (
            <ul
              className="mt-5 w-full"
              aria-label={`Features of ${title} plan`}
            >
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center py-2 text-gray-600"
                >
                  <Check
                    className="mr-3 h-6 w-6 flex-shrink-0 text-primary-700"
                    aria-hidden="true"
                  />
                  {featureRowDescription(feature)}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        {/* <CardFooter>
          {!isFree && (
            <>
              {disabled ? (
                <Button className="w-full" disabled>
                  Coming Soon
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => priceId && handleCheckout(priceId)}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  aria-label={`Subscribe to ${title} plan`}
                >
                  {isSubmitting ? "Processing..." : buttonText}
                </Button>
              )}
            </>
          )}
        </CardFooter> */}
      </div>
    </Card>
  );
};

const PricingPage: React.FC<PricingPageProps> = ({ user }) => {
  return (
    <section
      className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-24"
      aria-labelledby="pricing-heading"
    >
      <div className="absolute top-0 z-[-1] mt-[-35px] h-[140px] w-full bg-primary-800/30 blur-3xl"></div>
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-20">
        <div className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-6">
          <header className="mx-auto mt-16 max-w-4xl space-y-4 text-center sm:mt-0 sm:space-y-6">
            <h1
              id="pricing-heading"
              className="mt-8 text-4xl font-medium leading-tight sm:text-5xl md:text-5xl lg:text-5xl"
            >
              Speed up your
              <br />
              development today.
            </h1>
          </header>

          <Tabs
            defaultValue="standard"
            className="mt-[20px] flex w-full flex-col items-center"
          >
            <TabsList className="h-full rounded bg-gray-300/20 px-2 py-2 ring-1 ring-gray-300/60 dark:bg-gray-100/10 dark:ring-gray-100/40">
              <TabsTrigger
                value="standard"
                className="w-[135px] rounded px-4 py-2 data-[state=active]:bg-primary-800"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="enterprise"
                className="w-[135px] rounded px-4 py-2 data-[state=active]:bg-primary-800"
              >
                Yearly &nbsp;
                <span className="text-[#FFA500] pi pi-tag"> Save $120</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="standard"
              className="w-full space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-6"
            >
              <div className="mt-[20px] flex w-full items-center justify-center rounded-md bg-gray-300/20 bg-gradient-to-l from-primary-800/[0.15] via-gray-100/10 to-transparent to-60% px-6 py-3.5 ring-1 ring-gray-300/60 dark:bg-gray-100/10 dark:ring-gray-100/40">
                <div className="flex w-full items-center justify-between rounded-md">
                  <p className="block w-max items-center justify-start md:flex">
                    <span className="text-primary-700 dark:text-primary-800">
                      Be the early bird and get a discount
                    </span>
                    &nbsp;
                    <span className="text-primary-900 dark:text-primary-700">
                      forever
                    </span>
                  </p>

                  <p className="block w-max items-center justify-end text-right md:flex">
                    <strong className="text-lg text-primary-900 dark:text-gray-900">
                      20-30% off
                    </strong>
                    &nbsp;
                    <span className="font-normal text-primary-700 dark:text-primary-300">
                      &#40;forever&#41;
                    </span>
                  </p>
                </div>
              </div>
              {PRICING_TIERS.standard && (
                <div
                  className="mt-[20px] grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
                  role="list"
                >
                  {PRICING_TIERS.standard.map((tier, index) => (
                    <div key={index} role="listitem">
                      <PricingTier {...tier} user={user} index={index} />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent
              value="enterprise"
              className="w-full space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-6"
            >
              <div className="mt-[20px] flex w-full items-center justify-center rounded-md bg-gray-300/20 bg-gradient-to-l from-primary-800/[0.15] via-gray-100/10 to-transparent to-60% px-6 py-3.5 ring-1 ring-gray-300/60 dark:bg-gray-100/10 dark:ring-gray-100/40">
                <div className="flex w-full items-center justify-between rounded-md">
                  <p className="block w-max items-center justify-start md:flex">
                    <span className="text-primary-700 dark:text-primary-800">
                      Be the early bird and get a discount
                    </span>
                    &nbsp;
                    <span className="text-primary-900 dark:text-primary-700">
                      forever
                    </span>
                  </p>

                  <p className="block w-max items-center justify-end text-right md:flex">
                    <strong className="text-lg text-primary-900 dark:text-gray-900">
                      20-30% off
                    </strong>
                    &nbsp;
                    <span className="font-normal text-primary-700 dark:text-primary-300">
                      &#40;forever&#41;
                    </span>
                  </p>
                </div>
              </div>
              {PRICING_TIERS.enterprise && (
                <div
                  className="mt-[20px] grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
                  role="list"
                >
                  {PRICING_TIERS.enterprise.map((tier, index) => (
                    <div key={index} role="listitem">
                      <PricingTier
                        {...tier}
                        user={user}
                        index={index}
                        priceUnit="/month"
                        disabled
                      />
                    </div>
                  ))}
                </div>
              )}
              <footer className="text-center">
                <p className="text-base text-gray-400 sm:text-lg md:text-xl">
                  Interested in these plans?
                  <button
                    className="ml-2 font-semibold text-primary-700 transition-colors hover:text-primary-800"
                    aria-label="Contact us for custom plans"
                    onClick={() => {
                      navigator.clipboard.writeText(CONTACT_EMAIL);
                      toast.success("Email copied to clipboard!");
                    }}
                  >
                    Contact us
                  </button>
                  !
                </p>
              </footer>
            </TabsContent>
          </Tabs>

          {/* Add comparison table */}
          <div className="w-full">
            <h2 className="mb-8 text-3xl font-medium mt-32">Compare Plans</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-1 border-r text-left"></th>
                    <th className="border-b p-1 text-left">Core</th>
                    <th className="border-b p-1 text-left">Hacker</th>
                    <th className="border-b p-1 text-left">1337</th>
                  </tr>
                </thead>
                <tbody>
                  {/* SwiftorAI Section */}
                  <tr>
                    <td colSpan={4} className="bg-gray-100 p-1 font-medium">
                      Swiftor AI
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Interpreter</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.features.interpreter ? "✓" : ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.features.interpreter ? "✓" : ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.features.interpreter ? "✓" : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Chat</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.features.chatEnabled && (
                        <>
                          {getAccessLevelText(tiers.core.features.chatLevel)}
                          {tiers.core.features.chatLevel > 0 && (
                            <ModelTooltip
                              type={
                                tiers.core.features.chatLevel === 1
                                  ? "Basic"
                                  : "Advanced"
                              }
                            />
                          )}
                        </>
                      )}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.features.chatEnabled && (
                        <>
                          {getAccessLevelText(tiers.hacker.features.chatLevel)}
                          {tiers.hacker.features.chatLevel > 0 && (
                            <ModelTooltip
                              type={
                                tiers.hacker.features.chatLevel === 1
                                  ? "Basic"
                                  : "Advanced"
                              }
                            />
                          )}
                        </>
                      )}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.features.chatEnabled && (
                        <>
                          {getAccessLevelText(tiers.pro.features.chatLevel)}
                          {tiers.pro.features.chatLevel > 0 && (
                            <ModelTooltip
                              type={
                                tiers.pro.features.chatLevel === 1
                                  ? "Basic"
                                  : "Advanced"
                              }
                            />
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Code Completion</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.features.codeCompletionEnabled ? "✓" : ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.features.codeCompletionEnabled ? "✓" : ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.features.codeCompletionEnabled ? "✓" : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Code Generation</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.features.codeGenerationEnabled && (
                        <>
                          {getAccessLevelText(
                            tiers.core.features.codeGenerationLevel
                          )}
                          {tiers.core.features.codeGenerationLevel > 0 && (
                            <ModelTooltip
                              type={
                                tiers.core.features.codeGenerationLevel === 1
                                  ? "Basic"
                                  : "Advanced"
                              }
                            />
                          )}
                        </>
                      )}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.features.codeGenerationEnabled && (
                        <>
                          {getAccessLevelText(
                            tiers.hacker.features.codeGenerationLevel
                          )}
                          {tiers.hacker.features.codeGenerationLevel > 0 && (
                            <ModelTooltip
                              type={
                                tiers.hacker.features.codeGenerationLevel === 1
                                  ? "Basic"
                                  : "Advanced"
                              }
                            />
                          )}
                        </>
                      )}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.features.codeGenerationEnabled && (
                        <>
                          {getAccessLevelText(
                            tiers.pro.features.codeGenerationLevel
                          )}
                          {tiers.pro.features.codeGenerationLevel > 0 && (
                            <ModelTooltip
                              type={
                                tiers.pro.features.codeGenerationLevel === 1
                                  ? "Basic"
                                  : "Advanced"
                              }
                            />
                          )}
                        </>
                      )}
                    </td>
                  </tr>

                  {/* Virtual Machines Section */}
                  <tr>
                    <td colSpan={4} className="bg-gray-100 p-1 font-medium">
                      Virtual Machines
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">vCPU</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.resources.maxVCPUs ?? ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.resources.maxVCPUs}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.resources.maxVCPUs}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Memory (GiB)</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.resources.maxMemory ?? ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.resources.maxMemory}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.resources.maxMemory}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Storage (GiB)</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.resources.maxStorage}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.resources.maxStorage}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.resources.maxStorage}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Deployment Type</td>
                    <td className="border-b p-1 text-left"></td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.resources.customDeployment
                        ? "Base Images"
                        : "Premade"}
                      <DeploymentTooltip
                        type={
                          tiers.hacker.resources.customDeployment
                            ? "Base Images"
                            : "Premade"
                        }
                      />
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.resources.customDeployment
                        ? "Base Images"
                        : "Premade"}
                      <DeploymentTooltip
                        type={
                          tiers.pro.resources.customDeployment
                            ? "Base Images"
                            : "Premade"
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Concurrence</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.resources.concurrentVms ?? ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.resources.concurrentVms}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.resources.concurrentVms === Infinity
                        ? "Unlimited"
                        : tiers.pro.resources.concurrentVms}
                    </td>
                  </tr>

                  {/* Reports Section */}
                  <tr>
                    <td colSpan={4} className="bg-gray-100 p-1 font-medium">
                      Reports
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Public Reports</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.reports.maxPublic}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.reports.maxPublic}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.reports.maxPublic === Infinity
                        ? "Unlimited"
                        : tiers.pro.reports.maxPublic}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Private Reports</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.reports.maxPrivate}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.reports.maxPrivate}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.reports.maxPrivate === Infinity
                        ? "Unlimited"
                        : tiers.pro.reports.maxPrivate}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Collaborators</td>
                    <td className="border-b p-1 text-left"></td>
                    <td className="border-b p-1 text-left">Coming Soon</td>
                    <td className="border-b p-1 text-left">Coming Soon</td>
                  </tr>

                  {/* Operations Section */}
                  <tr>
                    <td colSpan={4} className="bg-gray-100 p-1 font-medium">
                      Operations
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">CTF</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.features.ctf ? "✓" : ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.features.ctf ? "✓" : ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.features.ctf ? "✓" : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Search Engine</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.features.searchEngine ? "✓" : ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.features.searchEngine ? "✓" : ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.features.searchEngine ? "✓" : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Shell Access</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.features.shellAccess ? "✓" : ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.features.shellAccess ? "✓" : ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.features.shellAccess ? "✓" : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">API Access</td>
                    <td className="border-b p-1 text-left">
                      {tiers.core.features.apiAccess ? "✓" : ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.hacker.features.apiAccess ? "✓" : ""}
                    </td>
                    <td className="border-b p-1 text-left">
                      {tiers.pro.features.apiAccess ? "✓" : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b p-1 border-r">Bounties</td>
                    <td className="border-b p-1 text-left"></td>
                    <td className="border-b p-1 text-left"></td>
                    <td className="border-b p-1 text-left">Coming Soon</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;

export const PearCreditsTooltip = ({ type }: { type: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const pearCreditsCount = useMemo(() => {
    return (type: string) => {
      if (type === "free") {
        return "50";
      } else if (type === "enterprise") {
        return "1000";
      }
      return "700";
    };
  }, []);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen} delayDuration={50}>
        <TooltipTrigger asChild>
          <Info
            className="mb-0.5 ml-1 inline-flex h-4 w-4 flex-shrink-0 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          <p className="max-w-[250px]">
            Current models include Claude 3.5 Sonnet and GPT4o.
            <br /> <br />
            Your PearAI Credits usage depend on your prompt input and output
            sizes. On average, this equates to around {pearCreditsCount(
              type
            )}{" "}
            requests{type === "free" && " for our current free trial"}.
            {type !== "free" && (
              <>
                <br /> <br />
                Afraid of running out of credits? You can always contact{" "}
                <a
                  className="cursor-pointer text-primary-700 transition-colors hover:text-primary-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(CONTACT_EMAIL);
                    toast.success("Email copied to clipboard!");
                  }}
                >
                  PearAI support
                </a>{" "}
                to top up and keep building!
              </>
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ModelTooltip = ({ type }: { type: "Basic" | "Advanced" }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger>
          <Info className="ml-1 inline h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>
          {type === "Basic" ? (
            <p className="max-w-[250px]">Limited access to Llama3.2 Meta</p>
          ) : (
            <p className="max-w-[250px]">
              Unlimited access to Llama3.2 Meta, limited access to
              deepseek-coder-v2 and Qwen 2.5 coder
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const getAccessLevelText = (level: 0 | 1 | 2) => {
  switch (level) {
    case 0:
      return "";
    case 1:
      return "Basic";
    case 2:
      return "Advanced";
    default:
      return "";
  }
};

const DeploymentTooltip = ({ type }: { type: "Premade" | "Base Images" }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger>
          <Info className="ml-1 inline h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>
          {type === "Premade" ? (
            <p className="max-w-[250px]">
              Access to Kali, Remnux and ParrotOS images.
            </p>
          ) : (
            <p className="max-w-[250px]">
              Customize distribution, version and desktop environment.
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

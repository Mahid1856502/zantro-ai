import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Info, ExternalLink } from "lucide-react";
import { UsageType } from "../dashboard";

type FreeTrialCardProps = {
  usage: UsageType;
  openAppQueryParams: string;
  loading: boolean;
};

const DEFAULT_OPEN_APP_CALLBACK = "pearai://pearai.pearai/auth";
const DEFAULT_FREE_TRIAL_MAX_QUOTA = 50; // Sync with "FREE_TRIAL_MAX_QUOTA" env var from server

export default function FreeTrialCard({
  usage,
  openAppQueryParams,
  loading,
}: FreeTrialCardProps) {
  return (
    <Card className="overflow-auto bg-gray-100/10 text-card-foreground">
      <div className="grid gap-4">
        <CardHeader className="flex-row justify-between pb-4">
          <CardTitle className="text-xl font-semibold">
            Subscription & Usage
          </CardTitle>
          <Badge
            variant="secondary"
            className="border-primary-800 bg-primary-800/10 px-2 py-1 text-xs text-primary-800"
          >
            Core
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between">
              <p className="font-medium">SwiftAI Credits</p>
              <p className="text-sm/6 text-muted-foreground">
                <strong>
                  {loading ? (
                    "-"
                  ) : (
                    <strong>
                      {usage?.percent_credit_used != null
                        ? `${Math.min(usage.percent_credit_used, 100)}%`
                        : "Cannot find used percentage. Please contact Swiftor support."}
                    </strong>
                  )}
                </strong>
              </p>
            </div>
            <Progress
              value={usage.percent_credit_used}
              className="mb-2 mt-2 h-2 w-full"
              indicatorColor="bg-primary-800 bg-opacity-75"
            />
            <p className="text-sm/6 text-muted-foreground">
              {loading ? "-" : Math.min(usage?.percent_credit_used ?? 0, 100)}%
              of free trial SwiftAI Credits used
            </p>
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <p className="font-medium">Current Plan</p>
              <p className="text-sm/6 text-muted-foreground">Free Trial</p>
            </div>
          </div>
          <div className="mt-8 flex justify-between space-x-4">
            <div className="hidden sm:block">
              <Button variant="outline" className="text-primary-800" asChild>
                <Link href={"https://docs.swiftor.io/api"} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Access Token
                </Link>
              </Button>
            </div>
            <Button variant="default" asChild>
              <Link href="/pricing">Subscribe Now</Link>
            </Button>
          </div>
          <div className="mt-1 flex items-center">
            <Info className="inline text-muted-foreground" size={14} />
            <p className="ml-1.5 text-xs/3 text-muted-foreground">
              API use via Access Tokens is{" "}
              <Button
                variant="link"
                asChild
                className="p-0 text-xs text-primary-800"
              >
                <Link href="https://docs.swiftor.io/api">limited</Link>
              </Button>{" "}
              in the Free Trial plan.
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

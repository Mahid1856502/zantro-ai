import DashboardPage from "@/components/dashboard";
import { getUserAndSubscription } from "@/lib/data-fetching";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Account",
  description: "Manage your account, billing, and team preferences.",
  canonical: "/account",
});

export default async function Dashboard() {
  const {
    user,
    subscription,
    redirect: redirectTo,
    openAppQueryParams,
  } = await getUserAndSubscription();

  if (redirectTo || !user) {
    return redirect(redirectTo ?? "/signin");
  }

  return (
    <DashboardPage
      subscription={subscription}
      openAppQueryParams={openAppQueryParams}
      user={user}
    />
  );
}

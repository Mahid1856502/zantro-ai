import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export default async function AuthButton() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const handleSignOut = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/");
  };

  return (
    <div className="flex items-center space-x-4">
      {error || !data?.user ? (
        <div className="m-0 inline-flex rounded-lg border p-0">
          <Link href="/signin">
            <Button
              variant="ghost"
              className="h-8 rounded-r-none border-0 px-3"
            >
              Sign in
            </Button>
          </Link>
          <div className="w-[1px] self-stretch bg-border" />
          <Link href="/signup">
            <Button
              variant="ghost"
              className="h-8 rounded-l-none border-0 px-3"
            >
              Start Hacking
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <a href="/app">
            <Button variant="outline">Dashboard</Button>
          </a>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer border border-gray-600/50">
                <AvatarImage
                  src={data.user.user_metadata.avatar_url}
                  alt={data.user.user_metadata.full_name || "User avatar"}
                />
                <AvatarFallback className="text-xs font-medium">
                  {data.user.user_metadata.full_name?.[0].toUpperCase() ||
                    data.user.email?.[0].toUpperCase() ||
                    "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border border-border/50 bg-background"
              align="center"
            >
              <DropdownMenuItem
                asChild
                className="flex cursor-pointer items-center focus:bg-secondary-300/10"
              >
                <Link href="/account">
                  <button className="flex w-full cursor-pointer items-center focus:bg-secondary-300/10">
                    <User2Icon className="mr-2 h-4 w-4" />
                    Account
                  </button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="flex cursor-pointer items-center focus:bg-secondary-300/10"
              >
                <form action={handleSignOut}>
                  <button className="flex w-full cursor-pointer items-center focus:bg-secondary-300/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}

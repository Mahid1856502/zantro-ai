"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./button";
import {
  LogIn,
  LogOut,
  Menu,
  Settings,
  SquareArrowRight,
  User2Icon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MobileMenu({
  user,
  handleSignOut,
}: {
  user: User | null;
  handleSignOut: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const MobileNavItem = ({
    href,
    onClick,
    children,
  }: {
    href: string;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <li>
      <Link
        href={href}
        className="block rounded-md py-4 text-base font-medium text-foreground"
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md hover:bg-secondary-300/10"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-[300px] flex-col justify-between sm:w-[400px]"
        >
          <div>
            <SheetHeader className="mb-4">
              <SheetTitle className="text-center">Swiftor Menu</SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile menu">
              <ul className="space-y-1">
                <div className="mb-4 space-y-4">
                  {user ? (
                    <>
                      <div className="hidden items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.user_metadata.avatar_url}
                            alt={user.user_metadata.full_name || "User avatar"}
                          />
                          <AvatarFallback>
                            {user.email?.[0].toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {user.user_metadata.full_name || user.email}
                        </span>
                      </div>
                      <a href="/app" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                      </a>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          window.location.href = "/account";
                          setIsOpen(false);
                        }}
                      >
                        <User2Icon className="mr-2 h-4 w-4" />
                        Account
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/signin" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <LogIn className="mr-2 h-4 w-4" />
                          Sign in
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className="mt-4 w-full justify-start"
                        >
                          <SquareArrowRight className="mr-2 h-4 w-4" />
                          Try Swiftor
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
                <MobileNavItem href="/" onClick={() => setIsOpen(false)}>
                  Home
                </MobileNavItem>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="resources">
                    <AccordionTrigger>Resources</AccordionTrigger>
                    <AccordionContent>
                      <ul className="ml-4 space-y-1">
                        <MobileNavItem
                          href="/about"
                          onClick={() => setIsOpen(false)}
                        >
                          About
                        </MobileNavItem>
                        <MobileNavItem
                          href="/blog"
                          onClick={() => setIsOpen(false)}
                        >
                          Blog
                        </MobileNavItem>

                        <MobileNavItem
                          href="/faq"
                          onClick={() => setIsOpen(false)}
                        >
                          FAQ
                        </MobileNavItem>
                        <MobileNavItem
                          href="/changelog"
                          onClick={() => setIsOpen(false)}
                        >
                          Changelog
                        </MobileNavItem>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <MobileNavItem
                  href="https://docs.swiftor.io"
                  onClick={() => setIsOpen(false)}
                >
                  Documentation
                </MobileNavItem>
                <MobileNavItem href="/pricing" onClick={() => setIsOpen(false)}>
                  Pricing
                </MobileNavItem>
                <MobileNavItem
                  href="https://status.swiftor.io"
                  onClick={() => setIsOpen(false)}
                >
                  Status
                </MobileNavItem>
              </ul>
            </nav>
          </div>
          <div className="width-full space-y-4 pb-6">
            <div className="width-full">
              {mounted ? (
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? (
                    <>
                      <Sun strokeWidth={1} className="h-5 w-5" />
                      Light
                    </>
                  ) : (
                    <>
                      <MoonStar strokeWidth={1} className="h-5 w-5" />
                      Dark
                    </>
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

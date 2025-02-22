"use client";
import Link from "next/link";
import { useState } from "react";
import { signup, signinWithOAuth } from "@/app/(auth)/actions";
import { Provider } from "@supabase/supabase-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GitHubLogo, GoogleLogoColored } from "@/components/ui/icons";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { signUpSchema, SignUpFormData } from "@/utils/form-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { initializeUser } from "@/services/user";

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      full_name: "",
      email: "",
      username: "",
      password: "",
    },
  });
  const router = useRouter();

  const handleSignUp = async (data: SignUpFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("full-name", data.full_name);
      formData.append("email", data.email);
      formData.append("username", data.username || "");
      formData.append("password", data.password);

      const response = await signup(formData);
      if (response?.error) {
        setErrorMessage(response.error);
      } else if (!response?.signedIn) {
        if (response?.exists) {
          toast.error("An account with this email already exists.");
          // Redirect to sign in page
          router.push("/signin");
        } else {
          // Replace the Axios call with:
          await initializeUser(data.username, data.email, data.password);
          toast.success(
            "Account created successfully. Please check your email to verify your account.",
          );
          form.reset();
        }
      } else {
        // Redirect to dashboard
        toast.info(
          "An account with this email already exists, signing you in...",
        );
        router.push("/app");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignUp = async (provider: Provider) => {
    setErrorMessage(null);
    try {
      await signinWithOAuth(provider);
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="md:pb-15 mx-auto max-w-3xl pb-10 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            <h1 className="h1">
              Ready to speed up your development experience?
            </h1>
          </div>

          <div className="mx-auto max-w-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOAuthSignUp("google");
              }}
            >
              <Button
                type="submit"
                size="lg"
                variant="authgroup"
                className="relative flex w-full items-center rounded-md px-0"
              >
                <GoogleLogoColored className="text-white mx-1 h-4 w-4 shrink-0" />
                <span>Sign up with Google</span>
              </Button>
            </form>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOAuthSignUp("github");
              }}
            >
              <div className="-mx-3 flex flex-wrap">
                <div className="mt-3 w-full px-3">
                  <Button
                    type="submit"
                    size="lg"
                    variant="authgroup"
                    className="relative flex w-full items-center rounded-md px-0"
                  >
                    <GitHubLogo className="mx-1 h-4 w-4 shrink-0 text-gray-700" />
                    <span>Sign up with Github</span>
                  </Button>
                </div>
              </div>
            </form>
            <div className="my-6 flex items-center">
              <div
                className="mr-3 grow border-t border-dotted border-gray-400"
                aria-hidden="true"
              />
              <div className="text-gray-400">Or, register with your email</div>
              <div
                className="ml-3 grow border-t border-dotted border-gray-400"
                aria-hidden="true"
              />
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignUp)}
                className="space-y-4"
              >
                <FormField
                  name="full_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="full_name">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          id="full_name"
                          placeholder="First and last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="Your @ handle"
                          {...field}
                          onBlur={async () => {
                            try {
                              const response = await axios.get(
                                `https://api.swiftor.io/@${field.value}`,
                              );
                              // Assuming the API returns { available: boolean } in the response body
                              setIsUsernameAvailable(!response.data.available);
                            } catch (error) {
                              if (axios.isAxiosError(error) && error.response) {
                                // Handle specific error responses from the server
                                setIsUsernameAvailable(false);
                              } else {
                                // Handle network errors or other issues
                                console.error(
                                  "Error checking username availability:",
                                  error,
                                );
                                setIsUsernameAvailable(null); // Reset or set to null to indicate an error occurred
                              }
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      {isUsernameAvailable === true && (
                        <p className="text-red-500">
                          This username is unavailable.
                        </p>
                      )}
                      {isUsernameAvailable === false && (
                        <p className="text-green-500">
                          This username is available.
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="helloworld@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Password (at least 8 characters)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-center text-sm text-gray-600">
                  <Link
                    href="/privacy"
                    className="underline transition duration-150 ease-in-out hover:text-gray-700 hover:no-underline"
                  >
                    Privacy Policy
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-md"
                  disabled={isSubmitting || isUsernameAvailable === true}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>

                {errorMessage && (
                  <p className="text-center text-red-500">{errorMessage}</p>
                )}
              </form>
            </Form>

            <div className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-gray-800 transition duration-150 ease-in-out hover:text-primary-800"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

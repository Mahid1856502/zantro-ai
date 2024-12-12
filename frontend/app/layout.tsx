import "./css/style.css";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { PHProvider } from "./providers";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import { ReactLenis } from "@/utils/lenis";
import { headers } from "next/headers";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the headers in the server component
  const requestHeaders = headers();
  const isAppLayout = requestHeaders.get("x-swiftor-app") === "true";

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <PHProvider>
        <body
          className={`bg-background font-sans tracking-tight text-gray-900 antialiased`}
        >
          {isAppLayout ? (
            // Only render children for /app routes without the global layout
            <div
              id="root"
              className="flex min-h-screen flex-col overflow-hidden"
            >
              {children}
            </div>
          ) : (
            // Render global layout (Header, Footer, ThemeProvider, etc.) for other routes
            <ThemeProvider
              attribute="class"
              enableSystem
              disableTransitionOnChange
              enableColorScheme
            >
              <ReactLenis root>
                <PostHogPageView />
                <div className="flex min-h-screen flex-col overflow-hidden">
                  <Header />
                  {children}
                  <Toaster position="top-right" richColors />
                  <Analytics />
                  <SpeedInsights />
                </div>
              </ReactLenis>
            </ThemeProvider>
          )}
        </body>
      </PHProvider>
    </html>
  );
}

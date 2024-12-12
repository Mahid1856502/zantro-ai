import { PricingTierData } from "@/types/pricing";
import {
  DiscordLogo,
  GitHubLogo,
  LinkedInLogo,
  TwitterLogo,
} from "@/components/ui/icons";

export const TEST_MODE_ENABLED = ["true", "True", "TRUE"].includes(
  process.env.NEXT_PUBLIC_TEST_MODE_ENABLED ?? ""
);

export const CONTACT_EMAIL = "hello@swiftor.io";

const NEXT_PUBLIC_STRIPE_WAITLIST_PRICE_ID = "price_1QQJ5WD9CcB23kLYsKGUvvEy";
const NEXT_PUBLIC_STRIPE_WAITLIST_PRICE_ID_TEST =
  "price_1QQJ5WD9CcB23kLYsKGUvvEy";
const NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID = "price_1QQJ5WD9CcB23kLYsKGUvvEy";
const NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID_TEST =
  "price_1QQJ5WD9CcB23kLYsKGUvvEy";

const NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID =
  "price_1QQJUbD9CcB23kLYNzBjCzDM";
const NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID_TEST =
  "price_1QQJUbD9CcB23kLYNzBjCzDM";

const NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID = "price_1QQJ5WD9CcB23kLYsKGUvvEy";
const NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID_TEST =
  "price_1QQJ5WD9CcB23kLYsKGUvvEy";

export const STRIPE_PRICE_IDS = {
  WAITLIST: TEST_MODE_ENABLED
    ? NEXT_PUBLIC_STRIPE_WAITLIST_PRICE_ID_TEST
    : NEXT_PUBLIC_STRIPE_WAITLIST_PRICE_ID,
  MONTHLY: TEST_MODE_ENABLED
    ? NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID_TEST
    : NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
  PRO_MONTHLY: TEST_MODE_ENABLED
    ? NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID_TEST
    : NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID,
  ANNUAL: TEST_MODE_ENABLED
    ? NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID_TEST
    : NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID,
};

export const PRICING_TIERS: {
  standard: PricingTierData[];
  enterprise: PricingTierData[];
} = {
  standard: [
    {
      title: "Core",
      price: "0",
      description:
        "You can download PearAI directly, and use our free trial, or your own API key 🤓",
      isFree: true,
      index: 0,
      features: [
        "Basic workspace",
        "Limited access to Swiftor AI",
        "4 private reports and hosting",
        "Notes and Draw component",
      ],
    },
    {
      title: "Hacker",
      price: "14.99",
      prevPrice: "20",
      description:
        "Get the monthly subscription, and we'll take care of you. 😎",
      features: [
        "Access to premade vm images",
        "Unlimited basic responses from AI chat",
        "Access to AI Search Engine",
        "Monthly CTF Challenges",
        "Code generation & completion",
      ],
      buttonText: "Get Started",
      priceId: STRIPE_PRICE_IDS.MONTHLY,
      index: 1,
    },
    {
      title: "1337x Engineer",
      price: "30",
      prevPrice: "40",
      description:
        "Pay one lump sum yearly, and you'll be treated like our VIP! 🤩",
      features: [
        "Unlimited reports",
        "Customize base vm images",
        "Advanced report templates and themes",
        "Shell & API access",
        "Unlimited AI generation",
        "Full privacy: zero data retention policy",
      ],
      buttonText: "Get Started",
      priceId: STRIPE_PRICE_IDS.PRO_MONTHLY,
      index: 2,
    },
  ],
  enterprise: [
    {
      title: "Core",
      price: "0",
      description:
        "You can download PearAI directly, and use our free trial, or your own API key 🤓",
      isFree: true,
      index: 0,
      features: [
        "Basic workspace",
        "Limited access to Swiftor AI",
        "4 private reports and hosting",
        "Notes and Draw component",
      ],
    },
    {
      title: "Hacker",
      price: "14.99",
      prevPrice: "20",
      description:
        "Get the monthly subscription, and we'll take care of you. 😎",
      features: [
        "Access to premade vm images",
        "Unlimited basic responses from AI chat",
        "Access to AI Search Engine",
        "Monthly CTF Challenges",
        "Code generation & completion",
      ],
      buttonText: "Get Started",
      priceId: STRIPE_PRICE_IDS.MONTHLY,
      index: 1,
    },
    {
      title: "1337x Engineer",
      price: "30",
      prevPrice: "40",
      description:
        "Pay one lump sum yearly, and you'll be treated like our VIP! 🤩",
      features: [
        "Unlimited reports",
        "Customize base vm images",
        "Advanced report templates and themes",
        "Shell & API access",
        "Unlimited AI generation",
        "Full privacy: zero data retention policy",
      ],
      buttonText: "Get Started",
      priceId: STRIPE_PRICE_IDS.ANNUAL,
      index: 2,
    },
  ],
  // enterprise: [
  //   {
  //     title: "Monthly",
  //     price: "32",
  //     prevPrice: "35",
  //     description:
  //       "Get the best deal for your business and increase the productivity of your team.",
  //     features: [
  //       "custom-enterprise",
  //       "Full privacy: zero data retention policy with Anthropic",
  //       "Centralized Billing and Dashboard",
  //       "Direct customer support by the founders and contributors",
  //       "Private Discord Channel",
  //     ],
  //     buttonText: "Get Started",
  //     priceId: STRIPE_PRICE_IDS.MONTHLY,
  //     index: 0,
  //   },
  //   {
  //     title: "Yearly",
  //     price: "27",
  //     prevPrice: "30",
  //     description: "Pay one lump sum yearly for our highest priority tier.",
  //     features: ["Everything from monthly", "Priority Customer Support"],
  //     buttonText: "Get Started",
  //     priceId: STRIPE_PRICE_IDS.ANNUAL,
  //     index: 1,
  //   },
  // ],
};

export const footerSections = [
  {
    title: "Company",
    links: [
      {
        text: "About Us",
        href: "/about",
      },
      {
        text: "Privacy Policy",
        href: "/privacy",
      },
      {
        text: "Terms of Service",
        href: "/terms-of-service",
      },
    ],
  },
  {
    title: "Product",
    links: [
      {
        text: "Documentation",
        href: "https://docs.swiftor.io",
      },
      {
        text: "Blog",
        href: "/blog",
      },

      {
        text: "Changelog",
        href: "/changelog",
      },
    ],
  },
  {
    title: "Contact / Support",
    links: [
      {
        text: "FAQ",
        href: "/faq",
      },
      {
        text: "Legal",
        href: "mailto:legal@swiftor.io",
      },
      {
        text: "Report Abuse",
        href: "mailto:abuse@swiftor.io",
      },
    ],
  },
  {
    title: "Handy Links",
    links: [
      {
        text: "Docker Images",
        href: "/images",
      },
      {
        text: "Status",
        href: "https://status.swiftor.io",
      },
      {
        text: "Brand kit",
        href: "/brandkit",
      },
    ],
  },
];

export const socialMediaLinks = [
  {
    icon: DiscordLogo,
    link: "https://discord.com/invite/swiftor.io",
  },
  {
    icon: GitHubLogo,
    link: "https://github.com/swiftor.io",
  },
  {
    icon: TwitterLogo,
    link: "https://x.com/swiftor.io",
  },
];

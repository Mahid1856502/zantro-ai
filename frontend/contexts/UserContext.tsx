"use client"; // Add this line at the top of the file

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchUserDetails } from "@/services/user";

interface Resources {
  maxVCPUs: number | null;
  maxMemory: number | null;
  maxStorage: number;
  concurrentVms: number | null;
  customDeployment: boolean;
}

interface Reports {
  maxPublic: number;
  maxPrivate: number;
}

interface Features {
  interpreter: boolean;
  chatEnabled: boolean;
  chatLevel: 0 | 1 | 2;  // 0: None, 1: Basic, 2: Advanced
  codeCompletionEnabled: boolean;
  codeCompletionLevel: 0 | 1 | 2;
  codeGenerationEnabled: boolean;
  codeGenerationLevel: 0 | 1 | 2;
  ctf: boolean;
  shellAccess: boolean;
  apiAccess: boolean;
  searchEngine: boolean;
}

interface Tier {
  name: string;
  resources: Resources;
  reports: Reports;
  features: Features;
  chipColor: string;
  chipIcon: string;
}

interface UserContextType {
  username: string | null;
  plan: string | null;
  roles: string[] | null;
  pfp: string | null;
  isLoading: boolean;
  error: Error | null;
  tier: Tier | null;
}

export const tiers: { [key: string]: Tier } = {
  core: {
    name: "Core",
    resources: {
      maxVCPUs: null,
      maxMemory: null,
      maxStorage: 2,
      concurrentVms: null,
      customDeployment: false
    },
    reports: {
      maxPublic: 2,
      maxPrivate: 4,
    },
    features: {
      interpreter: false,
      chatEnabled: true,
      chatLevel: 1,  // Basic
      codeCompletionEnabled: true,
      codeCompletionLevel: 1,
      codeGenerationEnabled: true,
      codeGenerationLevel: 1,
      ctf: true,
      shellAccess: false,
      apiAccess: false,
      searchEngine: false
    },
    chipColor: "#424b57",
    chipIcon: "pi pi-globe",
  },
  hacker: {
    name: "Hacker",
    resources: {
      maxVCPUs: 4,
      maxMemory: 8,
      maxStorage: 30,
      concurrentVms: 3,
      customDeployment: false
    },
    reports: {
      maxPublic: 10,
      maxPrivate: 25,
    },
    features: {
      interpreter: true,
      chatEnabled: true,
      chatLevel: 2,  // Advanced
      codeCompletionEnabled: true,
      codeCompletionLevel: 2,
      codeGenerationEnabled: true,
      codeGenerationLevel: 2,
      ctf: true,
      shellAccess: true,
      apiAccess: false,
      searchEngine: true
    },
    chipColor: "#04ae8c",
    chipIcon: "pi pi-star",
  },
  pro: {
    name: "1337",
    resources: {
      maxVCPUs: 8,
      maxMemory: 16,
      maxStorage: 150,
      concurrentVms: Infinity,
      customDeployment: true
    },
    reports: {
      maxPublic: Infinity,
      maxPrivate: Infinity,
    },
    features: {
      interpreter: true,
      chatEnabled: true,
      chatLevel: 2,  // Advanced
      codeCompletionEnabled: true,
      codeCompletionLevel: 2,
      codeGenerationEnabled: true,
      codeGenerationLevel: 2,
      ctf: true,
      shellAccess: true,
      apiAccess: true,
      searchEngine: true
    },
    chipColor: "#631297",
    chipIcon: "pi pi-sparkles",
  },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userDetails, setUserDetails] = useState<UserContextType>({
    username: null,
    plan: null,
    roles: null,
    pfp: null,
    isLoading: true,
    error: null,
    tier: null,
  });

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const data = await fetchUserDetails();
        const userTier = tiers[data.plan as keyof typeof tiers] || null;
        setUserDetails({
          username: data.username,
          plan: data.plan,
          roles: data.roles,
          pfp: `${process.env.NEXT_PUBLIC_SWIFTOR_SERVER_URL}/@${data.username}/pfp`,
          isLoading: false,
          error: null,
          tier: userTier,
        });
      } catch (error) {
        setUserDetails((prev) => ({
          ...prev,
          isLoading: true,
          error:
            error instanceof Error
              ? error
              : new Error("An unknown error occurred"),
        }));
      }
    };

    loadUserDetails();
  }, []);

  return (
    <UserContext.Provider value={userDetails}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

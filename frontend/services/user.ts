"use server";
import { createClient } from "@/utils/supabase/server";

async function getToken() {
  const supabase = createClient();
  const { data: sessionData } = await supabase.auth.getSession();
  return sessionData?.session?.access_token || null;
}

export async function fetchUserDetails() {
  const token = await getToken();
  if (!token) {
    throw new Error("Failed to retrieve access token");
  }

  const response = await fetch(`${process.env.SWIFTOR_SERVER_URL}/init`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(
      `HTTP error! status: ${response.status}. Error: ${errorBody?.error}`,
    );
  }

  const data = await response.json();
  return data; // This will return the JSON object containing user details
}

// Updated function to initialize user
export async function initializeUser(
  username: string | undefined,
  email: string,
  password: string,
) {

  // If username is undefined, we'll let the server handle it (it might generate a default username)
  const response = await fetch(`${process.env.SWIFTOR_SERVER_URL}/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(
      `HTTP error! status: ${response.status}. Error: ${errorBody?.error}`,
    );
  }

  return await response.json();
}

export async function fetchNotifications() {
  const token = await getToken();
  if (!token) {
    throw new Error("Failed to retrieve access token");
  }

  const response = await fetch(
    `${process.env.SWIFTOR_SERVER_URL}/notifications`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorBody = await response.json();
      errorMessage += `. Error: ${errorBody?.error}`;
    } catch {
      // If response is not JSON, try to get text content
      const textError = await response.text();
      errorMessage += `. Error: ${textError}`;
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}

export async function markNotificationAsRead(messageId: string) {
  const token = await getToken();
  if (!token) {
    throw new Error("Failed to retrieve access token");
  }

  try {
    const response = await fetch(
      `${process.env.SWIFTOR_SERVER_URL}/notifications/read`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message_id: messageId,
        }),
      },
    );

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}. Error: ${
          errorBody?.detail || errorBody?.message || "Unknown error"
        }`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

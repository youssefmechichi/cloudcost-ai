const API_URL = "http://localhost:3000";

export async function signup(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Signup failed");
  }

  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Login error:", data);
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function getMySubscription(token: string) {
  const res = await fetch(`${API_URL}/subscriptions/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch subscription");
  }

  return res.json();
}
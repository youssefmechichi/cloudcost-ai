const API_URL = process.env.NEXT_PUBLIC_API_URL!;

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

export async function getBillingSummary(token: string) {
  const response = await fetch(
    `${API_URL}/billing/summary`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch billing summary");
  }

  return response.json();
}

export async function getBillingRecords(token: string) {
  const response = await fetch(
    `${API_URL}/billing/records`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch billing records");
  }

  return response.json();
}

export async function uploadBillingCsv(token: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/billing/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to upload billing CSV");
  }

  return data;
}

export async function getMonthlyTrends(token: string) {
  const response = await fetch(`${API_URL}/billing/monthly-trends`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch monthly trends");
  }

  return response.json();
}

export async function getBillingAnomalies(token: string) {
  const response = await fetch(`${API_URL}/billing/anomalies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch billing anomalies");
  }

  return response.json();
}

export async function getBillingRecommendations(token: string) {
  const response = await fetch(`${API_URL}/billing/recommendations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch billing recommendations");
  }

  return response.json();
}

export async function getBillingInsights(token: string) {
  const response = await fetch(`${API_URL}/billing/insights`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch billing insights");
  }

  return response.json();
}

export async function askAiAdvisor(
  token: string,
  message: string,
) {
  const response = await fetch(
    `${API_URL}/billing/ai-chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    },
  );

  if (!response.ok) {
    throw new Error("AI advisor request failed");
  }

  return response.json();
}

export async function createStripeCheckout(token: string) {
  const response = await fetch(`${API_URL}/stripe/checkout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create Stripe checkout session");
  }

  return response.json();
}

export async function createBillingPortal(
  token: string,
) {
  const response = await fetch(
    `${API_URL}/stripe/billing-portal`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create billing portal session",
    );
  }

  return response.json();
}
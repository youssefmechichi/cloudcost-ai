"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { createStripeCheckout, getMySubscription, createBillingPortal } from "@/lib/api";
import { Check } from "lucide-react";

function getTokenFromCookies() {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");

    if (name === "token") {
      return value;
    }
  }

  return null;
}
export default function PricingPage() {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getTokenFromCookies();

    if (!token) {
      return;
    }

    getMySubscription(token).then(setSubscription);
  }, []);

  const isPro =
    subscription?.plan === "PRO" &&
    subscription?.status === "ACTIVE";

  async function handleUpgrade() {
    const token = getTokenFromCookies();

    if (!token) {
      setError("You must be logged in to upgrade.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await createStripeCheckout(token);

      window.location.href = data.url;
    } catch {
      setError("Unable to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleManageBilling() {
  const token = getTokenFromCookies();

    if (!token) {
        setError("You must be logged in to manage billing.");
        return;
    }

    try {
        setLoading(true);
        setError("");

        const data = await createBillingPortal(token);

        window.location.href = data.url;
    } catch {
        setError("Unable to open billing portal.");
    } finally {
        setLoading(false);
    }
    }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-slate-950">Pricing</h1>

      <p className="mt-2 text-slate-500">
        Choose the plan that fits your cloud cost optimization needs.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Free</h2>

          <p className="mt-2 text-slate-500">
            For individuals testing basic FinOps visibility.
          </p>

          <p className="mt-6 text-4xl font-bold">
            €0
            <span className="text-base font-normal text-slate-500">
              /month
            </span>
          </p>

          <ul className="mt-6 space-y-3 text-slate-700">
            <li className="flex gap-2">
              <Check className="text-green-600" size={20} />
              Manual CSV uploads
            </li>

            <li className="flex gap-2">
              <Check className="text-green-600" size={20} />
              Basic dashboard
            </li>

            <li className="flex gap-2">
              <Check className="text-green-600" size={20} />
              Billing history
            </li>

            <li className="flex gap-2">
              <Check className="text-green-600" size={20} />
              Monthly trends
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-indigo-600 bg-white p-6 shadow-md">
          <div className="mb-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
            Recommended
          </div>

          <h2 className="text-2xl font-bold">Pro AI</h2>

          <p className="mt-2 text-slate-500">
            For teams that want AI-powered cloud cost intelligence.
          </p>

          <p className="mt-6 text-4xl font-bold">
            €19.99
            <span className="text-base font-normal text-slate-500">
              /month
            </span>
          </p>

          <ul className="mt-6 space-y-3 text-slate-700">
            <li className="flex gap-2">
              <Check className="text-green-600" size={20} />
              Everything in Free
            </li>

            <li className="flex gap-2">
              <Check className="text-green-600" size={20} />
              AI cost advisor
            </li>

            <li className="flex gap-2">
              <Check className="text-green-600" size={20} />
              Anomaly detection
            </li>

            <li className="flex gap-2">
              <Check className="text-green-600" size={20} />
              Forecasting
            </li>

            <li className="flex gap-2">
              <Check className="text-green-600" size={20} />
              Optimization recommendations
            </li>
          </ul>

            {isPro ? (
            <button
                onClick={handleManageBilling}
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-slate-950 px-5 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
                {loading ? "Opening portal..." : "Manage Billing"}
            </button>
            ) : (
            <button
                onClick={handleUpgrade}
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
                {loading ? "Redirecting..." : "Upgrade to Pro AI"}
            </button>
            )}

          {error && (
            <p className="mt-4 text-sm text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
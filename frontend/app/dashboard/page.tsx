"use client";

import { useEffect, useState } from "react";
import { getMySubscription } from "@/lib/api";
import { useRouter } from "next/navigation";

type Subscription = {
  organizationId: string;
  organizationName: string;
  plan: string;
  status: string;
  canUseAI: boolean;
};

export default function DashboardPage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    getMySubscription(token)
      .then(setSubscription)
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  if (!subscription) {
    return <main className="p-8">Loading dashboard...</main>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CloudCost AI</h1>
          <p className="text-gray-800">FinOps SaaS Dashboard</p>
        </div>

        <button
          onClick={logout}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-700">Organization</p>
          <h2 className="mt-2 text-xl font-semibold">
            {subscription.organizationName}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-700">Current Plan</p>
          <h2 className="mt-2 text-xl font-semibold">{subscription.plan}</h2>
          <p className="text-sm text-gray-700">{subscription.status}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-700">AI Advisor Access</p>
          <h2 className="mt-2 text-xl font-semibold">
            {subscription.canUseAI ? "Enabled" : "Disabled"}
          </h2>
          <p className="text-sm text-gray-700">
            {subscription.canUseAI
              ? "You can use AI cost recommendations."
              : "Upgrade to PRO to unlock AI insights."}
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Cost Overview</h2>
        <p className="mt-2 text-gray-800">
          Billing data, anomaly detection and AI recommendations will appear here.
        </p>
      </section>
    </main>
  );
}
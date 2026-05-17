"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { getMySubscription } from "@/lib/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type Subscription = {
  organizationId: string;
  organizationName: string;
  plan: string;
  status: string;
  canUseAI: boolean;
};

const chartData = [
  { month: "Jan", cost: 400 },
  { month: "Feb", cost: 300 },
  { month: "Mar", cost: 500 },
  { month: "Apr", cost: 700 },
  { month: "May", cost: 600 },
];

const serviceData = [
  { service: "Compute", cost: 320 },
  { service: "Cloud SQL", cost: 210 },
  { service: "Storage", cost: 90 },
  { service: "BigQuery", cost: 160 },
];

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

export default function DashboardPage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const token = getTokenFromCookies();

    if (!token) {
      router.push("/login");
      return;
    }

    getMySubscription(token)
      .then(setSubscription)
      .catch(() => {
        document.cookie = "token=; Max-Age=0; path=/";
        router.push("/login");
      });
  }, [router]);

  function logout() {
    document.cookie = "token=; Max-Age=0; path=/";
    router.push("/login");
  }

  if (!subscription) {
    return (
      <DashboardLayout>
        <p>Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CloudCost AI</h1>
          <p className="text-zinc-400">
            FinOps SaaS Dashboard
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-lg bg-white px-4 py-2 text-black"
        >
          Logout
        </button>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-md">
          <p className="text-sm text-zinc-400">
            Organization
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            {subscription.organizationName}
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-md">
          <p className="text-sm text-zinc-400">
            Current Plan
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            {subscription.plan}
          </h2>

          <p className="text-sm text-zinc-500">
            {subscription.status}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-md">
          <p className="text-sm text-zinc-400">
            AI Advisor Access
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            {subscription.canUseAI ? "Enabled" : "Disabled"}
          </h2>

          <p className="text-sm text-zinc-500">
            {subscription.canUseAI
              ? "AI recommendations enabled."
              : "Upgrade to PRO to unlock AI insights."}
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-md">
          <p className="text-sm text-zinc-400">Total Spend</p>
          <h2 className="mt-2 text-2xl font-bold">$780</h2>
          <p className="text-sm text-red-400">+18% vs last month</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-md">
          <p className="text-sm text-zinc-400">Anomalies</p>
          <h2 className="mt-2 text-2xl font-bold">2</h2>
          <p className="text-sm text-orange-400">Requires review</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-md">
          <p className="text-sm text-zinc-400">Potential Savings</p>
          <h2 className="mt-2 text-2xl font-bold">$126</h2>
          <p className="text-sm text-green-400">Estimated monthly</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-md">
          <p className="text-sm text-zinc-400">Forecast</p>
          <h2 className="mt-2 text-2xl font-bold">$910</h2>
          <p className="text-sm text-zinc-400">Projected next month</p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-md">
          <h2 className="text-xl font-semibold">
            Monthly Cost Trend
          </h2>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="#fff"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-md">
          <h2 className="text-xl font-semibold">
            Cost by Service
          </h2>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceData}>
                <XAxis dataKey="service" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="cost" fill="#fff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-orange-900 bg-orange-950 p-6 shadow-md">
          <h2 className="text-xl font-semibold">
            Detected Anomaly
          </h2>

          <p className="mt-3 text-zinc-300">
            Cloud SQL costs increased by 42% in March compared to the previous average.
          </p>

          <p className="mt-2 text-sm text-orange-400">
            Suggested action: review database storage growth and query volume.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-900 bg-blue-950 p-6 shadow-md">
          <h2 className="text-xl font-semibold">
            AI Recommendation Preview
          </h2>

          <p className="mt-3 text-zinc-300">
            You may save approximately $126/month by resizing underutilized compute workloads.
          </p>

          <p className="mt-2 text-sm text-blue-400">
            Full AI recommendations available on the PRO plan.
          </p>
        </div>
      </section>
    </DashboardLayout>
  );
}
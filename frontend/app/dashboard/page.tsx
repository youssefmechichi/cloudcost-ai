"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  getMySubscription,
  getBillingInsights,
} from "@/lib/api";

type ServiceCost = {
  service: string;
  cost: number;
};

type Recommendation = {
  estimatedSavings: number;
  description: string;
};

type Insights = {
  summary: {
    totalSpend: number;
    services: ServiceCost[];
  };
  monthlyTrends: {
    month: string;
    cost: number;
  }[];
  anomalies: {
    service: string;
    cost: number;
    currency: string;
    reason: string;
  }[];
  recommendations: Recommendation[];
  forecast: {
    forecast: number;
  };
};

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
  const [insights, setInsights] = useState<Insights | null>(null);

  useEffect(() => {
    const token = getTokenFromCookies();

    if (!token) {
      router.push("/login");
      return;
    }

    Promise.all([
      getMySubscription(token),
      getBillingInsights(token),
    ])
      .then(([subscriptionData, insightsData]) => {
        setSubscription(subscriptionData);
        setInsights(insightsData);
      })
      .catch((error) => {
      console.error("Dashboard load failed:", error);
    });
  }, [router]);

  function logout() {
    document.cookie = "token=; Max-Age=0; path=/";
    router.push("/login");
  }

  if (!subscription || !insights) {
    return (
      <DashboardLayout>
        <p className="text-slate-500">Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  const billingSummary = insights.summary;
  const isPro =
  subscription.plan === "PRO" &&
  subscription.status === "ACTIVE";
  const monthlyTrends = insights.monthlyTrends || [];
  const anomalies = insights.anomalies || [];
  const recommendations = insights.recommendations || [];
  const forecast = insights.forecast;

  const serviceData = billingSummary?.services || [];
  const chartData = monthlyTrends;


  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            CloudCost AI
          </h1>
           {isPro ? (
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
              PRO
            </span>
          ) : (
            <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700">
              FREE
            </span>
          )}
          <p className="text-slate-500">FinOps SaaS Dashboard</p>
        </div>

        <button
          onClick={logout}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
        >
          Logout
        </button>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Organization</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            {subscription.organizationName}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Current Plan</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            {subscription.plan}
          </h2>
          <p className="text-sm text-slate-500">{subscription.status}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">AI Advisor Access</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            {subscription.canUseAI ? "Enabled" : "Disabled"}
          </h2>
          <p className="text-sm text-slate-500">
            {subscription.canUseAI
              ? "AI recommendations enabled."
              : "Upgrade to PRO to unlock AI insights."}
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Spend</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            ${billingSummary?.totalSpend.toFixed(2)}
          </h2>
          <p className="text-sm text-red-500">+18% vs last month</p>
        </div>

        <div className={`relative rounded-2xl border p-6 shadow-sm ${
            isPro
              ? "border-slate-200 bg-white"
              : "border-slate-200 bg-slate-100 opacity-60"
          }`}>
          <p className="text-sm text-slate-500">Anomalies</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">{anomalies.length}</h2>
          <p className="text-sm text-orange-500">Requires review</p>
          {!isPro && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
            <a
              href="/pricing"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
            >
              Upgrade to Pro
            </a>
          </div>
        )}
        </div>

        <div className={`relative rounded-2xl border p-6 shadow-sm ${
            isPro
              ? "border-slate-200 bg-white"
              : "border-slate-200 bg-slate-100 opacity-60"
          }`}>
          <p className="text-sm text-slate-500">Potential Savings</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
          $
          {recommendations
            .reduce((sum: number, rec: Recommendation) => sum + rec.estimatedSavings, 0)
            .toFixed(0)}
        </h2>
          <p className="text-sm text-green-600">
          Based on {recommendations.length} recommendation(s)
        </p>
        {!isPro && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
            <a
              href="/pricing"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
            >
              Upgrade to Pro
            </a>
          </div>
        )}
        </div>

        <div className={`relative rounded-2xl border p-6 shadow-sm ${
            isPro
              ? "border-slate-200 bg-white"
              : "border-slate-200 bg-slate-100 opacity-60"
          }`}>
          <p className="text-sm text-slate-500">Forecast</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">${forecast.forecast}</h2>
          {!isPro && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
            <a
              href="/pricing"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
            >
              Upgrade to Pro
            </a>
          </div>
        )}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            Monthly Cost Trend
          </h2>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="#4f46e5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            Cost by Service
          </h2>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceData}>
                <XAxis dataKey="service" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="cost" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            Detected Anomaly
          </h2>

          {anomalies.length > 0 ? (
          <>
            <p className="mt-3 text-slate-700">
              {anomalies[0].service} generated an unusual cost of{" "}
              {anomalies[0].cost} {anomalies[0].currency}.
            </p>

            <p className="mt-2 text-sm text-orange-600">
              {anomalies[0].reason}
            </p>
          </>
        ) : (
          <p className="mt-3 text-slate-700">
            No abnormal spending detected in your current billing records.
          </p>
        )}

          <p className="mt-2 text-sm text-orange-600">
            Suggested action: review database storage growth and query volume.
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            AI Recommendation Preview
          </h2>

          {recommendations.length > 0 ? (
  <>
              <p className="mt-3 text-slate-700">
                {recommendations[0].description}
              </p>

              <p className="mt-2 text-sm text-indigo-600">
                Estimated savings: ${recommendations[0].estimatedSavings}/month
              </p>
            </>
          ) : (
            <p className="mt-3 text-slate-700">
              No optimization recommendation available yet.
            </p>
          )}

          <p className="mt-2 text-sm text-indigo-600">
            Full AI recommendations available on the PRO plan.
          </p>
        </div>
      </section>
    </DashboardLayout>
  );
}
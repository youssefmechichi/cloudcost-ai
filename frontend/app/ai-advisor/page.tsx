"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Bot } from "lucide-react";
import {
  askAiAdvisor,
  getBillingInsights,
} from "@/lib/api";
import { useRouter } from "next/navigation";

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

export default function AiAdvisorPage() {
  const router = useRouter();
  const [insights, setInsights] = useState<any>(null);

  useEffect(() => {
    const token = getTokenFromCookies();

    if (!token) {
      router.push("/login");
      return;
    }

    getBillingInsights(token)
      .then(setInsights)
      .catch(() => {
        document.cookie = "token=; Max-Age=0; path=/";
        router.push("/login");
      });
  }, [router]);

  const recommendations = insights?.recommendations || [];
  const anomalies = insights?.anomalies || [];
  const forecast = insights?.forecast;
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAskAdvisor() {
  const token = getTokenFromCookies();

  if (!token || !question.trim()) {
    return;
  }

  try {
    setLoading(true);

    const data = await askAiAdvisor(
      token,
      question,
    );

    setAiResponse(data.response);
  } catch {
    setAiResponse(
      "Failed to generate AI response.",
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">AI Cost Advisor</h1>

      <p className="mt-2 text-slate-500">
        Review intelligent cost insights generated from your billing data.
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          Ask AI Advisor
        </h2>

        <p className="mt-2 text-slate-500">
          Ask questions about your cloud costs,
          anomalies, or optimization opportunities.
        </p>

        <div className="mt-4 flex gap-3">
          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Why are my cloud costs increasing?"
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
          />

          <button
            onClick={handleAskAdvisor}
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        {aiResponse && (
          <div className="mt-6 rounded-xl bg-indigo-50 p-4">
            <p className="text-slate-800">
              {aiResponse}
            </p>
          </div>
        )}
      </div>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3 rounded-xl bg-indigo-50 p-4">
          <Bot className="text-indigo-600" />

          <div>
            <h2 className="font-semibold text-slate-950">
              Advisor Summary
            </h2>

            <p className="mt-2 text-slate-700">
              {recommendations.length > 0
                ? recommendations[0].description
                : "No optimization recommendation available yet. Upload more billing data to improve insights."}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Recommendations</p>
            <h3 className="mt-2 text-2xl font-bold">
              {recommendations.length}
            </h3>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Anomalies</p>
            <h3 className="mt-2 text-2xl font-bold">{anomalies.length}</h3>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Forecast</p>
            <h3 className="mt-2 text-2xl font-bold">
              ${forecast?.forecast || 0}
            </h3>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {recommendations.map((rec: any, index: number) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 p-4"
            >
              <h3 className="font-semibold">{rec.title}</h3>
              <p className="mt-1 text-slate-600">{rec.description}</p>
              <p className="mt-2 text-sm text-green-600">
                Estimated savings: ${rec.estimatedSavings}/month
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
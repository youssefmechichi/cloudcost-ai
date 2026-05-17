import { DashboardLayout } from "@/components/dashboard-layout";
import { Bot } from "lucide-react";

export default function AiAdvisorPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">
        AI Cost Advisor
      </h1>

      <p className="mt-2 text-slate-500">
        Ask questions about your cloud spending and optimization opportunities.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3 rounded-xl bg-slate-100 p-4">
          <Bot className="text-indigo-600" />

          <p className="text-slate-700">
            Your Cloud SQL cost increased by 42% in March. This may be caused by
            increased query volume or storage autoscaling.
          </p>
        </div>

        <div className="mt-6 flex gap-2">
          <input
            className="flex-1 rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-indigo-500"
            placeholder="Ask: Why did my bill increase this month?"
          />

          <button className="rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700">
            Ask AI
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
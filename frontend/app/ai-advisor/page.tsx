import { DashboardLayout } from "@/components/dashboard-layout";
import { Bot } from "lucide-react";

export default function AiAdvisorPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">
        AI Cost Advisor
      </h1>

      <p className="mt-2 text-zinc-400">
        Ask questions about your cloud spending and optimization opportunities.
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-md">
        <div className="flex items-start gap-3 rounded-xl bg-zinc-800 p-4">
          <Bot />

          <p className="text-zinc-300">
            Your Cloud SQL cost increased by 42% in March. This may be caused by
            increased query volume or storage autoscaling.
          </p>
        </div>

        <div className="mt-6 flex gap-2">
          <input
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            placeholder="Ask: Why did my bill increase this month?"
          />

          <button className="rounded-lg bg-white px-5 py-2 text-black">
            Ask AI
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
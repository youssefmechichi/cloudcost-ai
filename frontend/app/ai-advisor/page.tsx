import { DashboardLayout } from "@/components/dashboard-layout";
import { Bot } from "lucide-react";

export default function AiAdvisorPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">AI Cost Advisor</h1>
      <p className="mt-2 text-gray-700">
        Ask questions about your cloud costs and optimization opportunities.
      </p>

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-md">
        <div className="flex items-start gap-3 rounded-xl bg-gray-100 p-4">
          <Bot />
          <p>
            Your Cloud SQL cost increased by 42% in March. This may be caused by
            increased storage usage or higher query volume.
          </p>
        </div>

        <div className="mt-6 flex gap-2">
          <input
            className="flex-1 rounded-lg border p-3"
            placeholder="Ask: Why did my bill increase this month?"
          />
          <button className="rounded-lg bg-black px-5 py-2 text-white">
            Ask AI
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
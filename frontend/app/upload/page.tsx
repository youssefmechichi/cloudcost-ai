import { DashboardLayout } from "@/components/dashboard-layout";
import { Upload } from "lucide-react";

export default function UploadPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">
        Upload Invoices
      </h1>

      <p className="mt-2 text-zinc-400">
        Upload your cloud billing files to analyze costs.
      </p>

      <div className="mt-8 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 p-10 text-center shadow-md">
        <Upload className="mx-auto mb-4" size={40} />

        <h2 className="text-xl font-semibold">
          Drop your CSV or PDF invoice here
        </h2>

        <p className="mt-2 text-zinc-400">
          Supported formats: CSV, PDF
        </p>

        <button className="mt-6 rounded-lg bg-white px-5 py-2 text-black">
          Choose File
        </button>
      </div>
    </DashboardLayout>
  );
}
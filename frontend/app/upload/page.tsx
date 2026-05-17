import { DashboardLayout } from "@/components/dashboard-layout";
import { Upload } from "lucide-react";

export default function UploadPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Upload Invoices</h1>
      <p className="mt-2 text-gray-700">
        Upload your cloud billing files to analyze costs and detect anomalies.
      </p>

      <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-md">
        <Upload className="mx-auto mb-4" size={40} />
        <h2 className="text-xl font-semibold">Drop your CSV or PDF invoice here</h2>
        <p className="mt-2 text-gray-600">
          Supported formats: CSV, PDF. Real processing will be added next.
        </p>

        <button className="mt-6 rounded-lg bg-black px-5 py-2 text-white">
          Choose File
        </button>
      </div>
    </DashboardLayout>
  );
}
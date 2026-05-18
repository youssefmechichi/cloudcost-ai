"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Upload } from "lucide-react";
import { uploadBillingCsv } from "@/lib/api";

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

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload() {
    setMessage("");

    const token = getTokenFromCookies();

    if (!token) {
      setMessage("You must be logged in to upload billing data.");
      return;
    }

    if (!file) {
      setMessage("Please select a CSV file first.");
      return;
    }

    try {
      setIsUploading(true);

      const result = await uploadBillingCsv(token, file);

      setMessage(`Upload successful. Inserted ${result.inserted} billing records.`);
      setFile(null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Upload Invoices</h1>

      <p className="mt-2 text-slate-500">
        Upload your cloud billing CSV file to analyze costs.
      </p>

      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <Upload className="mx-auto mb-4 text-slate-600" size={40} />

        <h2 className="text-xl font-semibold">
          Upload your billing CSV
        </h2>

        <p className="mt-2 text-slate-500">
          Required columns: service, cost, currency, usageDate
        </p>

        <input
          className="mt-6 block w-full rounded-xl border border-slate-300 p-3"
          type="file"
          accept=".csv"
          onChange={(event) => {
            setFile(event.target.files?.[0] || null);
            setMessage("");
          }}
        />

        {file && (
          <p className="mt-3 text-sm text-slate-600">
            Selected file: {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="mt-6 rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? "Uploading..." : "Upload CSV"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-slate-700">
            {message}
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}
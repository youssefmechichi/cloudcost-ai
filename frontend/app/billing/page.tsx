"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { getBillingRecords } from "@/lib/api";
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

type BillingRecord = {
  id: string;
  service: string;
  cost: number;
  currency: string;
  usageDate: string;
};

export default function BillingPage() {
  const router = useRouter();
  const [records, setRecords] = useState<BillingRecord[]>([]);

  useEffect(() => {
    const token = getTokenFromCookies();

    if (!token) {
      router.push("/");
      return;
    }

    getBillingRecords(token)
      .then(setRecords)
      .catch(() => {
        document.cookie = "token=; Max-Age=0; path=/";
        router.push("/");
      });
  }, [router]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Billing History</h1>

      <p className="mt-2 text-slate-500">
        Review uploaded billing records from your cloud invoices.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Service</th>
              <th className="p-4">Cost</th>
              <th className="p-4">Currency</th>
              <th className="p-4">Usage Date</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-t border-slate-200">
                <td className="p-4">{record.service}</td>
                <td className="p-4 font-semibold">
                  {record.cost.toFixed(2)}
                </td>
                <td className="p-4">{record.currency}</td>
                <td className="p-4">
                  {new Date(record.usageDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {records.length === 0 && (
          <p className="p-6 text-slate-500">
            No billing records uploaded yet.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}
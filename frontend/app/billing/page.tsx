import { DashboardLayout } from "@/components/dashboard-layout";

const invoices = [
  {
    id: "INV-001",
    provider: "GCP",
    month: "January",
    amount: "$420",
    status: "Processed",
  },
  {
    id: "INV-002",
    provider: "GCP",
    month: "February",
    amount: "$380",
    status: "Processed",
  },
  {
    id: "INV-003",
    provider: "GCP",
    month: "March",
    amount: "$610",
    status: "Anomaly detected",
  },
];

export default function BillingPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">
        Billing History
      </h1>

      <p className="mt-2 text-zinc-400">
        Review uploaded invoices and billing analysis.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-md">
        <table className="w-full text-left">
          <thead className="bg-zinc-800">
            <tr>
              <th className="p-4">Invoice</th>
              <th className="p-4">Provider</th>
              <th className="p-4">Month</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t border-zinc-800">
                <td className="p-4">{invoice.id}</td>
                <td className="p-4">{invoice.provider}</td>
                <td className="p-4">{invoice.month}</td>
                <td className="p-4 font-semibold">
                  {invoice.amount}
                </td>
                <td className="p-4">
                  {invoice.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
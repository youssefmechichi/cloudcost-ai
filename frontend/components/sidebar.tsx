"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Upload,
  Receipt,
  Bot,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900">
          CloudCost AI
        </h1>

        <p className="text-sm text-slate-500">
          FinOps SaaS Platform
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-xl p-3 text-slate-700 transition hover:bg-slate-100"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/upload"
          className="flex items-center gap-3 rounded-xl p-3 text-slate-700 transition hover:bg-slate-100"
        >
          <Upload size={20} />
          Upload Invoices
        </Link>

        <Link
          href="/billing"
          className="flex items-center gap-3 rounded-xl p-3 text-slate-700 transition hover:bg-slate-100"
        >
          <Receipt size={20} />
          Billing History
        </Link>

        <Link
          href="/ai-advisor"
          className="flex items-center gap-3 rounded-xl p-3 text-slate-700 transition hover:bg-slate-100"
        >
          <Bot size={20} />
          AI Advisor
        </Link>
      </nav>
    </aside>
  );
}
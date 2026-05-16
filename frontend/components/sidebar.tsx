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
    <aside className="flex h-screen w-64 flex-col border-r bg-black text-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">CloudCost AI</h1>
        <p className="text-sm text-gray-400">
          FinOps SaaS Platform
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-zinc-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/upload"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-zinc-800"
        >
          <Upload size={20} />
          Upload Invoices
        </Link>

        <Link
          href="/billing"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-zinc-800"
        >
          <Receipt size={20} />
          Billing History
        </Link>

        <Link
          href="/ai-advisor"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-zinc-800"
        >
          <Bot size={20} />
          AI Advisor
        </Link>
      </nav>
    </aside>
  );
}
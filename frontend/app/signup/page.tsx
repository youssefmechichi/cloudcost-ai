"use client";

import { useState } from "react";
import { signup } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

  try {
    setLoading(true);
    await signup(email, password);
    router.push("/");
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Unknown error");
    }
  } finally {
    setLoading(false);
  }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-950">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Start analyzing your cloud costs.
          </p>
        </div>

        <input
          className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />

        <input
          className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 p-3 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/" className="text-indigo-600 underline">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
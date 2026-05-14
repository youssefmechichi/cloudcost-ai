"use client";

import { useState } from "react";
import { signup } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@cloudcost.ai");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    try {
      await signup(email, password);
      router.push("/login");
    } catch {
      setError("Signup failed. User may already exist.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4 rounded-2xl border bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">Create account</h1>

        <input className="w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

        <input className="w-full rounded border p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

        {error && <p className="text-red-600">{error}</p>}

        <button className="w-full rounded bg-black p-2 text-white">
          Sign up
        </button>

        <p className="text-sm text-gray-700">
          Already have an account?{" "}
          <Link className="underline" href="/login">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
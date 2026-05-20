"use client";

import { useState } from "react";
import { login } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@cloudcost.ai");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = await login(email, password);
      document.cookie = `token=${data.access_token}; path=/`;
      router.push("/dashboard");
    } catch {
      setError("Invalid login credentials");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 border p-6 rounded-xl">
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="w-full border p-2 rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="w-full bg-black text-white p-2 rounded">
          Login
        </button>
        <p className="text-sm text-slate-500">
        No account yet? <a href="/signup" className="text-indigo-600 underline">Sign up</a>
      </p>
      </form>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getApiErrorMessage, login as loginRequest } from "@/utils/api";
import { setToken } from "@/utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchParams.get("expired")) {
      setError("Your session has expired. Please log in again.");
    }
  }, [searchParams]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginRequest({ email, password });

      const { access_token, dashboard_path } = res.data;

      setToken(access_token);

      router.push(dashboard_path || "/admin");
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Login
        </h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3 dark:bg-gray-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3 dark:bg-gray-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
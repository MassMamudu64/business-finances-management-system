"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@/components/Skeleton";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

export default function StoresPage() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/admin/stores", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStores(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Store Insights</h1>

      <div className="bg-white dark:bg-gray-800 p-6 shadow rounded mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={stores}>
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="store_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_spent" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b">
            <tr>
              <th className="p-3">Store</th>
              <th className="p-3">Transactions</th>
              <th className="p-3">Total Spent</th>
            </tr>
          </thead>

          <tbody>
            {stores.map((s, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="p-3">{s.store_name}</td>
                <td className="p-3">{s.transaction_count}</td>
                <td className="p-3">${s.total_spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyReport() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/admin/monthly", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const formatted = res.data.map((item: any) => ({
          ...item,
          month: new Date(item.month).toLocaleString("default", {
            month: "short",
            year: "numeric",
          }),
        }));

        setData(formatted);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load monthly report");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading monthly report...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Monthly Analytics</h1>

      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line type="monotone" dataKey="total_earnings" stroke="#4f46e5" strokeWidth={3} />
            <Line type="monotone" dataKey="total_paid" stroke="#16a34a" strokeWidth={3} />
            <Line type="monotone" dataKey="total_balance" stroke="#dc2626" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
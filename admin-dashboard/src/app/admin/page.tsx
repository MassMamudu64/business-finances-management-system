"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "@/components/SummaryCard";
import Skeleton from "@/components/Skeleton";
import { DollarSign, Wallet, TrendingUp, Receipt, Coins } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/admin/summary", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-5 bg-white dark:bg-gray-800 shadow rounded">
            <Skeleton className="h-6 w-24 mb-3" />
            <Skeleton className="h-8 w-32" />
          </div>
        ))}
      </div>
    );

  const cards = [
    { title: "Total Earnings", value: data.total_earnings, icon: <DollarSign />, color: "bg-green-600" },
    { title: "Total Paid", value: data.total_paid, icon: <Wallet />, color: "bg-blue-600" },
    { title: "Total Balance", value: data.total_balance, icon: <Coins />, color: "bg-yellow-600" },
    { title: "Profit", value: data.profit, icon: <TrendingUp />, color: "bg-purple-600" },
    { title: "Transactions", value: data.total_transactions, icon: <Receipt />, color: "bg-red-600" },
  ];

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <SummaryCard key={i} title={c.title} value={c.value} icon={c.icon} color={c.color} />
        ))}
      </div>
    </div>
  );
}
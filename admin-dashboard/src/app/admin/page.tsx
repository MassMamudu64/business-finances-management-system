"use client";

import { useEffect, useState } from "react";
import SummaryCard from "@/components/SummaryCard";
import axios from "axios";

export default function AdminDashboard() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/admin/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!summary) return <p>Loading summary...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard title="Total Earnings" value={summary.total_earnings} />
      <SummaryCard title="Total Paid" value={summary.total_paid} />
      <SummaryCard title="Total Balance" value={summary.total_balance} />
      <SummaryCard title="Profit" value={summary.profit} />
      <SummaryCard title="Transactions" value={summary.total_transactions} />
    </div>
  );
}
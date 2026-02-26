"use client";

import { useEffect, useState } from "react";
import SummaryCard from "@/components/SummaryCard";
import {
  DollarSign,
  Wallet,
  TrendingUp,
  Receipt,
  Coins,
} from "lucide-react";

import { fetchAdminSummary } from "@/utils/api";

export default function SummaryPage() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminSummary()
      .then((data) => setSummary(data))
      .catch((err) => console.error("Failed to load summary", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading summary...</p>;

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Summary Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Earnings"
          value={summary.total_earnings}
          icon={<DollarSign size={22} />}
          color="bg-green-600"
        />

        <SummaryCard
          title="Total Paid"
          value={summary.total_paid}
          icon={<Wallet size={22} />}
          color="bg-blue-600"
        />

        <SummaryCard
          title="Total Balance"
          value={summary.total_balance}
          icon={<Coins size={22} />}
          color="bg-yellow-600"
        />

        <SummaryCard
          title="Profit"
          value={summary.profit}
          icon={<TrendingUp size={22} />}
          color="bg-purple-600"
        />

        <SummaryCard
          title="Transactions"
          value={summary.total_transactions}
          icon={<Receipt size={22} />}
          color="bg-red-600"
        />
      </div>
    </div>
  );
}
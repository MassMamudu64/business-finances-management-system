"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface StoreStats {
  store_name: string;
  total_spent: number;
  transaction_count: number;
}

export default function StoresPage() {
  const [stores, setStores] = useState<StoreStats[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/admin/stores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setStores(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Store Insights</h1>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Store</th>
              <th className="p-3">Total Spent</th>
              <th className="p-3">Transactions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3">{store.store_name}</td>
                <td className="p-3">{store.total_spent}</td>
                <td className="p-3">{store.transaction_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
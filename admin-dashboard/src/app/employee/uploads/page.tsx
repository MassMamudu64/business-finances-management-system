"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@/components/Skeleton";

export default function UploadHistoryPage() {
  const [uploads, setUploads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/employee/uploads", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUploads(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-48 mb-6" />
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-full mb-3" />
        ))}
      </div>
    );

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">My Uploads</h1>

      <div className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b">
            <tr>
              <th className="p-3">File</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Store</th>
              <th className="p-3">Uploaded</th>
            </tr>
          </thead>

          <tbody>
            {uploads.map((u, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="p-3">{u.file_name}</td>
                <td className="p-3">${u.total}</td>
                <td className="p-3">{u.store_name}</td>
                <td className="p-3">{new Date(u.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
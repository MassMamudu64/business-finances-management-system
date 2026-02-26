"use client";

import { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";

import { fetchAdminEmployees } from "@/utils/api";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminEmployees()
      .then((res) => setEmployees(res || []))
      .catch((err) => {
        console.error("Failed to load employees", err);
      })
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
      <h1 className="text-3xl font-bold mb-6">Employee Activity</h1>

      <div className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Uploads</th>
              <th className="p-3">Earnings</th>
              <th className="p-3">Last Upload</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="p-3">{emp.employee_name}</td>
                <td className="p-3">{emp.total_uploads}</td>
                <td className="p-3">${emp.total_earnings}</td>
                <td className="p-3">
                  {emp.last_upload
                    ? new Date(emp.last_upload).toLocaleString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
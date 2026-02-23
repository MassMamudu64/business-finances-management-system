"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface EmployeeStats {
  employee_name: string;
  total_uploads: number;
  total_earnings: number;
  last_upload: string | null;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeStats[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/admin/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Employee Activity</h1>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Total Uploads</th>
              <th className="p-3">Total Earnings</th>
              <th className="p-3">Last Upload</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3">{emp.employee_name}</td>
                <td className="p-3">{emp.total_uploads}</td>
                <td className="p-3">{emp.total_earnings}</td>
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
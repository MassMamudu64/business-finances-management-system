"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import EmployeeSidebar from "@/components/EmployeeSidebar";

import { getToken } from "@/utils/auth";

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) router.push("/login");
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <EmployeeSidebar />
      <main className="flex-1 p-6 max-w-7xl mx-auto animate-fadeIn">
        {children}
      </main>
    </div>
  );
}
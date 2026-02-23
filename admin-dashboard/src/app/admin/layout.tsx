"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") router.push("/login");
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 max-w-7xl mx-auto animate-fadeIn">
        {children}
      </main>
    </div>
  );
}

// // src/app/
// //   admin/
//     layout.tsx
//     page.tsx
//     monthly/
//     employees/
//     stores/
//   employee/?
//     layout.tsx
//     upload/
//     uploads/
// //     profile/
// // components/
//   Sidebar.tsx
// //   EmployeeSidebar.tsx
// //   SummaryCard.tsx
// //   DarkModeToggle.tsx
//   Skeleton.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Upload, History, User, LogOut } from "lucide-react";
import DarkModeToggle from "@/components/DarkModeToggle";

const links = [
  { name: "Upload Receipt", href: "/employee/upload", icon: <Upload size={18} /> },
  { name: "My Uploads", href: "/employee/uploads", icon: <History size={18} /> },
  { name: "Profile", href: "/employee/profile", icon: <User size={18} /> },
];

export default function EmployeeSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen bg-gray-900 dark:bg-gray-950 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-8">Employee Panel</h1>

      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 p-2 rounded transition ${
                active
                  ? "bg-gray-700 dark:bg-gray-800"
                  : "hover:bg-gray-800 dark:hover:bg-gray-900"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="mb-4">
        <DarkModeToggle />
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
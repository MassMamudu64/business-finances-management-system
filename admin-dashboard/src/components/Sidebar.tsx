"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/admin" },
  { name: "Monthly Report", href: "/admin/monthly" },
  { name: "Employees", href: "/admin/employees" },
  { name: "Stores", href: "/admin/stores" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`p-2 rounded ${
              pathname === link.href
                ? "bg-gray-700"
                : "hover:bg-gray-800 transition"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
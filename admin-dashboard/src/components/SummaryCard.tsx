import { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  icon?: ReactNode;
  color?: string;
}

export default function SummaryCard({ title, value, icon, color = "bg-indigo-600" }: Props) {
  return (
    <div className="p-5 bg-white dark:bg-gray-800 shadow rounded-lg flex items-center gap-4 hover:shadow-lg transition">
      <div className={`p-3 rounded-full text-white ${color}`}>{icon}</div>

      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </p>
      </div>
    </div>
  );
}
interface SummaryCardProps {
  title: string;
  value: number | string;
}

export default function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
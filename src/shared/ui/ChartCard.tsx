export function ChartCard({ title, children}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-medium">{title}</h3>
      <div className="h-75">{children}</div>
    </div>
  );
}

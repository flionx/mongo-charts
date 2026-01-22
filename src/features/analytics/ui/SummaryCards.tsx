"use client";
import { useEffect, useState } from "react";
import { fetchWithCache } from "@/shared/lib/fetchWithCache";
import { formatCurrency } from "@/shared/lib/formatCurrency";

type Summary = {
  ordersCount: number;
  revenue: number;
  avgOrder: number;
  citiesCount: number;
};

export function SummaryCards() {
  const [data, setData] = useState<Summary | null>(null);

  useEffect(() => {
    fetchWithCache<Summary>("summary")
        .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200" />
        ))}
      </div>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card title="Orders" value={data.ordersCount} />
      <Card title="Revenue" value={formatCurrency(data.revenue)} />
      <Card title="Avg Order" value={formatCurrency(data.avgOrder)} />
      <Card title="Cities" value={data.citiesCount} />
    </section>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

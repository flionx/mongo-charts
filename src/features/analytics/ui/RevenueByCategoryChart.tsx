"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fetchWithCache } from "@/shared/lib/fetchWithCache";
import { ChartCard } from "@/shared/ui/ChartCard";
import { formatCurrency } from "@/shared/lib/formatCurrency";

type Item = {
  category: string;
  revenue: number;
};

export function RevenueByCategoryChart() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    fetchWithCache<Item[]>("revenue-by-category").then(res => {
      const shuffled = [...res].sort(() => Math.random() - 0.5);
      setData(shuffled);
    })
  }, []);

  return (
    <ChartCard title="Revenue by category">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis
            tickFormatter={(v) => `$${v / 1000}k`}
            width={60}
          />
          <Tooltip formatter={(v) => formatCurrency(Number(v))} />
          <Bar
            dataKey="revenue"
            fill="#6366f1"
            barSize={32}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

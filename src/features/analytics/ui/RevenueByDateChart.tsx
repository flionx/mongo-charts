"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fetchWithCache } from "@/shared/lib/fetchWithCache";
import { ChartCard } from "@/shared/ui/ChartCard";
import { formatDate } from "@/shared/lib/formatDate";
import { formatCurrency } from "@/shared/lib/formatCurrency";

type Item = {
  date: string;
  revenue: number;
};

const TTL = 5 * 60 * 1000;

export function RevenueByDateChart() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    fetchWithCache<Item[]>(
      "analytics:revenue-by-date",
      TTL,
      async () => {
        const res = await fetch("/api/revenue-by-date");
        return res.json();
      }
    ).then(setData);
  }, []);

  return (
    <ChartCard title="Revenue Over Time">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
            interval="equidistantPreserveStart"
          />
          <YAxis tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip
            formatter={(v) => formatCurrency(Number(v))}
          />
          <Line
            dataKey="revenue"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

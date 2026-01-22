"use client";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { useEffect, useState } from "react";
import { fetchWithCache } from "@/shared/lib/fetchWithCache";
import { ChartCard } from "@/shared/ui/ChartCard";
import { formatCurrency } from "@/shared/lib/formatCurrency";

type DataItem = {
  category: string;
  ordersCount: number;
  revenue: number;
};

export function CategoryComparisonChart() {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetchWithCache<DataItem[]>(
        "category-comparison",
        3000000,
        async () => {
            const res = await fetch("/api/category-comparison");
            return res.json();
        }
    ).then(setData);
  }, []);


  return (
    <ChartCard title="Orders vs Revenue by Category">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="category"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            yAxisId="orders"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            yAxisId="revenue"
            orientation="right"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v / 1000}k`}
          />

          <Tooltip
            labelFormatter={(label) => label}
            formatter={(value, name) => {
                if (name === "Revenue") {
                return [formatCurrency(Number(value)), name];
                }
                return [value, name];
            }}
        />

          <Legend />

          <Bar
            yAxisId="orders"
            dataKey="ordersCount"
            name="Orders"
            fill="#6366f1"
            barSize={50}
            radius={[3, 3, 0, 0]}
          />

          <Line
            yAxisId="revenue"
            dataKey="revenue"
            name="Revenue"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

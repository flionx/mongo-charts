import { SummaryCards } from "@/features/analytics/ui/SummaryCards";
import { RevenueByCategoryChart } from "@/features/analytics/ui/RevenueByCategoryChart";
import { RevenueByDateChart } from "@/features/analytics/ui/RevenueByDateChart";
import { CategoryComparisonChart } from "@/features/analytics/ui/CategoryComparisonChart";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <header>
          <h1 className="text-3xl font-semibold">Analytics Dashboard</h1>
          <p className="text-gray-500">
            Orders and revenue overview
          </p>
        </header>

        <SummaryCards />

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <RevenueByCategoryChart />
          <RevenueByDateChart />
        </section>

        <section>
          <CategoryComparisonChart />
        </section>
      </div>
    </main>
  );
}

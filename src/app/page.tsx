"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Filters } from "@/components/dashboard/filters";
import { ChartCard } from "@/components/dashboard/chart-card";
import { SalesBarChart } from "@/components/dashboard/sales-bar-chart";
import { RevenueLineChart } from "@/components/dashboard/revenue-line-chart";
import { CategoryPieChart } from "@/components/dashboard/category-pie-chart";
import { UserStatsOverview } from "@/components/dashboard/user-stats-overview";
import { mockSalesData, mockRevenueData, mockCategoryData, mockUserStats, initialFilters } from "@/data/mock-data";
import type { SalesData, RevenueData, CategoryData, UserStats } from "@/data/mock-data";
import { BarChartBig, LineChart, PieChartIcon, Users } from "lucide-react";

type FilterState = {
  dateRange?: DateRange;
  category: string;
};

export default function DashboardPage() {
  const [filters, setFilters] = React.useState<FilterState>(initialFilters);
  
  // Filtered data based on state. This is a simple simulation.
  // In a real app, this would involve more complex logic or API calls.
  const [displaySalesData, setDisplaySalesData] = React.useState<SalesData[]>(mockSalesData);
  const [displayRevenueData, setDisplayRevenueData] = React.useState<RevenueData[]>(mockRevenueData);
  const [displayCategoryData, setDisplayCategoryData] = React.useState<CategoryData[]>(mockCategoryData);
  const [displayUserStats, setDisplayUserStats] = React.useState<UserStats>(mockUserStats);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Simulate data filtering
    // For simplicity, we'll just log filters and not actually filter data in this example
    // In a real app, you would filter your data sources here.
    console.log("Applied filters:", newFilters);

    // Example of how you might filter category data:
    if (newFilters.category === "all") {
      setDisplayCategoryData(mockCategoryData);
    } else {
      setDisplayCategoryData(mockCategoryData.filter(item => item.name.toLowerCase() === newFilters.category));
    }
    
    // Example: If dateRange changes, you might filter sales and revenue data
    // This is a placeholder for actual date filtering logic
    if (newFilters.dateRange?.from && newFilters.dateRange?.to) {
       // Simple mock: slice if more than 5 items, to show change
      setDisplaySalesData(mockSalesData.slice(0, Math.max(5, mockSalesData.length - Math.floor(Math.random() * 5) )));
      setDisplayRevenueData(mockRevenueData.slice(0, Math.max(3, mockRevenueData.length - Math.floor(Math.random() * 3) )));
    } else {
      setDisplaySalesData(mockSalesData);
      setDisplayRevenueData(mockRevenueData);
    }
  };

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      <Filters currentFilters={filters} onFilterChange={handleFilterChange} />
      
      <section className="space-y-6">
        <UserStatsOverview stats={displayUserStats} />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Monthly Sales" description="Sales performance over the past year" icon={BarChartBig}>
          <SalesBarChart data={displaySalesData} />
        </ChartCard>
        <ChartCard title="Revenue Trend" description="Revenue and profit over time" icon={LineChart}>
          <RevenueLineChart data={displayRevenueData} />
        </ChartCard>
      </section>
      
      <section>
        <ChartCard title="Sales by Category" description="Distribution of sales across product categories" icon={PieChartIcon} className="lg:col-span-1">
            <CategoryPieChart data={displayCategoryData} />
        </ChartCard>
      </section>
    </main>
  );
}

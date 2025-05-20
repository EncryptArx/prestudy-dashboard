export type SalesData = {
  month: string;
  sales: number;
  target: number;
};

export type RevenueData = {
  date: string;
  revenue: number;
  profit?: number; 
};

export type CategoryData = {
  name: string;
  value: number;
  fill?: string;
};

export type UserStats = {
  totalUsers: number;
  activeUsers: number;
  newSignups: number;
  retentionRate: number;
};

export const mockSalesData: SalesData[] = [
  { month: "Jan", sales: 4000, target: 3000 },
  { month: "Feb", sales: 3000, target: 3200 },
  { month: "Mar", sales: 5000, target: 4000 },
  { month: "Apr", sales: 2780, target: 3500 },
  { month: "May", sales: 1890, target: 2500 },
  { month: "Jun", sales: 2390, target: 3000 },
  { month: "Jul", sales: 3490, target: 3800 },
  { month: "Aug", sales: 3200, target: 3500 },
  { month: "Sep", sales: 4100, target: 4000 },
  { month: "Oct", sales: 3800, target: 3900 },
  { month: "Nov", sales: 4500, target: 4200 },
  { month: "Dec", sales: 4800, target: 5000 },
];

export const mockRevenueData: RevenueData[] = [
  { date: "2023-01-01", revenue: 2400, profit: 1200 },
  { date: "2023-02-01", revenue: 1398, profit: 600 },
  { date: "2023-03-01", revenue: 9800, profit: 4500 },
  { date: "2023-04-01", revenue: 3908, profit: 1800 },
  { date: "2023-05-01", revenue: 4800, profit: 2200 },
  { date: "2023-06-01", revenue: 3800, profit: 1700 },
  { date: "2023-07-01", revenue: 4300, profit: 2000 },
];

export const mockCategoryData: CategoryData[] = [
  { name: "Electronics", value: 400, fill: "var(--color-chart-1)" },
  { name: "Clothing", value: 300, fill: "var(--color-chart-2)" },
  { name: "Groceries", value: 300, fill: "var(--color-chart-3)" },
  { name: "Books", value: 200, fill: "var(--color-chart-4)" },
  { name: "Home Goods", value: 278, fill: "var(--color-chart-5)" },
];

export const mockUserStats: UserStats = {
  totalUsers: 12543,
  activeUsers: 8765,
  newSignups: 320,
  retentionRate: 75.8,
};

export const initialFilters = {
  dateRange: {
    from: new Date(new Date().getFullYear(), 0, 1), // Start of current year
    to: new Date(), // Today
  },
  category: "all",
};

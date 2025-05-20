import type { DateRange } from "react-day-picker";

export type TopStatCardData = {
  title: string;
  amount: string; // e.g., "₹30K", "1.7K"
  percentageChange: number; // e.g., 10.4
  isPositiveChange: boolean;
  previousPeriodValue: string; // e.g., "(₹43K)", "(0.6K)"
  trendLabel?: string; // e.g., "Sales", "order"
  additionalPurchaseInfo?: string; // e.g., "user 204" (for Purchase column)
  additionalCompleteInfo?: string; // e.g. "94" (for Complete column with its own change)
  completePercentageChange?: number;
  isCompletePositiveChange?: boolean;
};

export type ReportStat = {
  label: string;
  value: string; // e.g., "2k", "₹35k"
};

export type WeeklyChartDataPoint = {
  day: string; // "Sun", "Mon", ...
  value: number;
  highlighted?: boolean;
  highlightLabel?: string;
};

export type UserActivityDataPoint = {
  value: number;
};

export type LeaderboardUser = {
  rank: number;
  userName: string;
  points: number;
  avatarUrl?: string;
};

export type Transaction = {
  id: string;
  customerId: string;
  orderDate: string;
  status: "Paid" | "Pending" | "Failed";
  amount: string; // e.g., "₹199"
};


export const mockTopStatCards: TopStatCardData[] = [
  {
    title: "Total Purchase Amount",
    amount: "₹30K",
    percentageChange: 10.4,
    isPositiveChange: true,
    previousPeriodValue: "Previous 7days (₹43K)",
    trendLabel: "Sales",
  },
  {
    title: "Total Purchase Quizzes",
    amount: "1.7K",
    percentageChange: 14.4,
    isPositiveChange: true,
    previousPeriodValue: "Previous 7days (0.6K)",
    trendLabel: "order",
  },
  {
    title: "Purchase & Complete Quizzes",
    amount: "1.7K", // This is "Purchase"
    additionalPurchaseInfo: "user 204",
    percentageChange: 0, // No explicit change % for "Purchase" part in image
    isPositiveChange: true, // Assuming neutral or not shown explicitly
    // "Complete" part
    additionalCompleteInfo: "94",
    completePercentageChange: -14.4, // Negative as per arrow
    isCompletePositiveChange: false,
    previousPeriodValue: "Last 7 days", // General descriptor
  },
];

export const mockReportStats: ReportStat[] = [
  { label: "Online User", value: "2k" },
  { label: "Total Quiz purchase", value: "3.5k" },
  { label: "Total Users", value: "22k" },
  { label: "Revenue", value: "₹35k" },
];

export const mockWeeklyReportData: WeeklyChartDataPoint[] = [
  { day: "Sun", value: 15000 },
  { day: "Mon", value: 18000 },
  { day: "Tue", value: 25000 },
  { day: "Wed", value: 28000, highlighted: true, highlightLabel: "Thursday 14k" }, // Image says Thursday, but data point is Wed
  { day: "Thu", value: 22000 },
  { day: "Fri", value: 30000 },
  { day: "Sat", value: 33000 },
];


export const mockUserActivityValue = 221; // Users per minute
export const mockUserActivityChartData: UserActivityDataPoint[] = Array.from({ length: 20 }, () => ({
  value: Math.floor(Math.random() * 100),
}));


export const mockLeaderboardData: LeaderboardUser[] = [
  { rank: 1, userName: "#username", points: 1432, avatarUrl: "https://placehold.co/32x32/E0E0E0/757575?text=U1" },
  { rank: 2, userName: "#username", points: 1342, avatarUrl: "https://placehold.co/32x32/E0E0E0/757575?text=U2" },
  { rank: 3, userName: "#username", points: 1135, avatarUrl: "https://placehold.co/32x32/E0E0E0/757575?text=U3" },
  { rank: 4, userName: "#username", points: 1003, avatarUrl: "https://placehold.co/32x32/E0E0E0/757575?text=U4" },
  { rank: 5, userName: "#username", points: 937, avatarUrl: "https://placehold.co/32x32/E0E0E0/757575?text=U5" },
  { rank: 6, userName: "#username", points: 921, avatarUrl: "https://placehold.co/32x32/E0E0E0/757575?text=U6" },
  { rank: 7, userName: "#username", points: 870, avatarUrl: "https://placehold.co/32x32/E0E0E0/757575?text=U7" },
  { rank: 8, userName: "#username", points: 821, avatarUrl: "https://placehold.co/32x32/E0E0E0/757575?text=U8" },
];

export const mockTransactionsData: Transaction[] = [
  { id: "1", customerId: "#6545", orderDate: "01 Oct | 11:29 am", status: "Paid", amount: "₹199" },
  { id: "2", customerId: "#5412", orderDate: "01 Oct | 11:29 am", status: "Pending", amount: "₹99" },
  { id: "3", customerId: "#6622", orderDate: "01 Oct | 11:29 am", status: "Paid", amount: "₹199" },
  { id: "4", customerId: "#6462", orderDate: "01 Oct | 11:29 am", status: "Paid", amount: "₹199" },
  { id: "5", customerId: "#6462", orderDate: "01 Oct | 11:29 am", status: "Paid", amount: "₹199" },
];


// Keep existing filter types if needed, or remove if not used by new dashboard
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

export const mockSalesData: SalesData[] = [];
export const mockRevenueData: RevenueData[] = [];
export const mockCategoryData: CategoryData[] = [];
export const mockUserStats: UserStats = { totalUsers: 0, activeUsers: 0, newSignups: 0, retentionRate: 0 };

export const initialFilters = {
  dateRange: {
    from: new Date(new Date().getFullYear(), 0, 1), // Start of current year
    to: new Date(), // Today
  },
  category: "all",
};


import type { DateRange } from "react-day-picker";

export type TopStatCardData = {
  title: string;
  amount: string; 
  percentageChange: number; 
  isPositiveChange: boolean;
  previousPeriodValue: string; 
  trendLabel?: string; 
  additionalPurchaseInfo?: string; 
  additionalCompleteInfo?: string; 
  completePercentageChange?: number;
  isCompletePositiveChange?: boolean;
};

export type ReportStat = {
  label: string;
  value: string; 
};

export type WeeklyChartDataPoint = {
  day: string; 
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
  amount: string; 
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
    amount: "1.7K", 
    additionalPurchaseInfo: "user 204",
    percentageChange: 0, 
    isPositiveChange: true, 
    additionalCompleteInfo: "94",
    completePercentageChange: -14.4, 
    isCompletePositiveChange: false,
    previousPeriodValue: "Last 7 days", 
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
  { day: "Wed", value: 28000, highlighted: true, highlightLabel: "Thursday 14k" }, 
  { day: "Thu", value: 22000 },
  { day: "Fri", value: 30000 },
  { day: "Sat", value: 33000 },
];


export const mockUserActivityValue = 221; 
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
    from: new Date(new Date().getFullYear(), 0, 1), 
    to: new Date(), 
  },
  category: "all",
};


// New types for Order Management
export type OrderStatus = "Complete" | "Pending" | "Canceled";
export type PaymentMethod = "UPI" | "Debit Card" | "Credit Card" | "Net Banking";

export type Order = {
  id: string; 
  orderId: string; 
  userId: string; 
  productName: string;
  date: string; 
  price: string; 
  paymentMethod: PaymentMethod;
  status: OrderStatus;
};

export type OrderStat = {
  title: string;
  value: string;
  percentageChange: string;
  periodLabel: string;
  isPositive: boolean;
};

export const mockOrderStats: OrderStat[] = [
  {
    title: "Total Orders",
    value: "1,240",
    percentageChange: "+14.4%",
    periodLabel: "Last 7 days",
    isPositive: true,
  },
  {
    title: "Completed Orders",
    value: "960",
    percentageChange: "85%", 
    periodLabel: "Last 7 days",
    isPositive: true, 
  },
];

export const mockOrders: Order[] = [
  { id: "ord1", orderId: "#ORD2312", userId: "#1234567890", productName: "General Knowledge Quiz #521", date: "01-01-2025", price: "₹99.99", paymentMethod: "UPI", status: "Complete" },
  { id: "ord2", orderId: "#ORD2313", userId: "#1232674566", productName: "Mathematic Quiz #65", date: "01-01-2025", price: "₹199.99", paymentMethod: "UPI", status: "Complete" },
  { id: "ord3", orderId: "#ORD2314", userId: "#9879123120", productName: "General Science Quiz #452", date: "01-01-2025", price: "₹99.99", paymentMethod: "UPI", status: "Complete" }, 
  { id: "ord4", orderId: "#ORD2315", userId: "#8798324768", productName: "ADRE Quiz #452", date: "01-01-2025", price: "₹99.99", paymentMethod: "UPI", status: "Canceled" },
  { id: "ord5", orderId: "#ORD2316", userId: "#8473958459", productName: "General Knowledge Quiz #521", date: "01-01-2025", price: "₹199.99", paymentMethod: "UPI", status: "Complete" },
  { id: "ord6", orderId: "#ORD2317", userId: "#1278675389", productName: "Mathematic Quiz #452", date: "01-01-2025", price: "₹199.99", paymentMethod: "UPI", status: "Complete" },
  { id: "ord7", orderId: "#ORD2318", userId: "#9883768719", productName: "Assam GK Quiz #231", date: "01-01-2025", price: "₹49.99", paymentMethod: "UPI", status: "Pending" },
  { id: "ord8", orderId: "#ORD2319", userId: "#7896872099", productName: "General Knowledge Quiz #521", date: "01-01-2025", price: "₹99.99", paymentMethod: "Debit Card", status: "Complete" },
  { id: "ord9", orderId: "#ORD2320", userId: "#0897987363", productName: "General Science Quiz #452", date: "01-01-2025", price: "₹199.99", paymentMethod: "UPI", status: "Complete" },
  { id: "ord10", orderId: "#ORD2321", userId: "#1768756283", productName: "ADRE Quiz #122", date: "01-01-2025", price: "₹99.99", paymentMethod: "UPI", status: "Complete" },
  { id: "ord11", orderId: "#ORD2322", userId: "#2345678901", productName: "History Buff Challenge", date: "02-01-2025", price: "₹79.00", paymentMethod: "Credit Card", status: "Complete" },
  { id: "ord12", orderId: "#ORD2323", userId: "#3456789012", productName: "Geography Explorer Set", date: "02-01-2025", price: "₹149.50", paymentMethod: "UPI", status: "Pending" },
  { id: "ord13", orderId: "#ORD2324", userId: "#4567890123", productName: "Literature Lovers Pack", date: "03-01-2025", price: "₹129.00", paymentMethod: "Debit Card", status: "Complete" },
  { id: "ord14", orderId: "#ORD2325", userId: "#5678901234", productName: "Science Whiz Kit", date: "03-01-2025", price: "₹249.99", paymentMethod: "Net Banking", status: "Canceled" },
  { id: "ord15", orderId: "#ORD2326", userId: "#6789012345", productName: "Current Affairs Monthly", date: "04-01-2025", price: "₹29.00", paymentMethod: "UPI", status: "Complete" },
  { id: "ord16", orderId: "#ORD2327", userId: "#7890123456", productName: "Advanced Coding Bootcamp", date: "04-01-2025", price: "₹499.00", paymentMethod: "Credit Card", status: "Pending" },
  { id: "ord17", orderId: "#ORD2328", userId: "#8901234567", productName: "Creative Writing Workshop", date: "05-01-2025", price: "₹89.50", paymentMethod: "UPI", status: "Complete" },
  { id: "ord18", orderId: "#ORD2329", userId: "#9012345678", productName: "Data Science Fundamentals", date: "05-01-2025", price: "₹299.00", paymentMethod: "Debit Card", status: "Canceled" },
  { id: "ord19", orderId: "#ORD2330", userId: "#0123456789", productName: "Digital Marketing Crash Course", date: "06-01-2025", price: "₹199.00", paymentMethod: "Net Banking", status: "Complete" },
  { id: "ord20", orderId: "#ORD2331", userId: "#1122334455", productName: "Photography Masterclass", date: "06-01-2025", price: "₹159.00", paymentMethod: "UPI", status: "Pending" },
  { id: "ord21", orderId: "#ORD2332", userId: "#2233445566", productName: "Yoga and Meditation Guide", date: "07-01-2025", price: "₹49.00", paymentMethod: "Credit Card", status: "Complete" },
  { id: "ord22", orderId: "#ORD2333", userId: "#3344556677", productName: "Financial Planning 101", date: "07-01-2025", price: "₹75.00", paymentMethod: "Debit Card", status: "Canceled" },
  { id: "ord23", orderId: "#ORD2334", userId: "#4455667788", productName: "Public Speaking Essentials", date: "08-01-2025", price: "₹99.00", paymentMethod: "Net Banking", status: "Complete" },
  { id: "ord24", orderId: "#ORD2335", userId: "#5566778899", productName: "Graphic Design Basics", date: "08-01-2025", price: "₹120.00", paymentMethod: "UPI", status: "Pending" },
];

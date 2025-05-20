import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserStats } from "@/data/mock-data";
import { Users2, TrendingUp, UserPlus, Percent } from "lucide-react";

type UserStatsOverviewProps = {
  stats: UserStats;
};

export function UserStatsOverview({ stats }: UserStatsOverviewProps) {
  const statItems = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users2,
      bgColor: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-600 dark:text-blue-300",
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      icon: TrendingUp,
      bgColor: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-600 dark:text-green-300",
    },
    {
      title: "New Signups (Month)",
      value: stats.newSignups.toLocaleString(),
      icon: UserPlus,
      bgColor: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-600 dark:text-purple-300",
    },
    {
      title: "Retention Rate",
      value: `${stats.retentionRate.toFixed(1)}%`,
      icon: Percent,
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
      textColor: "text-yellow-600 dark:text-yellow-400",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <Card key={item.title} className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className={`h-5 w-5 ${item.textColor}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${item.textColor}`}>{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

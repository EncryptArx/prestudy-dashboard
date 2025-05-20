import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type ChartCardProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
};

export function ChartCard({
  title,
  description,
  icon: Icon,
  children,
  className,
}: ChartCardProps) {
  return (
    <Card className={cn("shadow-lg", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          {Icon && <Icon className="h-6 w-6 text-muted-foreground" />}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// Helper for cn if not globally available, or import from "@/lib/utils"
// This is usually in @/lib/utils.ts
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

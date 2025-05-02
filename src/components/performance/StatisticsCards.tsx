
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Goal,
  Award,
  ChartBar,
  User,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  trend: {
    direction: "up" | "down" | "stable";
    value: string;
    text: string;
  };
}

const StatisticsCards: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: "KPI Aktif",
      value: "24",
      icon: <Goal className="h-6 w-6 text-blue-600" />,
      iconBg: "bg-blue-100",
      trend: {
        direction: "up",
        value: "5%",
        text: "dari bulan lalu"
      }
    },
    {
      title: "OKR Aktif",
      value: "12",
      icon: <Award className="h-6 w-6 text-purple-600" />,
      iconBg: "bg-purple-100",
      trend: {
        direction: "up",
        value: "8%",
        text: "dari kuartal lalu"
      }
    },
    {
      title: "Pencapaian Rata-rata",
      value: "78%",
      icon: <ChartBar className="h-6 w-6 text-green-600" />,
      iconBg: "bg-green-100",
      trend: {
        direction: "up",
        value: "3%",
        text: "dari target"
      }
    },
    {
      title: "Evaluasi Kinerja",
      value: "42",
      icon: <User className="h-6 w-6 text-amber-600" />,
      iconBg: "bg-amber-100",
      trend: {
        direction: "down",
        value: "2%",
        text: "dari bulan lalu"
      }
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.iconBg} p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              {stat.trend.direction === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={
                  stat.trend.direction === "up"
                    ? "text-green-500 font-medium"
                    : "text-red-500 font-medium"
                }
              >
                {stat.trend.value} {stat.trend.direction === "up" ? "naik" : "turun"}
              </span>
              <span className="text-gray-500 ml-1">{stat.trend.text}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCards;

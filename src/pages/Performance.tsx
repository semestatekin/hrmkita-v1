
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, User, TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample performance data
const performanceData = [
  {
    id: 1,
    employee: "Budi Santoso",
    position: "Senior Developer",
    department: "Engineering",
    rating: 4.8,
    status: "excellent",
    reviewDate: "10 Juni 2023",
    projects: 5,
    goals: "92%",
    trend: "up",
  },
  {
    id: 2,
    employee: "Siti Nurhayati",
    position: "UI/UX Designer",
    department: "Design",
    rating: 4.5,
    status: "excellent",
    reviewDate: "12 Juni 2023",
    projects: 4,
    goals: "90%",
    trend: "up",
  },
  {
    id: 3,
    employee: "Andi Wijaya",
    position: "Project Manager",
    department: "Management",
    rating: 4.2,
    status: "good",
    reviewDate: "15 Juni 2023",
    projects: 3,
    goals: "85%",
    trend: "stable",
  },
  {
    id: 4,
    employee: "Dewi Sartika",
    position: "HR Specialist",
    department: "Human Resources",
    rating: 3.9,
    status: "good",
    reviewDate: "8 Juni 2023",
    projects: 2,
    goals: "80%",
    trend: "stable",
  },
  {
    id: 5,
    employee: "Rudi Hartono",
    position: "Sales Executive",
    department: "Sales",
    rating: 3.5,
    status: "average",
    reviewDate: "5 Juni 2023",
    projects: 4,
    goals: "75%",
    trend: "down",
  },
];

const statusColors: Record<string, string> = {
  excellent: "bg-green-500",
  good: "bg-blue-500",
  average: "bg-yellow-500",
  poor: "bg-red-500",
};

const statusLabels: Record<string, string> = {
  excellent: "Sangat Baik",
  good: "Baik",
  average: "Rata-rata",
  poor: "Kurang",
};

const departmentPerformance = [
  {
    name: "Engineering",
    rating: 4.6,
  },
  {
    name: "Design",
    rating: 4.4,
  },
  {
    name: "Management",
    rating: 4.1,
  },
  {
    name: "HR",
    rating: 3.9,
  },
  {
    name: "Sales",
    rating: 3.7,
  },
  {
    name: "Finance",
    rating: 4.0,
  },
];

const Performance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manajemen Kinerja</h2>
        <Button>
          <User className="mr-2 h-4 w-4" /> Evaluasi Baru
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card className="md:col-span-2 lg:col-span-3 card-dashboard">
          <CardHeader>
            <CardTitle>Kinerja Berdasarkan Departemen</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentPerformance}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="rating" fill="#4F46E5" name="Rating" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle>Ringkasan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Rating Rata-rata</p>
                <p className="text-2xl font-bold">4.2/5.0</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Karyawan Dievaluasi</p>
                <p className="text-2xl font-bold">28/42</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tren Kinerja</p>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-green-500 font-medium">+5% dari evaluasi terakhir</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Cari karyawan..." className="pl-9" />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="table-container">
        <table className="table-hrm">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Karyawan</th>
              <th className="table-header-cell">Departemen</th>
              <th className="table-header-cell">Rating</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Pencapaian</th>
              <th className="table-header-cell">Tren</th>
              <th className="table-header-cell">Aksi</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {performanceData.map((item) => (
              <tr key={item.id} className="table-row">
                <td className="table-data">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="font-medium text-gray-600">
                        {item.employee.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{item.employee}</div>
                      <div className="text-sm text-gray-500">{item.position}</div>
                    </div>
                  </div>
                </td>
                <td className="table-data">{item.department}</td>
                <td className="table-data font-bold">{item.rating}/5.0</td>
                <td className="table-data">
                  <Badge
                    className={`${statusColors[item.status]} text-white font-normal`}
                  >
                    {statusLabels[item.status]}
                  </Badge>
                </td>
                <td className="table-data">{item.goals}</td>
                <td className="table-data">
                  {item.trend === "up" && (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  )}
                  {item.trend === "down" && (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                  {item.trend === "stable" && (
                    <div className="h-1 w-5 bg-gray-400 rounded-full mx-auto" />
                  )}
                </td>
                <td className="table-data">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Performance;

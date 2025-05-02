
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartBar, 
  User,
  Goal,
  Award,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import KPIList from "@/components/performance/KPIList";
import OKRList from "@/components/performance/OKRList";

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

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">KPI Aktif</p>
                <p className="text-3xl font-bold mt-1">24</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Goal className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">5% naik</span>
              <span className="text-gray-500 ml-1">dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">OKR Aktif</p>
                <p className="text-3xl font-bold mt-1">12</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">8% naik</span>
              <span className="text-gray-500 ml-1">dari kuartal lalu</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pencapaian Rata-rata</p>
                <p className="text-3xl font-bold mt-1">78%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ChartBar className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">3% naik</span>
              <span className="text-gray-500 ml-1">dari target</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Evaluasi Kinerja</p>
                <p className="text-3xl font-bold mt-1">42</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <User className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-red-500 font-medium">2% turun</span>
              <span className="text-gray-500 ml-1">dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>

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

      <Tabs defaultValue="kpi" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="kpi">KPI</TabsTrigger>
          <TabsTrigger value="okr">OKR</TabsTrigger>
          <TabsTrigger value="employee">Evaluasi Karyawan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="kpi" className="mt-0">
          <KPIList />
        </TabsContent>
        
        <TabsContent value="okr" className="mt-0">
          <OKRList />
        </TabsContent>
        
        <TabsContent value="employee" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Evaluasi Kinerja Karyawan</CardTitle>
            </CardHeader>
            <CardContent>
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
                            <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
                            <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
                            <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Performance;

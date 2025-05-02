
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface EmployeePerformance {
  id: number;
  employee: string;
  position: string;
  department: string;
  rating: number;
  status: string;
  reviewDate: string;
  projects: number;
  goals: string;
  trend: string;
}

interface EmployeeEvaluationProps {
  data: EmployeePerformance[];
  statusColors: Record<string, string>;
  statusLabels: Record<string, string>;
}

const EmployeeEvaluation: React.FC<EmployeeEvaluationProps> = ({
  data,
  statusColors,
  statusLabels,
}) => {
  return (
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
              {data.map((item) => (
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
  );
};

export default EmployeeEvaluation;

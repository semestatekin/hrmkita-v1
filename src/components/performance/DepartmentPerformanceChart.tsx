
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DepartmentPerformanceProps {
  data: { name: string; rating: number }[];
}

const DepartmentPerformanceChart: React.FC<DepartmentPerformanceProps> = ({ data }) => {
  return (
    <Card className="md:col-span-2 lg:col-span-3 card-dashboard">
      <CardHeader>
        <CardTitle>Kinerja Berdasarkan Departemen</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
  );
};

export default DepartmentPerformanceChart;

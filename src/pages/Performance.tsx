
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "lucide-react";
import KPIList from "@/components/performance/KPIList";
import OKRList from "@/components/performance/OKRList";
import StatisticsCards from "@/components/performance/StatisticsCards";
import DepartmentPerformanceChart from "@/components/performance/DepartmentPerformanceChart";
import EmployeeEvaluation from "@/components/performance/EmployeeEvaluation";
import { performanceData, statusColors, statusLabels, departmentPerformance } from "@/data/performanceData";

const Performance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manajemen Kinerja</h2>
        <Button>
          <User className="mr-2 h-4 w-4" /> Evaluasi Baru
        </Button>
      </div>

      <StatisticsCards />
      <DepartmentPerformanceChart data={departmentPerformance} />

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
          <EmployeeEvaluation 
            data={performanceData} 
            statusColors={statusColors} 
            statusLabels={statusLabels} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Performance;

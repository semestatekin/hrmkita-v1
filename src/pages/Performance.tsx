import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { User, Plus } from "lucide-react";
import KPIList from "@/components/performance/KPIList";
import OKRList from "@/components/performance/OKRList";
import StatisticsCards from "@/components/performance/StatisticsCards";
import DepartmentPerformanceChart from "@/components/performance/DepartmentPerformanceChart";
import EmployeeEvaluation from "@/components/performance/EmployeeEvaluation";
import { performanceData, statusColors, statusLabels, departmentPerformance } from "@/data/performanceData";
import { toast } from "sonner";

const Performance: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [evaluationType, setEvaluationType] = useState<'kpi' | 'okr' | 'employee'>('employee');

  const handleCreateEvaluation = () => {
    setIsDialogOpen(true);
  };

  const handleTypeChange = (type: 'kpi' | 'okr' | 'employee') => {
    setEvaluationType(type);
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    
    let message = "";
    switch (evaluationType) {
      case 'kpi':
        message = "KPI baru telah ditambahkan";
        break;
      case 'okr':
        message = "OKR baru telah ditambahkan";
        break;
      case 'employee':
        message = "Evaluasi karyawan baru telah dibuat";
        break;
    }
    
    toast.success(message);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manajemen Kinerja</h2>
        <Button onClick={handleCreateEvaluation}>
          <User className="mr-2 h-4 w-4" /> Evaluasi Baru
        </Button>
      </div>

      <StatisticsCards />
      <DepartmentPerformanceChart data={departmentPerformance} />

      <Tabs defaultValue="kpi" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="kpi" onClick={() => setEvaluationType('kpi')}>KPI</TabsTrigger>
          <TabsTrigger value="okr" onClick={() => setEvaluationType('okr')}>OKR</TabsTrigger>
          <TabsTrigger value="employee" onClick={() => setEvaluationType('employee')}>Evaluasi Karyawan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="kpi" className="mt-0">
          <div className="flex justify-end mb-4">
            <Button size="sm" onClick={() => handleTypeChange('kpi')}>
              <Plus className="mr-2 h-4 w-4" /> Tambah KPI
            </Button>
          </div>
          <KPIList />
        </TabsContent>
        
        <TabsContent value="okr" className="mt-0">
          <div className="flex justify-end mb-4">
            <Button size="sm" onClick={() => handleTypeChange('okr')}>
              <Plus className="mr-2 h-4 w-4" /> Tambah OKR
            </Button>
          </div>
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

      {/* Add New Evaluation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {evaluationType === 'kpi' && 'Tambah KPI Baru'}
              {evaluationType === 'okr' && 'Tambah OKR Baru'}
              {evaluationType === 'employee' && 'Tambah Evaluasi Karyawan'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <p className="text-sm text-gray-500">
                Form input untuk menambahkan {evaluationType === 'kpi' ? 'KPI' : evaluationType === 'okr' ? 'OKR' : 'evaluasi karyawan'} baru akan ditampilkan di sini.
              </p>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Performance;

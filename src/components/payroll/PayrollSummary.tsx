
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PayrollSummary as PayrollSummaryType } from "@/types/payroll";

interface PayrollSummaryProps {
  summary: PayrollSummaryType;
}

const PayrollSummary: React.FC<PayrollSummaryProps> = ({ summary }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card className="card-dashboard">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Total Penggajian</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <span className="text-2xl font-bold">{summary.totalAmount}</span>
          <p className="text-xs text-muted-foreground">{summary.employeeCount} karyawan</p>
        </CardContent>
      </Card>
      
      <Card className="card-dashboard">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Rata-rata Gaji</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <span className="text-2xl font-bold">{summary.averageSalary}</span>
        </CardContent>
      </Card>
      
      <Card className="card-dashboard">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Total Bonus</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <span className="text-2xl font-bold">{summary.totalBonus}</span>
        </CardContent>
      </Card>
      
      <Card className="card-dashboard">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Total Potongan</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <span className="text-2xl font-bold">{summary.totalDeductions}</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollSummary;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, FileText, Download, Filter, Search, MoreHorizontal } from "lucide-react";

// Sample payroll data
const payrollData = [
  {
    id: 1,
    employee: "Budi Santoso",
    position: "Senior Developer",
    salary: "Rp 15.000.000",
    bonus: "Rp 2.500.000",
    deductions: "Rp 1.750.000",
    total: "Rp 15.750.000",
    status: "paid",
    date: "28 Mei 2023",
  },
  {
    id: 2,
    employee: "Siti Nurhayati",
    position: "UI/UX Designer",
    salary: "Rp 12.000.000",
    bonus: "Rp 1.800.000",
    deductions: "Rp 1.350.000",
    total: "Rp 12.450.000",
    status: "paid",
    date: "28 Mei 2023",
  },
  {
    id: 3,
    employee: "Andi Wijaya",
    position: "Project Manager",
    salary: "Rp 18.000.000",
    bonus: "Rp 3.000.000",
    deductions: "Rp 2.100.000",
    total: "Rp 18.900.000",
    status: "paid",
    date: "28 Mei 2023",
  },
  {
    id: 4,
    employee: "Dewi Sartika",
    position: "HR Specialist",
    salary: "Rp 10.000.000",
    bonus: "Rp 1.200.000",
    deductions: "Rp 1.100.000",
    total: "Rp 10.100.000",
    status: "processing",
    date: "28 Mei 2023",
  },
  {
    id: 5,
    employee: "Rudi Hartono",
    position: "Sales Executive",
    salary: "Rp 9.000.000",
    bonus: "Rp 3.500.000",
    deductions: "Rp 1.250.000",
    total: "Rp 11.250.000",
    status: "paid",
    date: "28 Mei 2023",
  },
];

const statusColors: Record<string, string> = {
  paid: "bg-green-500",
  processing: "bg-yellow-500",
  pending: "bg-gray-500",
};

const statusLabels: Record<string, string> = {
  paid: "Dibayarkan",
  processing: "Diproses",
  pending: "Menunggu",
};

const Payroll: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Penggajian</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Mei 2023
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Buat Penggajian
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Total Penggajian</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-2xl font-bold">Rp 68.450.000</span>
            <p className="text-xs text-muted-foreground">5 karyawan</p>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Gaji</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-2xl font-bold">Rp 13.690.000</span>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Total Bonus</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-2xl font-bold">Rp 12.000.000</span>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Total Potongan</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-2xl font-bold">Rp 7.550.000</span>
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
              <th className="table-header-cell">Gaji Pokok</th>
              <th className="table-header-cell">Bonus</th>
              <th className="table-header-cell">Potongan</th>
              <th className="table-header-cell">Total Gaji</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Aksi</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {payrollData.map((item) => (
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
                <td className="table-data">{item.salary}</td>
                <td className="table-data">{item.bonus}</td>
                <td className="table-data">{item.deductions}</td>
                <td className="table-data font-bold">{item.total}</td>
                <td className="table-data">
                  <Badge
                    className={`${statusColors[item.status]} text-white font-normal`}
                  >
                    {statusLabels[item.status]}
                  </Badge>
                </td>
                <td className="table-data">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Unduh Slip
                      </DropdownMenuItem>
                      <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;

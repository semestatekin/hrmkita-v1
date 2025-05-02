
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

// Sample designations data
const designations = [
  {
    id: 1,
    title: "Senior Developer",
    department: "Engineering",
    level: "Senior",
    employeeCount: 5,
    minSalary: "Rp 12.000.000",
    maxSalary: "Rp 18.000.000",
  },
  {
    id: 2,
    title: "Junior Developer",
    department: "Engineering",
    level: "Junior",
    employeeCount: 8,
    minSalary: "Rp 8.000.000",
    maxSalary: "Rp 12.000.000",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    level: "Mid",
    employeeCount: 4,
    minSalary: "Rp 10.000.000",
    maxSalary: "Rp 15.000.000",
  },
  {
    id: 4,
    title: "Project Manager",
    department: "Management",
    level: "Senior",
    employeeCount: 3,
    minSalary: "Rp 15.000.000",
    maxSalary: "Rp 22.000.000",
  },
  {
    id: 5,
    title: "HR Specialist",
    department: "Human Resources",
    level: "Mid",
    employeeCount: 2,
    minSalary: "Rp 9.000.000",
    maxSalary: "Rp 14.000.000",
  },
  {
    id: 6,
    title: "Sales Executive",
    department: "Sales",
    level: "Mid",
    employeeCount: 5,
    minSalary: "Rp 8.000.000",
    maxSalary: "Rp 16.000.000",
  },
  {
    id: 7,
    title: "Finance Manager",
    department: "Finance",
    level: "Senior",
    employeeCount: 1,
    minSalary: "Rp 15.000.000",
    maxSalary: "Rp 20.000.000",
  },
  {
    id: 8,
    title: "Marketing Specialist",
    department: "Marketing",
    level: "Mid",
    employeeCount: 3,
    minSalary: "Rp 9.000.000",
    maxSalary: "Rp 13.000.000",
  },
];

const Designations: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Jabatan</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Jabatan
        </Button>
      </div>

      <Card className="card-dashboard mb-6">
        <CardHeader>
          <CardTitle>Semua Jabatan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Cari jabatan..." className="pl-9" />
            </div>
          </div>

          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Departemen</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Jumlah Karyawan</TableHead>
                  <TableHead>Rentang Gaji</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {designations.map((designation) => (
                  <TableRow key={designation.id}>
                    <TableCell className="font-medium">{designation.title}</TableCell>
                    <TableCell>{designation.department}</TableCell>
                    <TableCell>{designation.level}</TableCell>
                    <TableCell>{designation.employeeCount}</TableCell>
                    <TableCell>
                      {designation.minSalary} - {designation.maxSalary}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Designations;

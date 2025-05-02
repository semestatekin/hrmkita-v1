
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, Edit, Trash2 } from "lucide-react";

// Sample departments data
const departments = [
  {
    id: 1,
    name: "Engineering",
    description: "Pengembangan produk dan teknologi",
    employeeCount: 15,
    manager: "Budi Santoso",
    established: "2018",
  },
  {
    id: 2,
    name: "Design",
    description: "UI/UX dan desain produk",
    employeeCount: 8,
    manager: "Siti Nurhayati",
    established: "2018",
  },
  {
    id: 3,
    name: "Management",
    description: "Manajemen proyek dan operasional",
    employeeCount: 6,
    manager: "Andi Wijaya",
    established: "2018",
  },
  {
    id: 4,
    name: "Human Resources",
    description: "Rekrutmen dan manajemen SDM",
    employeeCount: 4,
    manager: "Dewi Sartika",
    established: "2019",
  },
  {
    id: 5,
    name: "Sales",
    description: "Pemasaran dan penjualan",
    employeeCount: 7,
    manager: "Rudi Hartono",
    established: "2019",
  },
  {
    id: 6,
    name: "Finance",
    description: "Keuangan dan akuntansi",
    employeeCount: 3,
    manager: "Maya Indah",
    established: "2019",
  },
];

const Departments: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Departemen</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Departemen
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Cari departemen..." className="pl-9" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <Card key={department.id} className="overflow-hidden border-gray-200 shadow-sm">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-hrm-primary/10 p-2 rounded-md">
                    <Users className="h-5 w-5 text-hrm-primary" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-1">{department.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{department.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Jumlah Karyawan</p>
                    <p className="font-medium">{department.employeeCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Tahun Dibentuk</p>
                    <p className="font-medium">{department.established}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="font-medium text-gray-600">
                      {department.manager.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Manajer</p>
                    <p className="font-medium">{department.manager}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Departments;

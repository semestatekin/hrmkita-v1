
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone } from "lucide-react";

// Sample employee data
const employees = [
  {
    id: 1,
    name: "Budi Santoso",
    position: "Senior Developer",
    department: "Engineering",
    email: "budi.santoso@haisemesta.id",
    phone: "+62 812-3456-7890",
    status: "active",
  },
  {
    id: 2,
    name: "Siti Nurhayati",
    position: "UI/UX Designer",
    department: "Design",
    email: "siti.nurhayati@haisemesta.id",
    phone: "+62 821-0987-6543",
    status: "active",
  },
  {
    id: 3,
    name: "Andi Wijaya",
    position: "Project Manager",
    department: "Management",
    email: "andi.wijaya@haisemesta.id",
    phone: "+62 856-7890-1234",
    status: "active",
  },
  {
    id: 4,
    name: "Dewi Sartika",
    position: "HR Specialist",
    department: "Human Resources",
    email: "dewi.sartika@haisemesta.id",
    phone: "+62 877-8901-2345",
    status: "on-leave",
  },
  {
    id: 5,
    name: "Rudi Hartono",
    position: "Sales Executive",
    department: "Sales",
    email: "rudi.hartono@haisemesta.id",
    phone: "+62 898-9012-3456",
    status: "active",
  },
  {
    id: 6,
    name: "Maya Indah",
    position: "Finance Manager",
    department: "Finance",
    email: "maya.indah@haisemesta.id",
    phone: "+62 819-0123-4567",
    status: "active",
  },
  {
    id: 7,
    name: "Dian Sastro",
    position: "Marketing Specialist",
    department: "Marketing",
    email: "dian.sastro@haisemesta.id",
    phone: "+62 831-1234-5678",
    status: "inactive",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-green-500",
  inactive: "bg-red-500",
  "on-leave": "bg-yellow-500",
};

const statusLabels: Record<string, string> = {
  active: "Aktif",
  inactive: "Tidak Aktif",
  "on-leave": "Cuti",
};

const Employees: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manajemen Karyawan</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Karyawan
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cari karyawan..."
              className="pl-9"
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Semua Departemen</DropdownMenuItem>
            <DropdownMenuItem>Engineering</DropdownMenuItem>
            <DropdownMenuItem>Design</DropdownMenuItem>
            <DropdownMenuItem>Management</DropdownMenuItem>
            <DropdownMenuItem>Human Resources</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="table-container">
        <table className="table-hrm">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Nama</th>
              <th className="table-header-cell">Jabatan</th>
              <th className="table-header-cell">Departemen</th>
              <th className="table-header-cell">Kontak</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Aksi</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {employees.map((employee) => (
              <tr key={employee.id} className="table-row">
                <td className="table-data">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="font-medium text-gray-600">
                        {employee.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{employee.name}</div>
                    </div>
                  </div>
                </td>
                <td className="table-data">
                  <div className="text-gray-900">{employee.position}</div>
                </td>
                <td className="table-data">
                  <div className="text-gray-900">{employee.department}</div>
                </td>
                <td className="table-data">
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Mail className="h-3 w-3 mr-1" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{employee.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="table-data">
                  <Badge
                    className={`${statusColors[employee.status]} text-white font-normal`}
                  >
                    {statusLabels[employee.status]}
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
                      <DropdownMenuItem>Lihat Profil</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Kelola Peran</DropdownMenuItem>
                      <DropdownMenuItem>Nonaktifkan</DropdownMenuItem>
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

export default Employees;

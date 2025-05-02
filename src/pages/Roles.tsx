
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

// Sample roles data
const roles = [
  {
    id: 1,
    name: "Administrator",
    description: "Akses penuh ke seluruh sistem",
    permissions: [
      "Manajemen Pengguna",
      "Manajemen Peran",
      "Manajemen Departemen",
      "Manajemen Jabatan",
      "Manajemen Gaji",
      "Manajemen Kehadiran",
    ],
    users: 3,
  },
  {
    id: 2,
    name: "HR Manager",
    description: "Manajemen karyawan dan absensi",
    permissions: [
      "Manajemen Karyawan",
      "Manajemen Absensi",
      "Manajemen Cuti",
      "Laporan HR",
    ],
    users: 2,
  },
  {
    id: 3,
    name: "Project Manager",
    description: "Manajemen proyek dan tugas",
    permissions: [
      "Manajemen Proyek",
      "Manajemen Tugas",
      "Laporan Proyek",
      "Manajemen Tim",
    ],
    users: 5,
  },
  {
    id: 4,
    name: "Karyawan",
    description: "Akses terbatas untuk karyawan biasa",
    permissions: [
      "Lihat Absensi Sendiri",
      "Lihat Gaji Sendiri",
      "Lihat Tugas Sendiri",
      "Pengajuan Cuti",
    ],
    users: 35,
  },
  {
    id: 5,
    name: "Finance Manager",
    description: "Manajemen keuangan dan gaji",
    permissions: [
      "Manajemen Gaji",
      "Laporan Keuangan",
      "Persetujuan Pengeluaran",
    ],
    users: 2,
  },
];

const Roles: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manajemen Peran Karyawan</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Peran
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Cari peran..." className="pl-9" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id} className="overflow-hidden border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold">{role.name}</h3>
                  <p className="text-sm text-gray-500">{role.description}</p>
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
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Hak Akses:</h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Jumlah Pengguna</span>
                <span className="font-medium">{role.users}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Roles;

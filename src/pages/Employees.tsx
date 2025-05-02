
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Employee } from "@/types/employee";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "@/services/employeeService";

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
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load employees data
  useEffect(() => {
    const loadedEmployees = getEmployees();
    setEmployees(loadedEmployees);
    setFilteredEmployees(loadedEmployees);
  }, []);

  // Filter employees when search or department filter changes
  useEffect(() => {
    let filtered = employees;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (employee) => 
          employee.name.toLowerCase().includes(query) || 
          employee.position.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query)
      );
    }
    
    // Apply department filter
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(
        (employee) => employee.department === selectedDepartment
      );
    }
    
    setFilteredEmployees(filtered);
  }, [searchQuery, selectedDepartment, employees]);

  // Get unique departments for the filter dropdown
  const departments = ["all", ...Array.from(new Set(employees.map(emp => emp.department)))];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
  };

  const handleAddEmployee = () => {
    setCurrentEmployee(null);
    setIsDialogOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentEmployee) {
      deleteEmployee(currentEmployee.id);
      setEmployees(getEmployees());
      setIsDeleteDialogOpen(false);
      toast({
        title: "Karyawan dihapus",
        description: `${currentEmployee.name} telah dihapus dari sistem.`,
      });
    }
  };

  // This would be expanded in a real implementation
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling would go here in a real implementation
    setIsDialogOpen(false);
    
    // For demonstration, we'll just show a toast
    toast({
      title: currentEmployee ? "Karyawan diperbarui" : "Karyawan ditambahkan",
      description: "Data karyawan telah berhasil disimpan.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manajemen Karyawan</h2>
        <Button onClick={handleAddEmployee}>
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
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {selectedDepartment === "all" ? "Semua Departemen" : selectedDepartment}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {departments.map((dept) => (
              <DropdownMenuItem 
                key={dept} 
                onClick={() => handleDepartmentChange(dept)}
              >
                {dept === "all" ? "Semua Departemen" : dept}
              </DropdownMenuItem>
            ))}
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
            {filteredEmployees.map((employee) => (
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
                      <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(employee)}>
                        Nonaktifkan
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Employee Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEmployee ? "Edit Karyawan" : "Tambah Karyawan Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              {/* Form fields would go here */}
              <p className="text-sm text-gray-500">
                Form input untuk {currentEmployee ? "mengedit" : "menambahkan"} data karyawan akan ditampilkan di sini.
              </p>
            </div>
            <DialogFooter>
              <Button type="submit">
                {currentEmployee ? "Simpan Perubahan" : "Tambah Karyawan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Apakah Anda yakin ingin menghapus karyawan {currentEmployee?.name}? Tindakan ini tidak dapat dibatalkan.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;

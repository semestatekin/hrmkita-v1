
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone, LayoutGrid, LayoutList } from "lucide-react";
import { Employee, statusColors, statusLabels } from "@/types/employee";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "@/services/employeeService";
import { toast } from "sonner";
import EmployeeForm from "@/components/employees/EmployeeForm";
import EmployeeCard from "@/components/employees/EmployeeCard";
import ColumnVisibilityDropdown from "@/components/employees/ColumnVisibilityDropdown";
import { format } from "date-fns";

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Column visibility state
  const [columns, setColumns] = useState([
    { id: "name", label: "Nama", isVisible: true },
    { id: "position", label: "Jabatan", isVisible: true },
    { id: "department", label: "Departemen", isVisible: true },
    { id: "contact", label: "Kontak", isVisible: true },
    { id: "joinDate", label: "Tanggal Bergabung", isVisible: true },
    { id: "status", label: "Status", isVisible: true },
  ]);

  // Load employees data
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    const loadedEmployees = getEmployees();
    setEmployees(loadedEmployees);
    setFilteredEmployees(loadedEmployees);
  };

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
    setCurrentEmployee(undefined);
    setIsDialogOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setEmployeeToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (employeeToDelete !== null) {
      deleteEmployee(employeeToDelete);
      loadEmployees();
      setIsDeleteDialogOpen(false);
      setEmployeeToDelete(null);
      toast.success("Karyawan berhasil dihapus");
    }
  };

  const handleFormSubmit = (data: Omit<Employee, "id"> | Employee) => {
    try {
      if ("id" in data) {
        // Update existing employee
        updateEmployee(data);
        toast.success("Data karyawan berhasil diperbarui");
      } else {
        // Create new employee
        createEmployee(data);
        toast.success("Karyawan baru berhasil ditambahkan");
      }
      loadEmployees();
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan data");
      console.error(error);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  const toggleColumnVisibility = (columnId: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? { ...column, isVisible: !column.isVisible }
          : column
      )
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch (error) {
      return dateString;
    }
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
        
        <Button variant="outline" onClick={toggleViewMode}>
          {viewMode === "list" ? (
            <>
              <LayoutGrid className="mr-2 h-4 w-4" />
              Grid
            </>
          ) : (
            <>
              <LayoutList className="mr-2 h-4 w-4" />
              List
            </>
          )}
        </Button>
        
        {viewMode === "list" && (
          <ColumnVisibilityDropdown 
            columns={columns} 
            onToggleColumnVisibility={toggleColumnVisibility} 
          />
        )}
      </div>

      {viewMode === "list" ? (
        <div className="table-container">
          <table className="table-hrm">
            <thead className="table-header">
              <tr>
                {columns.find(c => c.id === "name")?.isVisible && <th className="table-header-cell">Nama</th>}
                {columns.find(c => c.id === "position")?.isVisible && <th className="table-header-cell">Jabatan</th>}
                {columns.find(c => c.id === "department")?.isVisible && <th className="table-header-cell">Departemen</th>}
                {columns.find(c => c.id === "contact")?.isVisible && <th className="table-header-cell">Kontak</th>}
                {columns.find(c => c.id === "joinDate")?.isVisible && <th className="table-header-cell">Tanggal Bergabung</th>}
                {columns.find(c => c.id === "status")?.isVisible && <th className="table-header-cell">Status</th>}
                <th className="table-header-cell">Aksi</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="table-row">
                    {columns.find(c => c.id === "name")?.isVisible && (
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
                    )}
                    {columns.find(c => c.id === "position")?.isVisible && (
                      <td className="table-data">
                        <div className="text-gray-900">{employee.position}</div>
                      </td>
                    )}
                    {columns.find(c => c.id === "department")?.isVisible && (
                      <td className="table-data">
                        <div className="text-gray-900">{employee.department}</div>
                      </td>
                    )}
                    {columns.find(c => c.id === "contact")?.isVisible && (
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
                    )}
                    {columns.find(c => c.id === "joinDate")?.isVisible && (
                      <td className="table-data">
                        {formatDate(employee.joinDate)}
                      </td>
                    )}
                    {columns.find(c => c.id === "status")?.isVisible && (
                      <td className="table-data">
                        <Badge
                          className={`${statusColors[employee.status]} text-white font-normal`}
                        >
                          {statusLabels[employee.status]}
                        </Badge>
                      </td>
                    )}
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
                          <DropdownMenuItem 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteClick(employee.id)}
                          >
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="table-data text-center py-10">
                    {searchQuery ? "Tidak ada karyawan yang sesuai dengan pencarian" : "Tidak ada data karyawan"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              {searchQuery ? "Tidak ada karyawan yang sesuai dengan pencarian" : "Tidak ada data karyawan"}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Employee Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentEmployee ? "Edit Karyawan" : "Tambah Karyawan Baru"}
            </DialogTitle>
          </DialogHeader>
          <EmployeeForm
            employee={currentEmployee}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus karyawan ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-500 hover:bg-red-700 text-white"
              onClick={handleDeleteConfirm}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Employees;

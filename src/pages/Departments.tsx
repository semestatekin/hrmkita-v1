
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Department } from "@/types/department";
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from "@/services/departmentService";
import DepartmentForm from "@/components/departments/DepartmentForm";
import { toast } from "sonner";

const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Department | undefined>(undefined);
  const [departmentToDelete, setDepartmentToDelete] = useState<number | null>(null);

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDepartments(departments);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredDepartments(
        departments.filter((department) =>
          department.name.toLowerCase().includes(lowercaseQuery) ||
          department.description.toLowerCase().includes(lowercaseQuery) ||
          department.manager.toLowerCase().includes(lowercaseQuery)
        )
      );
    }
  }, [searchQuery, departments]);

  const loadDepartments = () => {
    const data = getDepartments();
    setDepartments(data);
    setFilteredDepartments(data);
  };

  const handleAddDepartment = () => {
    setCurrentDepartment(undefined);
    setIsDialogOpen(true);
  };

  const handleEditDepartment = (department: Department) => {
    setCurrentDepartment(department);
    setIsDialogOpen(true);
  };

  const handleDeleteDepartment = (id: number) => {
    setDepartmentToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteDepartment = () => {
    if (departmentToDelete !== null) {
      deleteDepartment(departmentToDelete);
      loadDepartments();
      toast.success("Departemen berhasil dihapus");
      setIsDeleteDialogOpen(false);
      setDepartmentToDelete(null);
    }
  };

  const handleFormSubmit = (data: Omit<Department, "id"> | Department) => {
    if ("id" in data) {
      // Update existing department
      updateDepartment(data);
      toast.success("Departemen berhasil diperbarui");
    } else {
      // Create new department
      createDepartment(data);
      toast.success("Departemen baru berhasil ditambahkan");
    }
    loadDepartments();
    setIsDialogOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Departemen</h2>
        <Button onClick={handleAddDepartment}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Departemen
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Cari departemen..." 
            className="pl-9" 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDepartments.map((department) => (
          <Card key={department.id} className="overflow-hidden border-gray-200 shadow-sm">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-hrm-primary/10 p-2 rounded-md">
                    <Users className="h-5 w-5 text-hrm-primary" />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-500"
                      onClick={() => handleEditDepartment(department)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-500"
                      onClick={() => handleDeleteDepartment(department.id)}
                    >
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

      {/* Dialog for Add/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentDepartment ? "Edit Departemen" : "Tambah Departemen Baru"}
            </DialogTitle>
          </DialogHeader>
          <DepartmentForm
            department={currentDepartment}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Delete */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus departemen ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteDepartment}
              className="bg-red-500 hover:bg-red-700 text-white"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Departments;

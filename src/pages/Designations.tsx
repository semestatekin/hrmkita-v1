
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Designation } from "@/types/designation";
import { getDesignations, createDesignation, updateDesignation, deleteDesignation } from "@/services/designationService";
import DesignationForm from "@/components/designations/DesignationForm";
import { toast } from "sonner";

const Designations: React.FC = () => {
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [filteredDesignations, setFilteredDesignations] = useState<Designation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentDesignation, setCurrentDesignation] = useState<Designation | undefined>(undefined);
  const [designationToDelete, setDesignationToDelete] = useState<number | null>(null);

  useEffect(() => {
    loadDesignations();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDesignations(designations);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredDesignations(
        designations.filter((designation) =>
          designation.title.toLowerCase().includes(lowercaseQuery) ||
          designation.department.toLowerCase().includes(lowercaseQuery) ||
          designation.level.toLowerCase().includes(lowercaseQuery)
        )
      );
    }
  }, [searchQuery, designations]);

  const loadDesignations = () => {
    const data = getDesignations();
    setDesignations(data);
    setFilteredDesignations(data);
  };

  const handleAddDesignation = () => {
    setCurrentDesignation(undefined);
    setIsDialogOpen(true);
  };

  const handleEditDesignation = (designation: Designation) => {
    setCurrentDesignation(designation);
    setIsDialogOpen(true);
  };

  const handleDeleteDesignation = (id: number) => {
    setDesignationToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteDesignation = () => {
    if (designationToDelete !== null) {
      deleteDesignation(designationToDelete);
      loadDesignations();
      toast.success("Jabatan berhasil dihapus");
      setIsDeleteDialogOpen(false);
      setDesignationToDelete(null);
    }
  };

  const handleFormSubmit = (data: Omit<Designation, "id"> | Designation) => {
    if ("id" in data) {
      // Update existing designation
      updateDesignation(data);
      toast.success("Jabatan berhasil diperbarui");
    } else {
      // Create new designation
      createDesignation(data);
      toast.success("Jabatan baru berhasil ditambahkan");
    }
    loadDesignations();
    setIsDialogOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Jabatan</h2>
        <Button onClick={handleAddDesignation}>
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
              <Input 
                placeholder="Cari jabatan..." 
                className="pl-9" 
                value={searchQuery}
                onChange={handleSearchChange}
              />
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
                {filteredDesignations.length > 0 ? (
                  filteredDesignations.map((designation) => (
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
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleEditDesignation(designation)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                            onClick={() => handleDeleteDesignation(designation.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {searchQuery ? "Tidak ada jabatan yang sesuai dengan pencarian" : "Tidak ada data jabatan"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog for Add/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentDesignation ? "Edit Jabatan" : "Tambah Jabatan Baru"}
            </DialogTitle>
          </DialogHeader>
          <DesignationForm
            designation={currentDesignation}
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
              Apakah Anda yakin ingin menghapus jabatan ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteDesignation}
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

export default Designations;

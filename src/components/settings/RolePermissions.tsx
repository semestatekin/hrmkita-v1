
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck, Plus, Search, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Permission {
  id: string;
  name: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
}

const mockPermissions: Permission[] = [
  // User Management
  { id: "user.create", name: "Tambah Pengguna", category: "Manajemen Pengguna" },
  { id: "user.read", name: "Lihat Pengguna", category: "Manajemen Pengguna" },
  { id: "user.update", name: "Edit Pengguna", category: "Manajemen Pengguna" },
  { id: "user.delete", name: "Hapus Pengguna", category: "Manajemen Pengguna" },
  
  // Employee Management
  { id: "employee.create", name: "Tambah Karyawan", category: "Manajemen Karyawan" },
  { id: "employee.read", name: "Lihat Karyawan", category: "Manajemen Karyawan" },
  { id: "employee.update", name: "Edit Karyawan", category: "Manajemen Karyawan" },
  { id: "employee.delete", name: "Hapus Karyawan", category: "Manajemen Karyawan" },
  
  // Payroll
  { id: "payroll.create", name: "Buat Payroll", category: "Penggajian" },
  { id: "payroll.read", name: "Lihat Payroll", category: "Penggajian" },
  { id: "payroll.update", name: "Edit Payroll", category: "Penggajian" },
  { id: "payroll.delete", name: "Hapus Payroll", category: "Penggajian" },
  
  // Projects
  { id: "project.create", name: "Tambah Proyek", category: "Manajemen Proyek" },
  { id: "project.read", name: "Lihat Proyek", category: "Manajemen Proyek" },
  { id: "project.update", name: "Edit Proyek", category: "Manajemen Proyek" },
  { id: "project.delete", name: "Hapus Proyek", category: "Manajemen Proyek" },
  
  // Reports
  { id: "report.hr", name: "Laporan HR", category: "Laporan" },
  { id: "report.finance", name: "Laporan Keuangan", category: "Laporan" },
  { id: "report.project", name: "Laporan Proyek", category: "Laporan" },
  
  // Settings
  { id: "settings.company", name: "Pengaturan Perusahaan", category: "Pengaturan" },
  { id: "settings.system", name: "Pengaturan Sistem", category: "Pengaturan" }
];

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Administrator",
    description: "Akses penuh ke seluruh sistem",
    permissions: mockPermissions.map(p => p.id),
    userCount: 3,
    isSystem: true
  },
  {
    id: "2",
    name: "HR Manager",
    description: "Manajemen karyawan dan absensi",
    permissions: [
      "employee.create", "employee.read", "employee.update", "employee.delete",
      "payroll.read", "report.hr"
    ],
    userCount: 2,
    isSystem: false
  },
  {
    id: "3",
    name: "Project Manager",
    description: "Manajemen proyek dan tugas",
    permissions: [
      "project.create", "project.read", "project.update", "project.delete",
      "employee.read", "report.project"
    ],
    userCount: 5,
    isSystem: false
  },
  {
    id: "4",
    name: "Karyawan",
    description: "Akses terbatas untuk karyawan biasa",
    permissions: ["employee.read"],
    userCount: 35,
    isSystem: true
  }
];

export const RolePermissions: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [permissions] = useState<Permission[]>(mockPermissions);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[]
  });

  const { toast } = useToast();

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const handleAddRole = () => {
    setEditingRole(null);
    setFormData({
      name: "",
      description: "",
      permissions: []
    });
    setIsDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    if (role.isSystem) {
      toast({
        title: "Tidak Diizinkan",
        description: "Peran sistem tidak dapat diedit",
        variant: "destructive"
      });
      return;
    }
    
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    });
    setIsDialogOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isSystem) {
      toast({
        title: "Tidak Diizinkan",
        description: "Peran sistem tidak dapat dihapus",
        variant: "destructive"
      });
      return;
    }
    
    setRoles(prev => prev.filter(role => role.id !== roleId));
    toast({
      title: "Berhasil",
      description: "Peran berhasil dihapus",
    });
  };

  const handleSaveRole = () => {
    if (editingRole) {
      // Update existing role
      setRoles(prev => prev.map(role => 
        role.id === editingRole.id 
          ? { 
              ...role, 
              name: formData.name,
              description: formData.description,
              permissions: formData.permissions
            }
          : role
      ));
      toast({
        title: "Berhasil",
        description: "Peran berhasil diperbarui",
      });
    } else {
      // Add new role
      const newRole: Role = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions,
        userCount: 0,
        isSystem: false
      };
      setRoles(prev => [...prev, newRole]);
      toast({
        title: "Berhasil",
        description: "Peran baru berhasil ditambahkan",
      });
    }
    setIsDialogOpen(false);
  };

  const handlePermissionToggle = (permissionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(id => id !== permissionId)
    }));
  };

  const getPermissionsByCategory = (rolePermissions: string[]) => {
    const categorized = {} as Record<string, string[]>;
    rolePermissions.forEach(permId => {
      const permission = permissions.find(p => p.id === permId);
      if (permission) {
        if (!categorized[permission.category]) {
          categorized[permission.category] = [];
        }
        categorized[permission.category].push(permission.name);
      }
    });
    return categorized;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Manajemen Peran & Hak Akses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari peran..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleAddRole} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Peran
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Peran</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Hak Akses</TableHead>
              <TableHead>Jumlah Pengguna</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.map((role) => {
              const categorizedPermissions = getPermissionsByCategory(role.permissions);
              return (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">
                    {role.name}
                    {role.isSystem && (
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Sistem
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {Object.entries(categorizedPermissions).map(([category, perms]) => (
                        <div key={category} className="mb-2">
                          <div className="text-xs font-medium text-gray-600">{category}:</div>
                          <div className="text-xs text-gray-500">
                            {perms.slice(0, 2).join(", ")}
                            {perms.length > 2 && ` (+${perms.length - 2} lainnya)`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{role.userCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditRole(role)}
                        className="h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!role.isSystem && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteRole(role.id)}
                          className="h-8 w-8 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRole ? 'Edit Peran' : 'Tambah Peran Baru'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="role-name">Nama Peran</Label>
                <Input
                  id="role-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Masukkan nama peran"
                />
              </div>
              
              <div>
                <Label htmlFor="role-description">Deskripsi</Label>
                <Textarea
                  id="role-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Masukkan deskripsi peran"
                  rows={2}
                />
              </div>
              
              <div>
                <Label>Hak Akses</Label>
                <div className="space-y-4 max-h-60 overflow-y-auto border rounded-md p-4">
                  {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                    <div key={category}>
                      <h4 className="font-medium text-sm mb-2">{category}</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {categoryPermissions.map((permission) => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={permission.id}
                              checked={formData.permissions.includes(permission.id)}
                              onCheckedChange={(checked) => 
                                handlePermissionToggle(permission.id, checked as boolean)
                              }
                            />
                            <Label htmlFor={permission.id} className="text-sm">
                              {permission.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleSaveRole}>
                {editingRole ? 'Perbarui' : 'Simpan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

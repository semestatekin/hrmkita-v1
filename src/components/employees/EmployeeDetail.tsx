
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Employee, statusColors, statusLabels } from "@/types/employee";
import { format } from "date-fns";
import { ArrowLeft, Edit, Save, X, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EmployeeDetailProps {
  employee: Employee;
  onBack: () => void;
  onSave: (employee: Employee) => void;
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({
  employee,
  onBack,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<Employee>({ ...employee });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(employee.avatar || null);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd MMMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      
      // Convert to data URL for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedEmployee(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(editedEmployee);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedEmployee({ ...employee });
    setAvatarPreview(employee.avatar || null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-3xl font-bold">Detail Karyawan</h2>
        </div>
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Batal
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Simpan
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="relative">
              {isEditing ? (
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    {avatarPreview ? (
                      <AvatarImage src={avatarPreview} alt={editedEmployee.name} />
                    ) : (
                      <AvatarFallback className="text-2xl">
                        {editedEmployee.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <input 
                      id="avatar-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleAvatarChange} 
                    />
                  </label>
                </div>
              ) : (
                <Avatar className="w-24 h-24">
                  {employee.avatar ? (
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                  ) : (
                    <AvatarFallback className="text-2xl">
                      {employee.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
              )}
            </div>
            <div className="space-y-2">
              {isEditing ? (
                <div className="space-y-2 min-w-[300px]">
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    name="name"
                    value={editedEmployee.name}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <h3 className="text-2xl font-bold">{employee.name}</h3>
              )}
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Select
                    name="status"
                    value={editedEmployee.status}
                    onValueChange={(value) => 
                      handleSelectChange("status", value as 'active' | 'inactive' | 'on-leave')
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Tidak Aktif</SelectItem>
                      <SelectItem value="on-leave">Cuti</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className={`${statusColors[employee.status]} text-white`}>
                    {statusLabels[employee.status]}
                  </Badge>
                )}
                {!isEditing && (
                  <span className="text-gray-500">
                    {employee.position} • {employee.department}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="position">Jabatan</Label>
                  <Input
                    id="position"
                    name="position"
                    value={editedEmployee.position}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Departemen</Label>
                  <Input
                    id="department"
                    name="department"
                    value={editedEmployee.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={editedEmployee.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telepon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={editedEmployee.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Tanggal Bergabung</Label>
                  <Input
                    id="joinDate"
                    name="joinDate"
                    type="date"
                    value={editedEmployee.joinDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Tanggal Lahir</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={editedEmployee.birthDate || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Gaji</Label>
                  <Input
                    id="salary"
                    name="salary"
                    value={editedEmployee.salary || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Jenis Kelamin</Label>
                  <Select
                    name="gender"
                    value={editedEmployee.gender || ""}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Laki-laki</SelectItem>
                      <SelectItem value="female">Perempuan</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={editedEmployee.address || ""}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Jabatan</h4>
                  <p>{employee.position}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Departemen</h4>
                  <p>{employee.department}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Email</h4>
                  <p>{employee.email}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Telepon</h4>
                  <p>{employee.phone}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Tanggal Bergabung</h4>
                  <p>{formatDate(employee.joinDate)}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Tanggal Lahir</h4>
                  <p>{formatDate(employee.birthDate)}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Gaji</h4>
                  <p>{employee.salary || "-"}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Jenis Kelamin</h4>
                  <p>
                    {employee.gender === "male"
                      ? "Laki-laki"
                      : employee.gender === "female"
                      ? "Perempuan"
                      : employee.gender === "other"
                      ? "Lainnya"
                      : "-"}
                  </p>
                </div>
                {employee.address && (
                  <div className="md:col-span-2">
                    <h4 className="font-medium text-gray-500 mb-1">Alamat</h4>
                    <p>{employee.address}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDetail;


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Designation } from "@/types/designation";
import { getAvailableDepartments } from "@/services/dataIntegrationService";
import { useState, useEffect } from "react";

interface DesignationFormProps {
  designation?: Designation;
  onSubmit: (data: Omit<Designation, "id"> | Designation) => void;
  onCancel: () => void;
}

const DesignationForm = ({
  designation,
  onSubmit,
  onCancel,
}: DesignationFormProps) => {
  const [formData, setFormData] = useState<Omit<Designation, "id"> | Designation>({
    title: "",
    department: "",
    level: "",
    employeeCount: 0,
    minSalary: "",
    maxSalary: "",
  });

  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);

  useEffect(() => {
    setAvailableDepartments(getAvailableDepartments());
  }, []);

  useEffect(() => {
    if (designation) {
      setFormData(designation);
    }
  }, [designation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (name === "employeeCount") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Judul Jabatan</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="department">Departemen</Label>
        <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih departemen" />
          </SelectTrigger>
          <SelectContent>
            {availableDepartments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="level">Level</Label>
        <Select value={formData.level} onValueChange={(value) => handleSelectChange("level", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Junior">Junior</SelectItem>
            <SelectItem value="Mid">Mid</SelectItem>
            <SelectItem value="Senior">Senior</SelectItem>
            <SelectItem value="Lead">Lead</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="employeeCount">Jumlah Karyawan</Label>
        <Input
          id="employeeCount"
          name="employeeCount"
          type="number"
          min="0"
          value={formData.employeeCount}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minSalary">Gaji Minimum</Label>
          <Input
            id="minSalary"
            name="minSalary"
            placeholder="Rp 0"
            value={formData.minSalary}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="maxSalary">Gaji Maksimum</Label>
          <Input
            id="maxSalary"
            name="maxSalary"
            placeholder="Rp 0"
            value={formData.maxSalary}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit">
          {designation ? "Simpan Perubahan" : "Tambah Jabatan"}
        </Button>
      </div>
    </form>
  );
};

export default DesignationForm;

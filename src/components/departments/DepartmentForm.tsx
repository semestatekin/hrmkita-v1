
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Department } from "@/types/department";
import { useState, useEffect } from "react";

interface DepartmentFormProps {
  department?: Department;
  onSubmit: (data: Omit<Department, "id"> | Department) => void;
  onCancel: () => void;
}

const DepartmentForm = ({
  department,
  onSubmit,
  onCancel,
}: DepartmentFormProps) => {
  const [formData, setFormData] = useState<Omit<Department, "id"> | Department>({
    name: "",
    description: "",
    established: "",
    employeeCount: 0,
    manager: "",
  });

  useEffect(() => {
    if (department) {
      setFormData(department);
    }
  }, [department]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
        <Label htmlFor="name">Nama Departemen</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="established">Tahun Dibentuk</Label>
        <Input
          id="established"
          name="established"
          value={formData.established}
          onChange={handleChange}
          placeholder="2023"
          required
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit">
          {department ? "Simpan Perubahan" : "Tambah Departemen"}
        </Button>
      </div>
    </form>
  );
};

export default DepartmentForm;

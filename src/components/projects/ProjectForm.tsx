
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/project";
import { format } from "date-fns";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: Omit<Project, "id"> | Project) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Omit<Project, "id"> | Project>({
    name: "",
    description: "",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), "yyyy-MM-dd"),
    status: "not-started",
    client: "",
    budget: "",
    manager: "",
    progress: 0,
    team: [],
  });

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (name === "progress") {
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

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const teamMembers = e.target.value.split(',').map(member => member.trim());
    setFormData(prev => ({
      ...prev,
      team: teamMembers
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nama Proyek</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="client">Klien</Label>
        <Input
          id="client"
          name="client"
          value={formData.client}
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
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Tanggal Mulai</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endDate">Tanggal Selesai</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            value={formData.status}
            onValueChange={(value) => 
              handleSelectChange("status", value as 'not-started' | 'in-progress' | 'on-hold' | 'completed')
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih status proyek" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-started">Belum Dimulai</SelectItem>
              <SelectItem value="in-progress">Sedang Berjalan</SelectItem>
              <SelectItem value="on-hold">Ditunda</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="budget">Anggaran</Label>
          <Input
            id="budget"
            name="budget"
            value={formData.budget || ""}
            onChange={handleChange}
            placeholder="Rp 0"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="manager">Manajer Proyek</Label>
          <Input
            id="manager"
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="progress">Kemajuan (%)</Label>
          <Input
            id="progress"
            name="progress"
            type="number"
            min="0"
            max="100"
            value={formData.progress}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="team">Tim Proyek (pisahkan dengan koma)</Label>
        <Input
          id="team"
          name="team"
          value={formData.team.join(", ")}
          onChange={handleTeamChange}
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit">
          {project ? "Simpan Perubahan" : "Tambah Proyek"}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;

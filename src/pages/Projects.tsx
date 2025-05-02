
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Search, FilterX } from "lucide-react";
import { Project } from "@/types/project";
import { getProjects, addProject, updateProject, deleteProject } from "@/services/projectService";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectForm from "@/components/projects/ProjectForm";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const fetchedProjects = getProjects();
    setProjects(fetchedProjects);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm) ||
      project.client.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm);

    const matchesStatus = statusFilter
      ? project.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  const handleFilterClick = (status: string) => {
    setStatusFilter(status === statusFilter ? "" : status);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setViewingProject(null);
    setIsFormOpen(true);
  };

  const handleViewProject = (project: Project) => {
    setViewingProject(project);
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      deleteProject(id);
      loadProjects();
      toast.success("Proyek berhasil dihapus");
    }
  };

  const handleFormSubmit = (data: Omit<Project, "id"> | Project) => {
    if ("id" in data) {
      updateProject(data);
      toast.success("Proyek berhasil diperbarui");
    } else {
      addProject(data);
      toast.success("Proyek berhasil ditambahkan");
    }
    
    setIsFormOpen(false);
    loadProjects();
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  const handleBackFromDetail = () => {
    setViewingProject(null);
  };

  if (viewingProject) {
    return (
      <ProjectDetail
        project={viewingProject}
        onBack={handleBackFromDetail}
        onEdit={handleEditProject}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold">Proyek</h2>
        <Button onClick={handleAddProject}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Proyek
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cari proyek..."
              className="pl-9"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full",
              statusFilter === "" ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => setStatusFilter("")}
          >
            <FilterX className="h-3.5 w-3.5 mr-1" />
            Semua
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full",
              statusFilter === "not-started" ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => handleFilterClick("not-started")}
          >
            Belum Dimulai
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full",
              statusFilter === "in-progress" ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => handleFilterClick("in-progress")}
          >
            Sedang Berjalan
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full",
              statusFilter === "on-hold" ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => handleFilterClick("on-hold")}
          >
            Ditunda
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full",
              statusFilter === "completed" ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => handleFilterClick("completed")}
          >
            Selesai
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onView={handleViewProject}
            />
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-gray-500">
            {searchTerm || statusFilter
              ? "Tidak ada proyek yang sesuai dengan pencarian atau filter"
              : "Belum ada proyek yang ditambahkan"}
          </div>
        )}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Proyek" : "Tambah Proyek Baru"}
            </DialogTitle>
          </DialogHeader>
          <ProjectForm
            project={editingProject || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;

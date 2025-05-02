
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Briefcase, MoreHorizontal, Plus, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/types/project";
import { getProjects, createProject, updateProject, deleteProject } from "@/services/projectService";

const statusColors: Record<string, string> = {
  "in-progress": "bg-blue-500",
  "completed": "bg-green-500",
  "delayed": "bg-red-500",
  "not-started": "bg-gray-500",
};

const statusLabels: Record<string, string> = {
  "in-progress": "Sedang Berjalan",
  "completed": "Selesai",
  "delayed": "Terlambat",
  "not-started": "Belum Dimulai",
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load projects data
  useEffect(() => {
    const loadedProjects = getProjects();
    setProjects(loadedProjects);
    setFilteredProjects(loadedProjects);
  }, []);

  // Filter projects when search or status filter changes
  useEffect(() => {
    let filtered = projects;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) => 
          project.name.toLowerCase().includes(query) || 
          project.client.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (project) => project.status === statusFilter
      );
    }
    
    setFilteredProjects(filtered);
  }, [searchQuery, statusFilter, projects]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleAddProject = () => {
    setCurrentProject(null);
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (project: Project) => {
    setCurrentProject(project);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentProject) {
      deleteProject(currentProject.id);
      setProjects(getProjects());
      setIsDeleteDialogOpen(false);
      toast({
        title: "Proyek dihapus",
        description: `${currentProject.name} telah dihapus dari sistem.`,
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
      title: currentProject ? "Proyek diperbarui" : "Proyek ditambahkan",
      description: "Data proyek telah berhasil disimpan.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manajemen Proyek</h2>
        <Button onClick={handleAddProject}>
          <Plus className="mr-2 h-4 w-4" /> Proyek Baru
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <Input 
            placeholder="Cari proyek..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {statusFilter === "all" ? "Status" : statusLabels[statusFilter as keyof typeof statusLabels]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleStatusChange("all")}>
              Semua
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("in-progress")}>
              Sedang Berjalan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("completed")}>
              Selesai
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("delayed")}>
              Terlambat
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("not-started")}>
              Belum Dimulai
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="flex flex-row justify-between items-start p-4 gap-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="bg-hrm-primary/10 p-2 rounded-md mr-3">
                    <Briefcase className="h-5 w-5 text-hrm-primary" />
                  </div>
                  <Badge
                    className={`${statusColors[project.status]} text-white`}
                  >
                    {statusLabels[project.status]}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="ml-auto">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditProject(project)}>
                        Edit Proyek
                      </DropdownMenuItem>
                      <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(project)}>
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="font-bold text-lg mb-1">
                  {project.name}
                </CardTitle>
                <p className="text-sm text-gray-500 mb-2">{project.client}</p>
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between mb-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-gray-500">Deadline</span>
                </div>
                <span className="font-medium">{project.deadline}</span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-hrm-primary h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {project.team} anggota tim
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentProject ? "Edit Proyek" : "Tambah Proyek Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              {/* Form fields would go here */}
              <p className="text-sm text-gray-500">
                Form input untuk {currentProject ? "mengedit" : "menambahkan"} data proyek akan ditampilkan di sini.
              </p>
            </div>
            <DialogFooter>
              <Button type="submit">
                {currentProject ? "Simpan Perubahan" : "Tambah Proyek"}
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
            Apakah Anda yakin ingin menghapus proyek {currentProject?.name}? Tindakan ini tidak dapat dibatalkan.
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

export default Projects;

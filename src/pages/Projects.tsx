
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MoreHorizontal, Plus, Calendar, Users } from "lucide-react";

// Sample project data
const projects = [
  {
    id: 1,
    name: "Website E-commerce",
    client: "PT. Sejahtera Abadi",
    startDate: "12 Mei 2023",
    deadline: "20 Agustus 2023",
    status: "in-progress",
    progress: 75,
    team: 5,
  },
  {
    id: 2,
    name: "Aplikasi Mobile Perbankan",
    client: "Bank Makmur",
    startDate: "3 Maret 2023",
    deadline: "15 Oktober 2023",
    status: "in-progress",
    progress: 45,
    team: 8,
  },
  {
    id: 3,
    name: "Dashboard Analitik",
    client: "PT. Data Insights",
    startDate: "20 Jan 2023",
    deadline: "10 Juni 2023",
    status: "completed",
    progress: 100,
    team: 3,
  },
  {
    id: 4,
    name: "Sistem Manajemen Inventori",
    client: "CV. Logistik Cepat",
    startDate: "5 April 2023",
    deadline: "30 Juli 2023",
    status: "delayed",
    progress: 35,
    team: 4,
  },
  {
    id: 5,
    name: "Platform Pembelajaran Online",
    client: "Yayasan Pendidikan Masa Depan",
    startDate: "1 Februari 2023",
    deadline: "25 Juli 2023",
    status: "in-progress",
    progress: 65,
    team: 6,
  },
];

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
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manajemen Proyek</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Proyek Baru
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <Input placeholder="Cari proyek..." />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Semua</DropdownMenuItem>
            <DropdownMenuItem>Sedang Berjalan</DropdownMenuItem>
            <DropdownMenuItem>Selesai</DropdownMenuItem>
            <DropdownMenuItem>Terlambat</DropdownMenuItem>
            <DropdownMenuItem>Belum Dimulai</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
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
                      <DropdownMenuItem>Edit Proyek</DropdownMenuItem>
                      <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                      <DropdownMenuItem>Arsipkan</DropdownMenuItem>
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
    </div>
  );
};

export default Projects;

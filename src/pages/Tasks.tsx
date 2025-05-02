
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Plus, Search, Filter } from "lucide-react";

// Sample task data
const tasks = [
  {
    id: 1,
    title: "Desain Halaman Login",
    description: "Membuat desain UI untuk halaman login aplikasi web",
    project: "Website E-commerce",
    assignee: "Siti Nurhayati",
    dueDate: "15 Juni 2023",
    status: "in-progress",
    priority: "high",
  },
  {
    id: 2,
    title: "Implementasi API Authentication",
    description: "Mengintegrasikan API authentication dengan backend",
    project: "Website E-commerce",
    assignee: "Budi Santoso",
    dueDate: "20 Juni 2023",
    status: "not-started",
    priority: "medium",
  },
  {
    id: 3,
    title: "Testing Fitur Checkout",
    description: "Melakukan pengujian pada fitur checkout",
    project: "Website E-commerce",
    assignee: "Andi Wijaya",
    dueDate: "25 Juni 2023",
    status: "in-progress",
    priority: "high",
  },
  {
    id: 4,
    title: "Mengoptimasi Database",
    description: "Mengoptimasi performa database untuk skala besar",
    project: "Aplikasi Mobile Perbankan",
    assignee: "Rudi Hartono",
    dueDate: "18 Juni 2023",
    status: "completed",
    priority: "medium",
  },
  {
    id: 5,
    title: "Membuat Dokumentasi API",
    description: "Membuat dokumentasi untuk semua endpoint API",
    project: "Aplikasi Mobile Perbankan",
    assignee: "Maya Indah",
    dueDate: "30 Juni 2023",
    status: "in-progress",
    priority: "low",
  },
  {
    id: 6,
    title: "Setup Continuous Integration",
    description: "Mengatur CI/CD pipeline untuk deployment otomatis",
    project: "Aplikasi Mobile Perbankan",
    assignee: "Budi Santoso",
    dueDate: "5 Juli 2023",
    status: "not-started",
    priority: "high",
  },
];

const statusColors: Record<string, string> = {
  "in-progress": "bg-blue-500",
  "completed": "bg-green-500",
  "not-started": "bg-gray-500",
};

const statusLabels: Record<string, string> = {
  "in-progress": "Sedang Dikerjakan",
  "completed": "Selesai",
  "not-started": "Belum Dimulai",
};

const priorityColors: Record<string, string> = {
  "high": "bg-red-500",
  "medium": "bg-yellow-500",
  "low": "bg-green-500",
};

const priorityLabels: Record<string, string> = {
  "high": "Tinggi",
  "medium": "Sedang",
  "low": "Rendah",
};

const Tasks: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manajemen Tugas</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Tugas
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Cari tugas..." className="pl-9" />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="in-progress">Sedang Dikerjakan</TabsTrigger>
          <TabsTrigger value="not-started">Belum Dimulai</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <Card key={task.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className={`${statusColors[task.status]} text-white font-normal`}>
                        {statusLabels[task.status]}
                      </Badge>
                      <Badge className={`${priorityColors[task.priority]} text-white font-normal`}>
                        {priorityLabels[task.priority]}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{task.description}</p>
                    
                    <div className="text-xs text-gray-500 mb-1">
                      Proyek: <span className="font-medium text-gray-700">{task.project}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                          {task.assignee.charAt(0)}
                        </div>
                        <span className="text-sm ml-2">{task.assignee}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex items-center text-sm">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-gray-600">Tenggat: {task.dueDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks
              .filter((task) => task.status === "in-progress")
              .map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  {/* Same card content structure */}
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Badge className={`${statusColors[task.status]} text-white font-normal`}>
                          {statusLabels[task.status]}
                        </Badge>
                        <Badge className={`${priorityColors[task.priority]} text-white font-normal`}>
                          {priorityLabels[task.priority]}
                        </Badge>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-1">{task.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{task.description}</p>
                      
                      <div className="text-xs text-gray-500 mb-1">
                        Proyek: <span className="font-medium text-gray-700">{task.project}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                            {task.assignee.charAt(0)}
                          </div>
                          <span className="text-sm ml-2">{task.assignee}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex items-center text-sm">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-gray-600">Tenggat: {task.dueDate}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="not-started">
          {/* Similar structure for not-started tasks */}
        </TabsContent>
        
        <TabsContent value="completed">
          {/* Similar structure for completed tasks */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;

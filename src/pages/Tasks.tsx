
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar, Clock, Plus, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/types/task";
import { getTasks, createTask, updateTask, deleteTask, getTasksByStatus } from "@/services/taskService";

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

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  return (
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
  );
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const { toast } = useToast();

  // Load tasks data
  useEffect(() => {
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
    setFilteredTasks(loadedTasks);
  }, []);

  // Filter tasks when search changes or tab changes
  useEffect(() => {
    let filtered = tasks;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) => 
          task.title.toLowerCase().includes(query) || 
          task.description.toLowerCase().includes(query) ||
          task.project.toLowerCase().includes(query) ||
          task.assignee.toLowerCase().includes(query)
      );
    }
    
    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter(task => task.status === activeTab);
    }
    
    setFilteredTasks(filtered);
  }, [searchQuery, activeTab, tasks]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleAddTask = () => {
    setCurrentTask(null);
    setIsDialogOpen(true);
  };

  // This would be expanded in a real implementation
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling would go here in a real implementation
    setIsDialogOpen(false);
    
    // For demonstration, we'll just show a toast
    toast({
      title: currentTask ? "Tugas diperbarui" : "Tugas ditambahkan",
      description: "Data tugas telah berhasil disimpan.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manajemen Tugas</h2>
        <Button onClick={handleAddTask}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Tugas
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Cari tugas..." 
              className="pl-9" 
              value={searchQuery} 
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="in-progress">Sedang Dikerjakan</TabsTrigger>
          <TabsTrigger value="not-started">Belum Dimulai</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="not-started">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Task Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentTask ? "Edit Tugas" : "Tambah Tugas Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              {/* Form fields would go here */}
              <p className="text-sm text-gray-500">
                Form input untuk {currentTask ? "mengedit" : "menambahkan"} tugas akan ditampilkan di sini.
              </p>
            </div>
            <DialogFooter>
              <Button type="submit">
                {currentTask ? "Simpan Perubahan" : "Tambah Tugas"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;

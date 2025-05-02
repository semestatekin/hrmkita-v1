
import { Task } from "@/types/task";
import { getLocalData, setLocalData } from "@/utils/localStorage";

const TASKS_KEY = "hrm_tasks";

// Sample task data
const initialTasks: Task[] = [
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

const initializeLocalStorage = () => {
  if (!localStorage.getItem(TASKS_KEY)) {
    setLocalData(TASKS_KEY, initialTasks);
  }
};

// CRUD operations
export const getTasks = (): Task[] => {
  initializeLocalStorage();
  return getLocalData(TASKS_KEY, []);
};

export const getTaskById = (id: number): Task | undefined => {
  const tasks = getTasks();
  return tasks.find((task) => task.id === id);
};

export const getTasksByStatus = (status: Task['status']): Task[] => {
  const tasks = getTasks();
  return tasks.filter((task) => task.status === status);
};

export const createTask = (task: Omit<Task, "id">): Task => {
  const tasks = getTasks();
  const newId = tasks.length > 0 
    ? Math.max(...tasks.map(t => t.id)) + 1 
    : 1;

  const newTask = {
    ...task,
    id: newId
  };

  setLocalData(TASKS_KEY, [...tasks, newTask]);
  return newTask;
};

export const updateTask = (task: Task): void => {
  const tasks = getTasks();
  const updatedTasks = tasks.map((t) =>
    t.id === task.id ? task : t
  );
  setLocalData(TASKS_KEY, updatedTasks);
};

export const deleteTask = (id: number): void => {
  const tasks = getTasks();
  setLocalData(TASKS_KEY, tasks.filter((t) => t.id !== id));
};

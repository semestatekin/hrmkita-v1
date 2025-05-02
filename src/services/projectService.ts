
import { Project } from "@/types/project";
import { getLocalData, setLocalData } from "@/utils/localStorage";

const PROJECTS_KEY = "hrm_projects";

// Sample project data
const initialProjects: Project[] = [
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

const initializeLocalStorage = () => {
  if (!localStorage.getItem(PROJECTS_KEY)) {
    setLocalData(PROJECTS_KEY, initialProjects);
  }
};

// CRUD operations
export const getProjects = (): Project[] => {
  initializeLocalStorage();
  return getLocalData(PROJECTS_KEY, []);
};

export const getProjectById = (id: number): Project | undefined => {
  const projects = getProjects();
  return projects.find((project) => project.id === id);
};

export const createProject = (project: Omit<Project, "id">): Project => {
  const projects = getProjects();
  const newId = projects.length > 0 
    ? Math.max(...projects.map(p => p.id)) + 1 
    : 1;

  const newProject = {
    ...project,
    id: newId
  };

  setLocalData(PROJECTS_KEY, [...projects, newProject]);
  return newProject;
};

export const updateProject = (project: Project): void => {
  const projects = getProjects();
  const updatedProjects = projects.map((p) =>
    p.id === project.id ? project : p
  );
  setLocalData(PROJECTS_KEY, updatedProjects);
};

export const deleteProject = (id: number): void => {
  const projects = getProjects();
  setLocalData(PROJECTS_KEY, projects.filter((p) => p.id !== id));
};

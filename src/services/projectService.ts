
import { Project } from '@/types/project';
import { setLocalData, getLocalData } from '@/utils/localStorage';

const PROJECTS_KEY = 'hrm_projects';

// Sample initial data
const initialProjects: Project[] = [
  {
    id: 1,
    name: 'Website E-commerce',
    description: 'Pembuatan website e-commerce untuk PT. Maju Jaya',
    startDate: '2023-06-01',
    endDate: '2023-08-15',
    status: 'in-progress',
    client: 'PT. Maju Jaya',
    budget: 'Rp 50.000.000',
    manager: 'Budi Santoso',
    progress: 65,
    team: ['Andi Wijaya', 'Siti Nurhayati', 'Rudi Hartono']
  },
  {
    id: 2,
    name: 'Aplikasi Mobile Banking',
    description: 'Pengembangan aplikasi mobile banking untuk Bank XYZ',
    startDate: '2023-05-10',
    endDate: '2023-10-30',
    status: 'in-progress',
    client: 'Bank XYZ',
    budget: 'Rp 120.000.000',
    manager: 'Dewi Sartika',
    progress: 40,
    team: ['Maya Indah', 'Joko Widodo', 'Ani Susanti', 'Dian Sastro']
  },
  {
    id: 3,
    name: 'Sistem Manajemen Inventaris',
    description: 'Pembuatan sistem manajemen inventaris untuk gudang',
    startDate: '2023-04-15',
    endDate: '2023-07-20',
    status: 'completed',
    client: 'PT. Logistik Cepat',
    budget: 'Rp 35.000.000',
    manager: 'Andi Wijaya',
    progress: 100,
    team: ['Budi Santoso', 'Rini Wulandari']
  },
  {
    id: 4,
    name: 'Redesign UI/UX Website',
    description: 'Perbaikan antarmuka pengguna website korporat',
    startDate: '2023-07-01',
    endDate: '2023-08-15',
    status: 'not-started',
    client: 'PT. Teknologi Maju',
    budget: 'Rp 25.000.000',
    manager: 'Siti Nurhayati',
    progress: 0,
    team: ['Dian Sastro', 'Maya Indah']
  },
  {
    id: 5,
    name: 'Implementasi CRM',
    description: 'Implementasi dan kustomisasi sistem CRM',
    startDate: '2023-03-10',
    endDate: '2023-06-30',
    status: 'on-hold',
    client: 'PT. Sejahtera Abadi',
    budget: 'Rp 75.000.000',
    manager: 'Joko Widodo',
    progress: 60,
    team: ['Ani Susanti', 'Rudi Hartono', 'Dewi Sartika']
  }
];

// Initialize projects in localStorage if they don't exist
const initializeProjects = () => {
  const existingProjects = getLocalData<Project[]>(PROJECTS_KEY, null);
  if (!existingProjects) {
    setLocalData(PROJECTS_KEY, initialProjects);
  }
};

// Get all projects
export const getProjects = (): Project[] => {
  initializeProjects();
  return getLocalData<Project[]>(PROJECTS_KEY, []);
};

// Get a single project by id
export const getProjectById = (id: number): Project | undefined => {
  const projects = getProjects();
  return projects.find(project => project.id === id);
};

// Add a new project
export const addProject = (project: Omit<Project, 'id'>): Project => {
  const projects = getProjects();
  const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
  
  const newProject: Project = {
    ...project,
    id: newId
  };
  
  setLocalData(PROJECTS_KEY, [...projects, newProject]);
  return newProject;
};

// Update an existing project
export const updateProject = (updatedProject: Project): Project => {
  const projects = getProjects();
  const updatedProjects = projects.map(project => 
    project.id === updatedProject.id ? updatedProject : project
  );
  
  setLocalData(PROJECTS_KEY, updatedProjects);
  return updatedProject;
};

// Delete a project
export const deleteProject = (id: number): void => {
  const projects = getProjects();
  const filteredProjects = projects.filter(project => project.id !== id);
  setLocalData(PROJECTS_KEY, filteredProjects);
};

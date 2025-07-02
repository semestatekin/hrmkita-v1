
import { Department } from "@/types/department";
import { getLocalData, setLocalData } from "@/utils/localStorage";
import { getEmployeeCountByDepartment, getDepartmentManager } from "./dataIntegrationService";

const DEPARTMENTS_KEY = "hrm_departments";

// Sample data for initial load
const initialDepartments: Department[] = [
  {
    id: 1,
    name: "Engineering",
    description: "Pengembangan produk dan teknologi",
    employeeCount: 0,
    manager: "Belum ditentukan",
    established: "2018",
  },
  {
    id: 2,
    name: "Design",
    description: "UI/UX dan desain produk",
    employeeCount: 0,
    manager: "Belum ditentukan",
    established: "2018",
  },
  {
    id: 3,
    name: "Management",
    description: "Manajemen proyek dan operasional",
    employeeCount: 0,
    manager: "Belum ditentukan",
    established: "2018",
  },
  {
    id: 4,
    name: "Human Resources",
    description: "Rekrutmen dan manajemen SDM",
    employeeCount: 0,
    manager: "Belum ditentukan",
    established: "2019",
  },
  {
    id: 5,
    name: "Sales",
    description: "Pemasaran dan penjualan",
    employeeCount: 0,
    manager: "Belum ditentukan",
    established: "2019",
  },
  {
    id: 6,
    name: "Finance",
    description: "Keuangan dan akuntansi",
    employeeCount: 0,
    manager: "Belum ditentukan",
    established: "2019",
  },
];

const initializeLocalStorage = () => {
  if (!localStorage.getItem(DEPARTMENTS_KEY)) {
    setLocalData(DEPARTMENTS_KEY, initialDepartments);
  }
};

// Get all departments with synchronized data
export const getDepartments = (): Department[] => {
  initializeLocalStorage();
  const departments = getLocalData(DEPARTMENTS_KEY, []);
  
  // Sync employee counts and managers
  return departments.map(dept => ({
    ...dept,
    employeeCount: getEmployeeCountByDepartment(dept.name),
    manager: getDepartmentManager(dept.name)
  }));
};

export const getDepartmentById = (id: number): Department | undefined => {
  const departments = getDepartments();
  return departments.find((department) => department.id === id);
};

export const createDepartment = (department: Omit<Department, "id">): Department => {
  const departments = getLocalData(DEPARTMENTS_KEY, []);
  const newId = departments.length > 0 
    ? Math.max(...departments.map(d => d.id)) + 1 
    : 1;

  const newDepartment = {
    ...department,
    id: newId,
    employeeCount: 0,
    manager: "Belum ditentukan"
  };

  setLocalData(DEPARTMENTS_KEY, [...departments, newDepartment]);
  return newDepartment;
};

export const updateDepartment = (department: Department): void => {
  const departments = getLocalData(DEPARTMENTS_KEY, []);
  const updatedDepartments = departments.map((d) =>
    d.id === department.id ? department : d
  );
  setLocalData(DEPARTMENTS_KEY, updatedDepartments);
};

export const deleteDepartment = (id: number): void => {
  const departments = getLocalData(DEPARTMENTS_KEY, []);
  setLocalData(DEPARTMENTS_KEY, departments.filter((d) => d.id !== id));
};

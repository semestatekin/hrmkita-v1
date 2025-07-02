
import { Designation } from "@/types/designation";
import { getLocalData, setLocalData } from "@/utils/localStorage";
import { getEmployeeCountByPosition } from "./dataIntegrationService";

const DESIGNATIONS_KEY = "hrm_designations";

// Sample data for initial load
const initialDesignations: Designation[] = [
  {
    id: 1,
    title: "Senior Developer",
    department: "Engineering",
    level: "Senior",
    employeeCount: 0,
    minSalary: "Rp 12.000.000",
    maxSalary: "Rp 18.000.000",
  },
  {
    id: 2,
    title: "Junior Developer",
    department: "Engineering",
    level: "Junior",
    employeeCount: 0,
    minSalary: "Rp 8.000.000",
    maxSalary: "Rp 12.000.000",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    level: "Mid",
    employeeCount: 0,
    minSalary: "Rp 10.000.000",
    maxSalary: "Rp 15.000.000",
  },
  {
    id: 4,
    title: "Project Manager",
    department: "Management",
    level: "Senior",
    employeeCount: 0,
    minSalary: "Rp 15.000.000",
    maxSalary: "Rp 22.000.000",
  },
  {
    id: 5,
    title: "HR Specialist",
    department: "Human Resources",
    level: "Mid",
    employeeCount: 0,
    minSalary: "Rp 9.000.000",
    maxSalary: "Rp 14.000.000",
  },
  {
    id: 6,
    title: "Sales Executive",
    department: "Sales",
    level: "Mid",
    employeeCount: 0,
    minSalary: "Rp 8.000.000",
    maxSalary: "Rp 16.000.000",
  },
  {
    id: 7,
    title: "Finance Manager",
    department: "Finance",
    level: "Senior",
    employeeCount: 0,
    minSalary: "Rp 15.000.000",
    maxSalary: "Rp 20.000.000",
  },
  {
    id: 8,
    title: "Marketing Specialist",
    department: "Marketing",
    level: "Mid",
    employeeCount: 0,
    minSalary: "Rp 9.000.000",
    maxSalary: "Rp 13.000.000",
  },
];

const initializeLocalStorage = () => {
  if (!localStorage.getItem(DESIGNATIONS_KEY)) {
    setLocalData(DESIGNATIONS_KEY, initialDesignations);
  }
};

// CRUD operations with synchronized employee counts
export const getDesignations = (): Designation[] => {
  initializeLocalStorage();
  const designations = getLocalData(DESIGNATIONS_KEY, []);
  
  // Sync employee counts
  return designations.map(designation => ({
    ...designation,
    employeeCount: getEmployeeCountByPosition(designation.title)
  }));
};

export const getDesignationById = (id: number): Designation | undefined => {
  const designations = getDesignations();
  return designations.find((designation) => designation.id === id);
};

export const createDesignation = (designation: Omit<Designation, "id">): Designation => {
  const designations = getLocalData(DESIGNATIONS_KEY, []);
  const newId = designations.length > 0 
    ? Math.max(...designations.map(d => d.id)) + 1 
    : 1;

  const newDesignation = {
    ...designation,
    id: newId,
    employeeCount: getEmployeeCountByPosition(designation.title)
  };

  setLocalData(DESIGNATIONS_KEY, [...designations, newDesignation]);
  return newDesignation;
};

export const updateDesignation = (designation: Designation): void => {
  const designations = getLocalData(DESIGNATIONS_KEY, []);
  const updatedDesignations = designations.map((d) =>
    d.id === designation.id ? {
      ...designation,
      employeeCount: getEmployeeCountByPosition(designation.title)
    } : d
  );
  setLocalData(DESIGNATIONS_KEY, updatedDesignations);
};

export const deleteDesignation = (id: number): void => {
  const designations = getLocalData(DESIGNATIONS_KEY, []);
  setLocalData(DESIGNATIONS_KEY, designations.filter((d) => d.id !== id));
};

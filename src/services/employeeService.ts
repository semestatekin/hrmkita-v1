
import { Employee } from "@/types/employee";
import { getLocalData, setLocalData } from "@/utils/localStorage";

const EMPLOYEES_KEY = "hrm_employees";

// Sample data for initial load
const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Budi Santoso",
    position: "Senior Developer",
    department: "Engineering",
    email: "budi.santoso@haisemesta.id",
    phone: "+62 812-3456-7890",
    status: "active",
  },
  {
    id: 2,
    name: "Siti Nurhayati",
    position: "UI/UX Designer",
    department: "Design",
    email: "siti.nurhayati@haisemesta.id",
    phone: "+62 821-0987-6543",
    status: "active",
  },
  {
    id: 3,
    name: "Andi Wijaya",
    position: "Project Manager",
    department: "Management",
    email: "andi.wijaya@haisemesta.id",
    phone: "+62 856-7890-1234",
    status: "active",
  },
  {
    id: 4,
    name: "Dewi Sartika",
    position: "HR Specialist",
    department: "Human Resources",
    email: "dewi.sartika@haisemesta.id",
    phone: "+62 877-8901-2345",
    status: "on-leave",
  },
  {
    id: 5,
    name: "Rudi Hartono",
    position: "Sales Executive",
    department: "Sales",
    email: "rudi.hartono@haisemesta.id",
    phone: "+62 898-9012-3456",
    status: "active",
  },
  {
    id: 6,
    name: "Maya Indah",
    position: "Finance Manager",
    department: "Finance",
    email: "maya.indah@haisemesta.id",
    phone: "+62 819-0123-4567",
    status: "active",
  },
  {
    id: 7,
    name: "Dian Sastro",
    position: "Marketing Specialist",
    department: "Marketing",
    email: "dian.sastro@haisemesta.id",
    phone: "+62 831-1234-5678",
    status: "inactive",
  },
];

const initializeLocalStorage = () => {
  if (!localStorage.getItem(EMPLOYEES_KEY)) {
    setLocalData(EMPLOYEES_KEY, initialEmployees);
  }
};

// CRUD operations
export const getEmployees = (): Employee[] => {
  initializeLocalStorage();
  return getLocalData(EMPLOYEES_KEY, []);
};

export const getEmployeeById = (id: number): Employee | undefined => {
  const employees = getEmployees();
  return employees.find((employee) => employee.id === id);
};

export const createEmployee = (employee: Omit<Employee, "id">): Employee => {
  const employees = getEmployees();
  const newId = employees.length > 0 
    ? Math.max(...employees.map(e => e.id)) + 1 
    : 1;

  const newEmployee = {
    ...employee,
    id: newId
  };

  setLocalData(EMPLOYEES_KEY, [...employees, newEmployee]);
  return newEmployee;
};

export const updateEmployee = (employee: Employee): void => {
  const employees = getEmployees();
  const updatedEmployees = employees.map((e) =>
    e.id === employee.id ? employee : e
  );
  setLocalData(EMPLOYEES_KEY, updatedEmployees);
};

export const deleteEmployee = (id: number): void => {
  const employees = getEmployees();
  setLocalData(EMPLOYEES_KEY, employees.filter((e) => e.id !== id));
};

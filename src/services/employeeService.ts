
import { Employee } from "@/types/employee";
import { getLocalData, setLocalData } from "@/utils/localStorage";

const EMPLOYEES_KEY = "hrm_employees";

// Initial employee data
const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi.santoso@haisemesta.id",
    phone: "081234567890",
    position: "Senior Developer",
    department: "Engineering",
    joinDate: "2020-01-15",
    status: "active",
    salary: "Rp 15.000.000",
    address: "Jl. Sudirman No. 123, Jakarta",
    gender: "male",
    birthDate: "1990-05-20"
  },
  {
    id: 2,
    name: "Siti Nurhayati",
    email: "siti.nurhayati@haisemesta.id",
    phone: "081234567891",
    position: "UI/UX Designer",
    department: "Design",
    joinDate: "2020-03-10",
    status: "active",
    salary: "Rp 12.000.000",
    gender: "female"
  },
  {
    id: 3,
    name: "Andi Wijaya",
    email: "andi.wijaya@haisemesta.id",
    phone: "081234567892",
    position: "Project Manager",
    department: "Management",
    joinDate: "2019-11-05",
    status: "on-leave",
    salary: "Rp 20.000.000",
    gender: "male"
  },
  {
    id: 4,
    name: "Dewi Sartika",
    email: "dewi.sartika@haisemesta.id",
    phone: "081234567893",
    position: "HR Specialist",
    department: "Human Resources",
    joinDate: "2021-02-15",
    status: "active",
    salary: "Rp 10.000.000",
    gender: "female"
  },
  {
    id: 5,
    name: "Rudi Hartono",
    email: "rudi.hartono@haisemesta.id",
    phone: "081234567894",
    position: "Sales Executive",
    department: "Sales",
    joinDate: "2021-01-10",
    status: "inactive",
    salary: "Rp 8.000.000",
    gender: "male"
  },
];

// Initialize localStorage with initial data if empty
const initializeLocalStorage = () => {
  if (!localStorage.getItem(EMPLOYEES_KEY)) {
    setLocalData(EMPLOYEES_KEY, initialEmployees);
  }
};

// Get all employees
export const getEmployees = (): Employee[] => {
  initializeLocalStorage();
  return getLocalData(EMPLOYEES_KEY, []);
};

// Get employee by id
export const getEmployeeById = (id: number): Employee | undefined => {
  const employees = getEmployees();
  return employees.find(emp => emp.id === id);
};

// Create a new employee
export const createEmployee = (employee: Omit<Employee, "id">): Employee => {
  const employees = getEmployees();
  const newEmployee = {
    ...employee,
    id: employees.length > 0 ? Math.max(0, ...employees.map(e => e.id)) + 1 : 1
  };
  
  setLocalData(EMPLOYEES_KEY, [...employees, newEmployee]);
  return newEmployee;
};

// Update an employee
export const updateEmployee = (employee: Employee): Employee => {
  const employees = getEmployees();
  const index = employees.findIndex(emp => emp.id === employee.id);
  
  if (index !== -1) {
    const updatedEmployees = [...employees];
    updatedEmployees[index] = employee;
    setLocalData(EMPLOYEES_KEY, updatedEmployees);
    return employee;
  }
  
  throw new Error(`Employee with id ${employee.id} not found`);
};

// Delete an employee
export const deleteEmployee = (id: number): boolean => {
  const employees = getEmployees();
  const updatedEmployees = employees.filter(emp => emp.id !== id);
  
  if (updatedEmployees.length < employees.length) {
    setLocalData(EMPLOYEES_KEY, updatedEmployees);
    return true;
  }
  
  return false;
};

// Define the type for employee settings
interface EmployeeSettings {
  viewMode: "list" | "grid";
  columns: {
    id: string;
    label: string;
    isVisible: boolean;
  }[];
}

// Default settings
const defaultSettings: EmployeeSettings = {
  viewMode: "list",
  columns: [
    { id: "name", label: "Nama", isVisible: true },
    { id: "position", label: "Jabatan", isVisible: true },
    { id: "department", label: "Departemen", isVisible: true },
    { id: "contact", label: "Kontak", isVisible: true },
    { id: "joinDate", label: "Tanggal Bergabung", isVisible: true },
    { id: "status", label: "Status", isVisible: true },
  ]
};

// Add or update employee local storage settings
export const saveEmployeeSettings = (settings: EmployeeSettings) => {
  setLocalData("hrm_employee_settings", settings);
};

// Get employee local storage settings
export const getEmployeeSettings = (): EmployeeSettings => {
  return getLocalData("hrm_employee_settings", defaultSettings);
};

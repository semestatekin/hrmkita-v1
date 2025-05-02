
import { Employee } from "@/types/employee";

// Mock employee data
let employees: Employee[] = [
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

// Get all employees
export const getEmployees = (): Employee[] => {
  return [...employees];
};

// Get employee by id
export const getEmployeeById = (id: number): Employee | undefined => {
  return employees.find(emp => emp.id === id);
};

// Create a new employee
export const createEmployee = (employee: Omit<Employee, "id">): Employee => {
  const newEmployee = {
    ...employee,
    id: Math.max(0, ...employees.map(e => e.id)) + 1
  };
  employees.push(newEmployee);
  return newEmployee;
};

// Update an employee
export const updateEmployee = (employee: Employee): Employee => {
  const index = employees.findIndex(emp => emp.id === employee.id);
  if (index !== -1) {
    employees[index] = employee;
    return employee;
  }
  throw new Error(`Employee with id ${employee.id} not found`);
};

// Delete an employee
export const deleteEmployee = (id: number): boolean => {
  const initialLength = employees.length;
  employees = employees.filter(emp => emp.id !== id);
  return employees.length < initialLength;
};

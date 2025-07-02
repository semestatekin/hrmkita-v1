
import { Employee } from "@/types/employee";
import { Designation } from "@/types/designation";
import { Department } from "@/types/department";
import { getEmployees } from "./employeeService";
import { getDesignations } from "./designationService";
import { getDepartments } from "./departmentService";

// Get available departments from employees and designations
export const getAvailableDepartments = (): string[] => {
  const employees = getEmployees();
  const designations = getDesignations();
  
  const employeeDepartments = employees.map(emp => emp.department);
  const designationDepartments = designations.map(des => des.department);
  
  const allDepartments = [...employeeDepartments, ...designationDepartments];
  return Array.from(new Set(allDepartments)).sort();
};

// Get available positions from employees and designations
export const getAvailablePositions = (): string[] => {
  const employees = getEmployees();
  const designations = getDesignations();
  
  const employeePositions = employees.map(emp => emp.position);
  const designationPositions = designations.map(des => des.title);
  
  const allPositions = [...employeePositions, ...designationPositions];
  return Array.from(new Set(allPositions)).sort();
};

// Get employee count by department
export const getEmployeeCountByDepartment = (departmentName: string): number => {
  const employees = getEmployees();
  return employees.filter(emp => emp.department === departmentName).length;
};

// Get employee count by position
export const getEmployeeCountByPosition = (positionTitle: string): number => {
  const employees = getEmployees();
  return employees.filter(emp => emp.position === positionTitle).length;
};

// Get department manager
export const getDepartmentManager = (departmentName: string): string => {
  const employees = getEmployees();
  const managers = employees.filter(emp => 
    emp.department === departmentName && 
    (emp.position.toLowerCase().includes('manager') || 
     emp.position.toLowerCase().includes('kepala') ||
     emp.position.toLowerCase().includes('direktur'))
  );
  
  return managers.length > 0 ? managers[0].name : "Belum ditentukan";
};

// Sync employee count in designations
export const syncDesignationEmployeeCounts = (): void => {
  const designations = getDesignations();
  const employees = getEmployees();
  
  designations.forEach(designation => {
    const count = employees.filter(emp => emp.position === designation.title).length;
    if (designation.employeeCount !== count) {
      designation.employeeCount = count;
    }
  });
};

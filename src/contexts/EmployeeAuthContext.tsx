import React, { createContext, useContext, useState, useEffect } from "react";
import { setLocalData, getLocalData, removeLocalData } from "@/utils/localStorage";
import { Employee } from "@/types/employee";

// Define types for employee authentication
interface EmployeeUser {
  id: number;
  email: string;
  name: string;
  position: string;
  department: string;
  role: 'employee';
  loginTime: string;
}

interface EmployeeAuthContextType {
  employee: EmployeeUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  getEmployeeData: () => Employee | null;
}

const EmployeeAuthContext = createContext<EmployeeAuthContextType | undefined>(undefined);

// Storage key for employee session data
const EMPLOYEE_SESSION_KEY = "hrm_employee_session";

export const EmployeeAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employee, setEmployee] = useState<EmployeeUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if employee is already logged in from localStorage
    const storedEmployee = getLocalData<EmployeeUser | null>(EMPLOYEE_SESSION_KEY, null);
    if (storedEmployee) {
      setEmployee(storedEmployee);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is handled in the EmployeeLogin component
    // This function is kept for consistency but actual login logic is in the component
    return false;
  };

  const logout = () => {
    removeLocalData(EMPLOYEE_SESSION_KEY);
    setEmployee(null);
    setIsAuthenticated(false);
  };

  const getEmployeeData = (): Employee | null => {
    if (!employee) return null;
    
    // Return employee data in the format expected by the Employee interface
    // This would typically fetch from the employees service
    const employees = getLocalData<Employee[]>("hrm_employees", []);
    return employees.find(emp => emp.id === employee.id) || null;
  };

  return (
    <EmployeeAuthContext.Provider value={{ 
      employee, 
      login, 
      logout, 
      isAuthenticated, 
      getEmployeeData 
    }}>
      {children}
    </EmployeeAuthContext.Provider>
  );
};

export const useEmployeeAuth = () => {
  const context = useContext(EmployeeAuthContext);
  if (context === undefined) {
    throw new Error("useEmployeeAuth must be used within an EmployeeAuthProvider");
  }
  return context;
};
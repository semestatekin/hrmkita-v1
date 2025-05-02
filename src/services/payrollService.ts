
import { PayrollItem, PayrollSummary } from "@/types/payroll";
import { getLocalData, setLocalData } from "@/utils/localStorage";
import { getEmployees } from "@/services/employeeService";
import { formatToRupiah } from "@/utils/payrollCalculations";
import { PaySlip } from "@/types/payslip";
import { generateRandomAttendance, calculateDeductions } from "@/utils/payrollCalculations";
import { createPaySlip } from "@/services/paySlipService";
import { Employee } from "@/types/employee";

const PAYROLL_KEY = "hrm_payroll";

// Sample payroll data
const initialPayroll: PayrollItem[] = [
  {
    id: 1,
    employee: "Budi Santoso",
    position: "Senior Developer",
    salary: "Rp 15.000.000",
    bonus: "Rp 2.500.000",
    deductions: "Rp 1.750.000",
    total: "Rp 15.750.000",
    status: "paid",
    date: "28 Mei 2023",
  },
  {
    id: 2,
    employee: "Siti Nurhayati",
    position: "UI/UX Designer",
    salary: "Rp 12.000.000",
    bonus: "Rp 1.800.000",
    deductions: "Rp 1.350.000",
    total: "Rp 12.450.000",
    status: "paid",
    date: "28 Mei 2023",
  },
  {
    id: 3,
    employee: "Andi Wijaya",
    position: "Project Manager",
    salary: "Rp 18.000.000",
    bonus: "Rp 3.000.000",
    deductions: "Rp 2.100.000",
    total: "Rp 18.900.000",
    status: "paid",
    date: "28 Mei 2023",
  },
  {
    id: 4,
    employee: "Dewi Sartika",
    position: "HR Specialist",
    salary: "Rp 10.000.000",
    bonus: "Rp 1.200.000",
    deductions: "Rp 1.100.000",
    total: "Rp 10.100.000",
    status: "processing",
    date: "28 Mei 2023",
  },
  {
    id: 5,
    employee: "Rudi Hartono",
    position: "Sales Executive",
    salary: "Rp 9.000.000",
    bonus: "Rp 3.500.000",
    deductions: "Rp 1.250.000",
    total: "Rp 11.250.000",
    status: "paid",
    date: "28 Mei 2023",
  },
];

const initializeLocalStorage = () => {
  if (!localStorage.getItem(PAYROLL_KEY)) {
    setLocalData(PAYROLL_KEY, initialPayroll);
  }
};

// Helper function to calculate summary
const calculateSummary = (payrollItems: PayrollItem[]): PayrollSummary => {
  // Parse string amounts to numbers for calculations
  const parseAmount = (amountStr: string): number => {
    return parseFloat(amountStr.replace(/[^0-9]/g, ""));
  };
  
  // Format number back to currency string
  const formatAmount = (amount: number): string => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  const totalAmount = payrollItems.reduce((sum, item) => sum + parseAmount(item.total), 0);
  const totalBonus = payrollItems.reduce((sum, item) => sum + parseAmount(item.bonus), 0);
  const totalDeductions = payrollItems.reduce((sum, item) => sum + parseAmount(item.deductions), 0);
  
  return {
    totalAmount: formatAmount(totalAmount),
    employeeCount: payrollItems.length,
    averageSalary: formatAmount(totalAmount / (payrollItems.length || 1)),
    totalBonus: formatAmount(totalBonus),
    totalDeductions: formatAmount(totalDeductions),
  };
};

// CRUD operations
export const getPayroll = (): PayrollItem[] => {
  initializeLocalStorage();
  return getLocalData(PAYROLL_KEY, []);
};

export const getPayrollSummary = (): PayrollSummary => {
  const payrollItems = getPayroll();
  return calculateSummary(payrollItems);
};

export const getPayrollById = (id: number): PayrollItem | undefined => {
  const payroll = getPayroll();
  return payroll.find((item) => item.id === id);
};

export const createPayrollItem = (item: Omit<PayrollItem, "id">): PayrollItem => {
  const payroll = getPayroll();
  const newId = payroll.length > 0 
    ? Math.max(...payroll.map(p => p.id)) + 1 
    : 1;

  const newPayrollItem = {
    ...item,
    id: newId
  };

  setLocalData(PAYROLL_KEY, [...payroll, newPayrollItem]);
  return newPayrollItem;
};

export const updatePayrollItem = (item: PayrollItem): void => {
  const payroll = getPayroll();
  const updatedPayroll = payroll.map((p) =>
    p.id === item.id ? item : p
  );
  setLocalData(PAYROLL_KEY, updatedPayroll);
};

export const deletePayrollItem = (id: number): void => {
  const payroll = getPayroll();
  setLocalData(PAYROLL_KEY, payroll.filter((p) => p.id !== id));
};

// New function for bulk payment processing
export interface BulkPaymentResult {
  totalProcessed: number;
  successCount: number;
  failedCount: number;
  totalAmount: string;
  payrollItems: PayrollItem[];
  paySlips: PaySlip[];
}

export interface BulkPaymentOptions {
  month: string;
  year: number;
  selectionType: "employees" | "departments" | "positions";
  selectedEmployees?: number[];
  selectedDepartments?: string[];
  selectedPositions?: string[];
  processDate: string;
}

export const processBulkPayment = (options: BulkPaymentOptions): BulkPaymentResult => {
  const employees = getEmployees();
  const filteredEmployees: Employee[] = [];

  // Filter employees based on selection criteria
  if (options.selectionType === "employees" && options.selectedEmployees) {
    options.selectedEmployees.forEach(id => {
      const employee = employees.find(emp => emp.id === id);
      if (employee) filteredEmployees.push(employee);
    });
  } else if (options.selectionType === "departments" && options.selectedDepartments) {
    employees.forEach(employee => {
      if (options.selectedDepartments?.includes(employee.department)) {
        filteredEmployees.push(employee);
      }
    });
  } else if (options.selectionType === "positions" && options.selectedPositions) {
    employees.forEach(employee => {
      if (options.selectedPositions?.includes(employee.position)) {
        filteredEmployees.push(employee);
      }
    });
  }

  // Process payment for each employee
  let successCount = 0;
  let failedCount = 0;
  let totalAmountValue = 0;
  const createdPayrollItems: PayrollItem[] = [];
  const createdPaySlips: PaySlip[] = [];

  filteredEmployees.forEach(employee => {
    try {
      // Generate attendance record for demo purposes
      const attendanceRecord = generateRandomAttendance();
      
      // Calculate deductions based on attendance
      const deductions = employee.salary 
        ? calculateDeductions(employee.salary, attendanceRecord)
        : { totalDeduction: "Rp 0", details: {} };
      
      // Calculate bonus (simplified example - 10% of salary)
      const salaryValue = employee.salary 
        ? parseFloat(employee.salary.replace(/[^0-9]/g, "")) 
        : 0;
      const bonusValue = Math.round(salaryValue * 0.1);
      const bonus = formatToRupiah(bonusValue);
      
      // Calculate total
      const deductionsValue = parseFloat(deductions.totalDeduction.replace(/[^0-9]/g, ""));
      const totalValue = salaryValue + bonusValue - deductionsValue;
      const total = formatToRupiah(totalValue);
      
      // Create payroll item
      const payrollItem = createPayrollItem({
        employee: employee.name,
        position: employee.position,
        salary: employee.salary || "Rp 0",
        bonus,
        deductions: deductions.totalDeduction,
        total,
        status: "paid",
        date: options.processDate,
      });
      
      // Create pay slip
      const paySlip = createPaySlip({
        employeeId: employee.id,
        employeeName: employee.name,
        position: employee.position,
        month: options.month,
        year: options.year,
        baseSalary: employee.salary || "Rp 0",
        allowances: bonus,
        deductions: deductions.totalDeduction,
        totalSalary: total,
        status: "paid",
        issuedDate: options.processDate,
        paidDate: options.processDate,
        deductionDetails: deductions.details,
        attendanceRecord,
      });
      
      createdPayrollItems.push(payrollItem);
      createdPaySlips.push(paySlip);
      totalAmountValue += totalValue;
      successCount++;
    } catch (error) {
      failedCount++;
      console.error(`Failed to process payment for ${employee.name}:`, error);
    }
  });

  return {
    totalProcessed: filteredEmployees.length,
    successCount,
    failedCount,
    totalAmount: formatToRupiah(totalAmountValue),
    payrollItems: createdPayrollItems,
    paySlips: createdPaySlips
  };
};

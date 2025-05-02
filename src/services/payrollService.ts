
import { PayrollItem, PayrollSummary } from "@/types/payroll";
import { getLocalData, setLocalData } from "@/utils/localStorage";

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

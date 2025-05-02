
import { PaySlip } from "@/types/payslip";
import { getLocalData, setLocalData } from "@/utils/localStorage";

const PAYSLIP_KEY = "hrm_payslips";

// Sample payslip data
const initialPaySlips: PaySlip[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Budi Santoso",
    position: "Senior Developer",
    month: "Mei",
    year: 2023,
    baseSalary: "Rp 15.000.000",
    allowances: "Rp 2.500.000",
    deductions: "Rp 1.750.000",
    totalSalary: "Rp 15.750.000",
    status: "paid",
    issuedDate: "2023-05-25",
    paidDate: "2023-05-28",
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Siti Nurhayati",
    position: "UI/UX Designer",
    month: "Mei",
    year: 2023,
    baseSalary: "Rp 12.000.000",
    allowances: "Rp 1.800.000",
    deductions: "Rp 1.350.000",
    totalSalary: "Rp 12.450.000",
    status: "paid",
    issuedDate: "2023-05-25",
    paidDate: "2023-05-28",
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Andi Wijaya",
    position: "Project Manager",
    month: "Mei", 
    year: 2023,
    baseSalary: "Rp 18.000.000",
    allowances: "Rp 3.000.000",
    deductions: "Rp 2.100.000",
    totalSalary: "Rp 18.900.000",
    status: "issued",
    issuedDate: "2023-05-25",
  },
];

const initializeLocalStorage = () => {
  if (!localStorage.getItem(PAYSLIP_KEY)) {
    setLocalData(PAYSLIP_KEY, initialPaySlips);
  }
};

export const getPaySlips = (): PaySlip[] => {
  initializeLocalStorage();
  return getLocalData(PAYSLIP_KEY, []);
};

export const getPaySlipById = (id: number): PaySlip | undefined => {
  const paySlips = getPaySlips();
  return paySlips.find((slip) => slip.id === id);
};

export const getPaySlipsByEmployeeId = (employeeId: number): PaySlip[] => {
  const paySlips = getPaySlips();
  return paySlips.filter((slip) => slip.employeeId === employeeId);
};

export const createPaySlip = (paySlip: Omit<PaySlip, "id">): PaySlip => {
  const paySlips = getPaySlips();
  const newId = paySlips.length > 0 
    ? Math.max(...paySlips.map(slip => slip.id)) + 1 
    : 1;
  
  const newPaySlip: PaySlip = {
    ...paySlip,
    id: newId,
  };
  
  setLocalData(PAYSLIP_KEY, [...paySlips, newPaySlip]);
  return newPaySlip;
};

export const updatePaySlip = (paySlip: PaySlip): void => {
  const paySlips = getPaySlips();
  const updatedPaySlips = paySlips.map((slip) =>
    slip.id === paySlip.id ? paySlip : slip
  );
  setLocalData(PAYSLIP_KEY, updatedPaySlips);
};

export const deletePaySlip = (id: number): void => {
  const paySlips = getPaySlips();
  setLocalData(PAYSLIP_KEY, paySlips.filter((slip) => slip.id !== id));
};

export const issuePaySlip = (id: number): void => {
  const paySlips = getPaySlips();
  const updatedPaySlips = paySlips.map((slip) =>
    slip.id === id ? { ...slip, status: "issued" as const, issuedDate: new Date().toISOString().split('T')[0] } : slip
  );
  setLocalData(PAYSLIP_KEY, updatedPaySlips);
};

export const markPaySlipAsPaid = (id: number): void => {
  const paySlips = getPaySlips();
  const updatedPaySlips = paySlips.map((slip) =>
    slip.id === id ? { 
      ...slip, 
      status: "paid" as const, 
      paidDate: new Date().toISOString().split('T')[0]
    } : slip
  );
  setLocalData(PAYSLIP_KEY, updatedPaySlips);
};

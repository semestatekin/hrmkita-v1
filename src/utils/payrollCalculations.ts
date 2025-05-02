
import { DeductionDetails, AttendanceRecord } from "@/types/payslip";
import { Employee } from "@/types/employee";

// Helper function to extract numeric value from currency string
export const extractNumericValue = (value: string): number => {
  // If value doesn't contain any digit, return 0
  if (!value || !/\d/.test(value)) return 0;
  return parseFloat(value.replace(/[^0-9]/g, "")) || 0;
};

// Helper function to format number to Indonesian Rupiah
export const formatToRupiah = (value: number): string => {
  return `Rp ${value.toLocaleString("id-ID")}`;
};

interface DeductionSettings {
  absenceRate: number; // Percentage of daily salary for absence
  lateRate: number; // Percentage of daily salary for being late
  lateFlatAmount: number; // Flat amount for being late (optional)
  absenceFlatAmount: number; // Flat amount for absence (optional)
  usePercentage: boolean; // Whether to use percentage or flat amount
}

// Default deduction settings
export const defaultDeductionSettings: DeductionSettings = {
  absenceRate: 5, // 5% of daily salary per absence
  lateRate: 1, // 1% of daily salary per late day
  lateFlatAmount: 50000, // Rp 50.000 per late day
  absenceFlatAmount: 200000, // Rp 200.000 per absence
  usePercentage: true // Use percentage by default
};

// Calculate deductions based on attendance and settings
export const calculateDeductions = (
  baseSalary: string,
  attendance: AttendanceRecord,
  settings: DeductionSettings = defaultDeductionSettings
): {
  totalDeduction: string;
  details: DeductionDetails;
} => {
  const baseSalaryNum = extractNumericValue(baseSalary);
  const workingDays = attendance.totalDays || 22; // Default to 22 working days if not provided
  const dailySalary = baseSalaryNum / workingDays;
  
  const absentDays = workingDays - attendance.presentDays;
  const lateDays = attendance.lateDays || 0;
  
  let absenceDeduction = 0;
  let lateDeduction = 0;
  
  if (settings.usePercentage) {
    // Calculate using percentage of daily salary
    absenceDeduction = absentDays * (dailySalary * (settings.absenceRate / 100));
    lateDeduction = lateDays * (dailySalary * (settings.lateRate / 100));
  } else {
    // Calculate using flat amounts
    absenceDeduction = absentDays * settings.absenceFlatAmount;
    lateDeduction = lateDays * settings.lateFlatAmount;
  }
  
  // Round to the nearest integer
  absenceDeduction = Math.round(absenceDeduction);
  lateDeduction = Math.round(lateDeduction);
  
  const totalDeduction = absenceDeduction + lateDeduction;
  
  return {
    totalDeduction: formatToRupiah(totalDeduction),
    details: {
      absence: formatToRupiah(absenceDeduction),
      late: formatToRupiah(lateDeduction)
    }
  };
};

// Calculate the total salary after deductions
export const calculateTotalSalary = (
  baseSalary: string,
  allowances: string,
  deductions: string
): string => {
  const baseSalaryNum = extractNumericValue(baseSalary);
  const allowancesNum = extractNumericValue(allowances);
  const deductionsNum = extractNumericValue(deductions);
  
  const totalSalary = baseSalaryNum + allowancesNum - deductionsNum;
  return formatToRupiah(Math.max(0, totalSalary));
};

// Generate random attendance record for demo purposes
export const generateRandomAttendance = (): AttendanceRecord => {
  const totalDays = 22;
  const absentDays = Math.floor(Math.random() * 3); // 0-2 days absent
  const lateDays = Math.floor(Math.random() * 4); // 0-3 days late
  
  return {
    presentDays: totalDays - absentDays,
    totalDays,
    lateDays
  };
};

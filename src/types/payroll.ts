
export interface PayrollItem {
  id: number;
  employee: string;
  position: string;
  salary: string;
  bonus: string;
  deductions: string;
  total: string;
  status: "paid" | "processing" | "pending";
  date: string;
}

export interface PayrollSummary {
  totalAmount: string;
  employeeCount: number;
  averageSalary: string;
  totalBonus: string;
  totalDeductions: string;
}

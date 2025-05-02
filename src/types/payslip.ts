
export interface DeductionDetails {
  absence?: string;
  late?: string;
  tax?: string;
  other?: string;
}

export interface AttendanceRecord {
  presentDays: number;
  totalDays: number;
  lateDays?: number;
}

export interface PaySlip {
  id: number;
  employeeId: number;
  employeeName: string;
  position: string;
  month: string;
  year: number;
  baseSalary: string;
  allowances: string;
  deductions: string;
  totalSalary: string;
  status: "draft" | "issued" | "paid";
  issuedDate: string;
  paidDate?: string;
  deductionDetails?: DeductionDetails;
  attendanceRecord?: AttendanceRecord;
  notes?: string;
}

export const paySlipStatusColors: Record<string, string> = {
  draft: "bg-gray-500",
  issued: "bg-blue-500",
  paid: "bg-green-500",
};

export const paySlipStatusLabels: Record<string, string> = {
  draft: "Draft",
  issued: "Diterbitkan",
  paid: "Dibayar",
};

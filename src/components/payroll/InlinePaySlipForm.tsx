
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { PaySlip, AttendanceRecord, DeductionDetails } from "@/types/payslip";
import EmployeeSelect from "./EmployeeSelect";
import { 
  formatToRupiah, 
  extractNumericValue,
  calculateDeductions, 
  calculateTotalSalary,
  defaultDeductionSettings
} from "@/utils/payrollCalculations";
import DeductionSettings from "./DeductionSettings";

interface InlinePaySlipFormProps {
  initialData: PaySlip | null;
  onSave: (data: PaySlip) => void;
  onCancel: () => void;
}

// Schema for pay slip form validation
const paySlipFormSchema = z.object({
  employeeId: z.number().min(1, "ID karyawan diperlukan"),
  employeeName: z.string().min(1, "Nama karyawan diperlukan"),
  position: z.string().min(1, "Posisi diperlukan"),
  month: z.string().min(1, "Bulan diperlukan"),
  year: z.number().int().min(2000, "Tahun harus valid"),
  baseSalary: z.string().min(1, "Gaji pokok diperlukan"),
  allowances: z.string().min(1, "Tunjangan diperlukan"),
  deductions: z.string().min(1, "Potongan diperlukan"),
  totalSalary: z.string().min(1, "Total gaji diperlukan"),
  status: z.enum(["draft", "issued", "paid"]),
  issuedDate: z.string().min(1, "Tanggal terbit diperlukan"),
  paidDate: z.string().optional(),
  notes: z.string().optional(),
});

type PaySlipFormData = z.infer<typeof paySlipFormSchema>;

const InlinePaySlipForm: React.FC<InlinePaySlipFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [deductionSettings, setDeductionSettings] = useState(defaultDeductionSettings);
  const [attendanceRecord, setAttendanceRecord] = useState<AttendanceRecord>({
    presentDays: 22,
    totalDays: 22,
    lateDays: 0
  });
  
  const form = useForm<PaySlipFormData>({
    resolver: zodResolver(paySlipFormSchema),
    defaultValues: initialData ? {
      employeeId: initialData.employeeId,
      employeeName: initialData.employeeName,
      position: initialData.position,
      month: initialData.month,
      year: initialData.year,
      baseSalary: initialData.baseSalary,
      allowances: initialData.allowances,
      deductions: initialData.deductions,
      totalSalary: initialData.totalSalary,
      status: initialData.status,
      issuedDate: initialData.issuedDate,
      paidDate: initialData.paidDate,
      notes: initialData.notes,
    } : {
      employeeId: 0,
      employeeName: "",
      position: "",
      month: new Date().toLocaleString('id-ID', { month: 'long' }),
      year: new Date().getFullYear(),
      baseSalary: "Rp 0",
      allowances: "Rp 0",
      deductions: "Rp 0",
      totalSalary: "Rp 0",
      status: "draft",
      issuedDate: currentDate,
      notes: "",
    },
  });

  const { watch, setValue } = form;

  // Watch base salary, allowances and deductions to calculate total
  const baseSalary = watch("baseSalary");
  const allowances = watch("allowances");
  const deductions = watch("deductions");
  
  // Initialize attendance record from initial data if available
  useEffect(() => {
    if (initialData?.attendanceRecord) {
      setAttendanceRecord(initialData.attendanceRecord);
    }
  }, [initialData]);

  // Handler for employee selection
  const handleEmployeeSelect = (employeeData: any) => {
    if (!employeeData) return;
    
    setValue("employeeId", employeeData.employeeId);
    setValue("employeeName", employeeData.employeeName);
    setValue("position", employeeData.position);
    setValue("baseSalary", employeeData.baseSalary);
    
    if (employeeData.attendanceRecord) {
      setAttendanceRecord(employeeData.attendanceRecord);
    }
    
    // Recalculate deductions based on the new salary and attendance
    const calculatedDeductions = calculateDeductions(
      employeeData.baseSalary, 
      attendanceRecord,
      deductionSettings
    );
    
    setValue("deductions", calculatedDeductions.totalDeduction);
    
    // Also update total salary
    const calculatedTotal = calculateTotalSalary(
      employeeData.baseSalary,
      watch("allowances"),
      calculatedDeductions.totalDeduction
    );
    
    setValue("totalSalary", calculatedTotal);
  };

  // Handle attendance record change
  const handleAttendanceChange = (field: keyof AttendanceRecord, value: number) => {
    const newAttendance = { ...attendanceRecord, [field]: value };
    setAttendanceRecord(newAttendance);
    
    // Recalculate deductions
    const calculatedDeductions = calculateDeductions(
      baseSalary, 
      newAttendance,
      deductionSettings
    );
    
    setValue("deductions", calculatedDeductions.totalDeduction);
    
    // Update total salary
    const calculatedTotal = calculateTotalSalary(
      baseSalary,
      allowances,
      calculatedDeductions.totalDeduction
    );
    
    setValue("totalSalary", calculatedTotal);
  };
  
  // Handle deduction settings change
  const handleDeductionSettingsChange = (newSettings: any) => {
    setDeductionSettings(newSettings);
    
    // Recalculate deductions with new settings
    const calculatedDeductions = calculateDeductions(
      baseSalary, 
      attendanceRecord,
      newSettings
    );
    
    setValue("deductions", calculatedDeductions.totalDeduction);
    
    // Update total salary
    const calculatedTotal = calculateTotalSalary(
      baseSalary,
      allowances,
      calculatedDeductions.totalDeduction
    );
    
    setValue("totalSalary", calculatedTotal);
  };

  // Calculate total whenever base salary, allowances or deductions change
  useEffect(() => {
    const totalSalary = calculateTotalSalary(baseSalary, allowances, deductions);
    setValue("totalSalary", totalSalary);
  }, [baseSalary, allowances, deductions, setValue]);

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const onSubmit = (data: PaySlipFormData) => {
    // Calculate deduction details
    const calculatedDeductions = calculateDeductions(
      data.baseSalary, 
      attendanceRecord,
      deductionSettings
    );
    
    // Add tax as a fixed amount
    const deductionDetails: DeductionDetails = {
      ...calculatedDeductions.details,
      tax: "Rp 500.000" // Default tax amount
    };
    
    const paySlipWithDetails: PaySlip = {
      id: initialData?.id || 0,
      ...data,
      attendanceRecord,
      deductionDetails
    };
    
    onSave(paySlipWithDetails);
  };
  
  // Format currency input
  const formatCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      const numericValue = parseInt(value, 10);
      field.onChange(formatToRupiah(numericValue));
    } else {
      field.onChange("");
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Slip Gaji" : "Buat Slip Gaji Baru"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Employee Selection */}
            <div className="space-y-2">
              <FormLabel>Pilih Karyawan</FormLabel>
              <EmployeeSelect 
                onEmployeeSelect={handleEmployeeSelect}
                defaultValue={initialData?.employeeId.toString()}
              />
              <p className="text-xs text-muted-foreground">
                Pilih karyawan untuk mengisi data secara otomatis
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="employeeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Karyawan</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama karyawan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Posisi</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Posisi karyawan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bulan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih bulan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        placeholder="Tahun"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="baseSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gaji Pokok</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="contoh: Rp 8.000.000" 
                      onChange={(e) => formatCurrencyInput(e, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allowances"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tunjangan</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="contoh: Rp 2.000.000" 
                      onChange={(e) => formatCurrencyInput(e, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Attendance Section */}
            <div className="border rounded-md p-4 space-y-4">
              <h4 className="font-medium">Data Kehadiran</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <FormLabel htmlFor="totalDays">Total Hari Kerja</FormLabel>
                  <Input 
                    id="totalDays" 
                    type="number" 
                    value={attendanceRecord.totalDays} 
                    onChange={(e) => handleAttendanceChange("totalDays", parseInt(e.target.value))}
                    min={0}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <FormLabel htmlFor="presentDays">Hari Hadir</FormLabel>
                  <Input 
                    id="presentDays" 
                    type="number" 
                    value={attendanceRecord.presentDays} 
                    onChange={(e) => handleAttendanceChange("presentDays", parseInt(e.target.value))}
                    min={0}
                    max={attendanceRecord.totalDays}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <FormLabel htmlFor="lateDays">Hari Terlambat</FormLabel>
                  <Input 
                    id="lateDays" 
                    type="number" 
                    value={attendanceRecord.lateDays || 0} 
                    onChange={(e) => handleAttendanceChange("lateDays", parseInt(e.target.value))}
                    min={0}
                    max={attendanceRecord.presentDays}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="text-sm text-right">
                <span className="text-muted-foreground">Ketidakhadiran: </span>
                <span>{attendanceRecord.totalDays - attendanceRecord.presentDays} hari</span>
              </div>
            </div>
            
            {/* Deduction Settings */}
            <div className="mb-4">
              <DeductionSettings onChange={handleDeductionSettingsChange} />
            </div>

            <FormField
              control={form.control}
              name="deductions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Potongan</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="contoh: Rp 1.000.000" 
                      onChange={(e) => formatCurrencyInput(e, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Gaji</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="bg-gray-50 font-bold" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={initialData?.status === "paid"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="issued">Diterbitkan</SelectItem>
                      <SelectItem value="paid">Dibayar</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Catatan tambahan (opsional)" 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-end space-x-2 px-0">
              <Button type="button" variant="outline" onClick={onCancel}>
                Batal
              </Button>
              <Button type="submit">
                {initialData ? "Simpan Perubahan" : "Buat Slip Gaji"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InlinePaySlipForm;

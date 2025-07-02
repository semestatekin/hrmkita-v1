import React from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { PaySlip } from "@/types/payslip";

interface PaySlipFormProps {
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
});

type PaySlipFormData = z.infer<typeof paySlipFormSchema>;

const PaySlipForm: React.FC<PaySlipFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const currentDate = new Date().toISOString().split("T")[0];
  
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
      paidDate: initialData.paidDate || "",
    } : {
      employeeId: Math.floor(Math.random() * 1000) + 1,
      employeeName: "",
      position: "",
      month: new Date().toLocaleString('id-ID', { month: 'long' }),
      year: new Date().getFullYear(),
      baseSalary: "",
      allowances: "",
      deductions: "",
      totalSalary: "",
      status: "draft",
      issuedDate: currentDate,
      paidDate: "",
    },
  });

  const { watch, setValue } = form;

  // Watch base salary, allowances and deductions to calculate total
  const baseSalary = watch("baseSalary");
  const allowances = watch("allowances");
  const deductions = watch("deductions");

  // Helper function to extract numeric value from currency string
  const extractNumericValue = (value: string): number => {
    return parseFloat(value.replace(/[^0-9]/g, "")) || 0;
  };

  // Helper function to format number to Indonesian Rupiah
  const formatToRupiah = (value: number): string => {
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  // Calculate total whenever base salary, allowances or deductions change
  React.useEffect(() => {
    const salaryValue = extractNumericValue(baseSalary);
    const allowancesValue = extractNumericValue(allowances);
    const deductionsValue = extractNumericValue(deductions);
    
    const totalValue = salaryValue + allowancesValue - deductionsValue;
    setValue("totalSalary", formatToRupiah(totalValue));
  }, [baseSalary, allowances, deductions, setValue]);

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const onSubmit = (data: PaySlipFormData) => {
    const paySlip: PaySlip = {
      id: initialData?.id || 0,
      employeeId: data.employeeId,
      employeeName: data.employeeName,
      position: data.position,
      month: data.month,
      year: data.year,
      baseSalary: data.baseSalary,
      allowances: data.allowances,
      deductions: data.deductions,
      totalSalary: data.totalSalary,
      status: data.status,
      issuedDate: data.issuedDate,
      paidDate: data.paidDate || undefined,
    };
    onSave(paySlip);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="employeeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Karyawan</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Masukkan nama karyawan" />
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
                <Input {...field} placeholder="Masukkan posisi karyawan" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    placeholder="contoh: 2023"
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
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9]/g, "");
                    if (value) {
                      const numericValue = parseInt(value, 10);
                      field.onChange(formatToRupiah(numericValue));
                    } else {
                      field.onChange("");
                    }
                  }}
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
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9]/g, "");
                    if (value) {
                      const numericValue = parseInt(value, 10);
                      field.onChange(formatToRupiah(numericValue));
                    } else {
                      field.onChange("");
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9]/g, "");
                    if (value) {
                      const numericValue = parseInt(value, 10);
                      field.onChange(formatToRupiah(numericValue));
                    } else {
                      field.onChange("");
                    }
                  }}
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
                <Input {...field} readOnly className="bg-gray-50" />
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

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button type="submit">
            {initialData ? "Simpan Perubahan" : "Buat Slip Gaji"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default PaySlipForm;

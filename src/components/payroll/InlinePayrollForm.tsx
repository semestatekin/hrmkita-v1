
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
import { PayrollItem } from "@/types/payroll";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface InlinePayrollFormProps {
  initialData: PayrollItem | null;
  onSave: (data: PayrollItem) => void;
  onCancel: () => void;
}

// Schema for payroll form validation
const payrollFormSchema = z.object({
  employee: z.string().min(1, { message: "Nama karyawan diperlukan" }),
  position: z.string().min(1, { message: "Posisi diperlukan" }),
  salary: z.string().min(1, { message: "Gaji pokok diperlukan" }),
  bonus: z.string().min(1, { message: "Bonus diperlukan" }),
  deductions: z.string().min(1, { message: "Potongan diperlukan" }),
  total: z.string().min(1, { message: "Total gaji diperlukan" }),
  status: z.enum(["paid", "processing", "pending"]),
  date: z.string().min(1, { message: "Tanggal diperlukan" }),
});

type PayrollFormData = z.infer<typeof payrollFormSchema>;

const InlinePayrollForm: React.FC<InlinePayrollFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const form = useForm<PayrollFormData>({
    resolver: zodResolver(payrollFormSchema),
    defaultValues: initialData ? {
      employee: initialData.employee,
      position: initialData.position,
      salary: initialData.salary,
      bonus: initialData.bonus,
      deductions: initialData.deductions,
      total: initialData.total,
      status: initialData.status,
      date: initialData.date,
    } : {
      employee: "",
      position: "",
      salary: "",
      bonus: "",
      deductions: "",
      total: "",
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const { watch, setValue } = form;

  // Watch salary, bonus and deductions to calculate total
  const salary = watch("salary");
  const bonus = watch("bonus");
  const deductions = watch("deductions");

  // Helper function to extract numeric value from currency string
  const extractNumericValue = (value: string): number => {
    return parseFloat(value.replace(/[^0-9]/g, "")) || 0;
  };

  // Helper function to format number to Indonesian Rupiah
  const formatToRupiah = (value: number): string => {
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  // Calculate total whenever salary, bonus or deductions change
  React.useEffect(() => {
    const salaryValue = extractNumericValue(salary);
    const bonusValue = extractNumericValue(bonus);
    const deductionsValue = extractNumericValue(deductions);
    
    const totalValue = salaryValue + bonusValue - deductionsValue;
    setValue("total", formatToRupiah(totalValue));
  }, [salary, bonus, deductions, setValue]);

  const onSubmit = (data: PayrollFormData) => {
    const payrollItem: PayrollItem = {
      id: initialData?.id || 0,
      employee: data.employee,
      position: data.position,
      salary: data.salary,
      bonus: data.bonus,
      deductions: data.deductions,
      total: data.total,
      status: data.status,
      date: data.date,
    };
    onSave(payrollItem);
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Data Gaji" : "Tambah Data Gaji"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="employee"
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

            <FormField
              control={form.control}
              name="salary"
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
              name="bonus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bonus</FormLabel>
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
              name="deductions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Potongan</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="contoh: Rp 500.000" 
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
              name="total"
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
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Menunggu</SelectItem>
                      <SelectItem value="processing">Diproses</SelectItem>
                      <SelectItem value="paid">Dibayarkan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
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
                {initialData ? "Simpan Perubahan" : "Tambah Data"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InlinePayrollForm;

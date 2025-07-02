
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getEmployees } from "@/services/employeeService";
import { Employee } from "@/types/employee";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface BulkPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProcess: (data: BulkPaymentFormValues) => void;
}

interface DepartmentOption {
  value: string;
  label: string;
}

interface PositionOption {
  value: string;
  label: string;
}

export interface BulkPaymentFormValues {
  month: string;
  year: number;
  selectionType: "employees" | "departments" | "positions";
  selectedEmployees: number[];
  selectedDepartments: string[];
  selectedPositions: string[];
  processDate: string;
}

const FormSchema = z.object({
  month: z.string().min(1, "Bulan harus dipilih"),
  year: z.number().int().min(2000, "Tahun harus valid"),
  selectionType: z.enum(["employees", "departments", "positions"]),
  selectedEmployees: z.array(z.number()).default([]),
  selectedDepartments: z.array(z.string()).default([]),
  selectedPositions: z.array(z.string()).default([]),
  processDate: z.string().min(1, "Tanggal proses harus diisi"),
});

type FormData = z.infer<typeof FormSchema>;

const months = [
  { value: "Januari", label: "Januari" },
  { value: "Februari", label: "Februari" },
  { value: "Maret", label: "Maret" },
  { value: "April", label: "April" },
  { value: "Mei", label: "Mei" },
  { value: "Juni", label: "Juni" },
  { value: "Juli", label: "Juli" },
  { value: "Agustus", label: "Agustus" },
  { value: "September", label: "September" },
  { value: "Oktober", label: "Oktober" },
  { value: "November", label: "November" },
  { value: "Desember", label: "Desember" },
];

const BulkPaymentModal: React.FC<BulkPaymentModalProps> = ({ isOpen, onClose, onProcess }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [positions, setPositions] = useState<PositionOption[]>([]);
  
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      month: new Date().getMonth() < 11 ? months[new Date().getMonth()].value : months[0].value,
      year: new Date().getFullYear(),
      selectionType: "employees",
      selectedEmployees: [],
      selectedDepartments: [],
      selectedPositions: [],
      processDate: new Date().toISOString().split("T")[0],
    },
  });

  const selectionType = form.watch("selectionType");

  useEffect(() => {
    // Load employees
    const allEmployees = getEmployees();
    setEmployees(allEmployees);
    
    // Extract unique departments
    const uniqueDepartments = Array.from(
      new Set(allEmployees.map(emp => emp.department))
    ).map(dept => ({
      value: dept,
      label: dept
    }));
    setDepartments(uniqueDepartments);
    
    // Extract unique positions
    const uniquePositions = Array.from(
      new Set(allEmployees.map(emp => emp.position))
    ).map(pos => ({
      value: pos,
      label: pos
    }));
    setPositions(uniquePositions);
  }, []);

  const onSubmit = (data: FormData) => {
    // Validate if at least one item is selected based on selection type
    let isValid = true;
    let errorMessage = "";

    if (data.selectionType === "employees" && data.selectedEmployees.length === 0) {
      isValid = false;
      errorMessage = "Pilih minimal satu karyawan";
    } else if (data.selectionType === "departments" && data.selectedDepartments.length === 0) {
      isValid = false;
      errorMessage = "Pilih minimal satu departemen";
    } else if (data.selectionType === "positions" && data.selectedPositions.length === 0) {
      isValid = false;
      errorMessage = "Pilih minimal satu jabatan";
    }

    if (!isValid) {
      toast.error(errorMessage);
      return;
    }

    // Convert to the expected interface
    const bulkPaymentData: BulkPaymentFormValues = {
      month: data.month,
      year: data.year,
      selectionType: data.selectionType,
      selectedEmployees: data.selectedEmployees,
      selectedDepartments: data.selectedDepartments,
      selectedPositions: data.selectedPositions,
      processDate: data.processDate,
    };

    onProcess(bulkPaymentData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Proses Pembayaran Gaji Massal</DialogTitle>
          <DialogDescription>
            Pilih kriteria untuk memproses pembayaran gaji secara massal.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
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
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="processDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Proses</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="selectionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metode Pemilihan</FormLabel>
                  <Tabs 
                    defaultValue="employees" 
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="employees">Karyawan</TabsTrigger>
                      <TabsTrigger value="departments">Departemen</TabsTrigger>
                      <TabsTrigger value="positions">Jabatan</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectionType === "employees" && (
              <FormField
                control={form.control}
                name="selectedEmployees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pilih Karyawan</FormLabel>
                    <FormControl>
                      <div className="border rounded-md p-2">
                        <div className="mb-2">
                          <Checkbox 
                            id="select-all-employees"
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange(employees.map(emp => emp.id));
                              } else {
                                field.onChange([]);
                              }
                            }}
                            checked={field.value.length === employees.length}
                          />
                          <label htmlFor="select-all-employees" className="ml-2 text-sm font-medium">
                            Pilih Semua
                          </label>
                        </div>
                        <ScrollArea className="h-[200px]">
                          <div className="space-y-2">
                            {employees.map((employee) => (
                              <div key={employee.id} className="flex items-center">
                                <Checkbox 
                                  id={`employee-${employee.id}`}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, employee.id]);
                                    } else {
                                      field.onChange(field.value.filter(id => id !== employee.id));
                                    }
                                  }}
                                  checked={field.value.includes(employee.id)}
                                />
                                <label htmlFor={`employee-${employee.id}`} className="ml-2 text-sm flex flex-col">
                                  <span className="font-medium">{employee.name}</span>
                                  <span className="text-xs text-gray-500">{employee.position} - {employee.department}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectionType === "departments" && (
              <FormField
                control={form.control}
                name="selectedDepartments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pilih Departemen</FormLabel>
                    <FormControl>
                      <div className="border rounded-md p-2">
                        <div className="mb-2">
                          <Checkbox 
                            id="select-all-departments"
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange(departments.map(dept => dept.value));
                              } else {
                                field.onChange([]);
                              }
                            }}
                            checked={field.value.length === departments.length}
                          />
                          <label htmlFor="select-all-departments" className="ml-2 text-sm font-medium">
                            Pilih Semua
                          </label>
                        </div>
                        <ScrollArea className="h-[200px]">
                          <div className="space-y-2">
                            {departments.map((department) => (
                              <div key={department.value} className="flex items-center">
                                <Checkbox 
                                  id={`department-${department.value}`}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, department.value]);
                                    } else {
                                      field.onChange(field.value.filter(dept => dept !== department.value));
                                    }
                                  }}
                                  checked={field.value.includes(department.value)}
                                />
                                <label htmlFor={`department-${department.value}`} className="ml-2 text-sm">
                                  {department.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectionType === "positions" && (
              <FormField
                control={form.control}
                name="selectedPositions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pilih Jabatan</FormLabel>
                    <FormControl>
                      <div className="border rounded-md p-2">
                        <div className="mb-2">
                          <Checkbox 
                            id="select-all-positions"
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange(positions.map(pos => pos.value));
                              } else {
                                field.onChange([]);
                              }
                            }}
                            checked={field.value.length === positions.length}
                          />
                          <label htmlFor="select-all-positions" className="ml-2 text-sm font-medium">
                            Pilih Semua
                          </label>
                        </div>
                        <ScrollArea className="h-[200px]">
                          <div className="space-y-2">
                            {positions.map((position) => (
                              <div key={position.value} className="flex items-center">
                                <Checkbox 
                                  id={`position-${position.value}`}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, position.value]);
                                    } else {
                                      field.onChange(field.value.filter(pos => pos !== position.value));
                                    }
                                  }}
                                  checked={field.value.includes(position.value)}
                                />
                                <label htmlFor={`position-${position.value}`} className="ml-2 text-sm">
                                  {position.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit">Proses Pembayaran</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BulkPaymentModal;


import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { KPI } from '@/types/performance';
import { saveKPI, updateKPI } from '@/services/performanceService';

const kpiSchema = z.object({
  title: z.string().min(1, 'Judul KPI wajib diisi'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  targetValue: z.number().min(0, 'Target harus berupa angka positif'),
  currentValue: z.number().min(0, 'Nilai saat ini harus berupa angka positif'),
  unit: z.string().min(1, 'Unit wajib dipilih'),
  startDate: z.string().min(1, 'Tanggal mulai wajib diisi'),
  endDate: z.string().min(1, 'Tanggal berakhir wajib diisi'),
  status: z.enum(['not-started', 'in-progress', 'at-risk', 'completed']),
  employeeId: z.string().min(1, 'Karyawan wajib dipilih'),
  departmentId: z.string().min(1, 'Departemen wajib dipilih'),
});

type KPIFormData = z.infer<typeof kpiSchema>;

interface KPIFormProps {
  kpi?: KPI;
  onSuccess: () => void;
  onCancel: () => void;
}

const KPIForm: React.FC<KPIFormProps> = ({ kpi, onSuccess, onCancel }) => {
  const form = useForm<KPIFormData>({
    resolver: zodResolver(kpiSchema),
    defaultValues: {
      title: kpi?.title || '',
      description: kpi?.description || '',
      targetValue: kpi?.targetValue || 0,
      currentValue: kpi?.currentValue || 0,
      unit: kpi?.unit || '',
      startDate: kpi?.startDate || '',
      endDate: kpi?.endDate || '',
      status: kpi?.status || 'not-started',
      employeeId: kpi?.employeeId || '',
      departmentId: kpi?.departmentId || '',
    },
  });

  const onSubmit = (data: KPIFormData) => {
    try {
      // Convert form data to KPI format
      const kpiData: Omit<KPI, 'id'> = {
        title: data.title,
        description: data.description,
        targetValue: data.targetValue,
        currentValue: data.currentValue,
        unit: data.unit,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
        employeeId: data.employeeId,
        departmentId: data.departmentId,
      };
      
      if (kpi) {
        updateKPI({ ...kpi, ...kpiData });
      } else {
        saveKPI(kpiData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving KPI:', error);
    }
  };

  const unitOptions = [
    { value: 'Rupiah', label: 'Rupiah' },
    { value: '%', label: 'Persen (%)' },
    { value: 'Unit', label: 'Unit' },
    { value: 'Orang', label: 'Orang' },
    { value: 'Hari', label: 'Hari' },
    { value: 'Produk', label: 'Produk' },
  ];

  const statusOptions = [
    { value: 'not-started', label: 'Belum Dimulai' },
    { value: 'in-progress', label: 'Dalam Proses' },
    { value: 'at-risk', label: 'Berisiko' },
    { value: 'completed', label: 'Selesai' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul KPI</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul KPI" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Masukkan deskripsi KPI" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="targetValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nilai Saat Ini</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih unit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {unitOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Mulai</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Berakhir</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="employeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Karyawan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih karyawan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Budi Santoso</SelectItem>
                    <SelectItem value="2">Siti Nurhayati</SelectItem>
                    <SelectItem value="3">Ahmad Wijaya</SelectItem>
                    <SelectItem value="4">Dewi Sartika</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departemen</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih departemen" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Teknologi Informasi</SelectItem>
                    <SelectItem value="2">Sumber Daya Manusia</SelectItem>
                    <SelectItem value="3">Keuangan</SelectItem>
                    <SelectItem value="4">Pemasaran</SelectItem>
                    <SelectItem value="5">Penjualan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" className="flex-1">
            {kpi ? 'Update KPI' : 'Simpan KPI'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Batal
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default KPIForm;

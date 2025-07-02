
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { OKRObjective } from '@/types/performance';
import { saveObjective, updateObjective } from '@/services/performanceService';

const objectiveSchema = z.object({
  title: z.string().min(1, 'Judul objektif wajib diisi'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  startDate: z.string().min(1, 'Tanggal mulai wajib diisi'),
  endDate: z.string().min(1, 'Tanggal berakhir wajib diisi'),
  assigneeId: z.string().min(1, 'Penugasan wajib dipilih'),
  assigneeName: z.string().min(1, 'Nama penugasan wajib diisi'),
  departmentId: z.string().min(1, 'Departemen wajib dipilih'),
  progress: z.number().min(0).max(100, 'Progress harus antara 0-100'),
  status: z.enum(['not-started', 'in-progress', 'at-risk', 'completed']),
});

type ObjectiveFormData = z.infer<typeof objectiveSchema>;

interface OKRFormProps {
  objective?: OKRObjective;
  onSuccess: () => void;
  onCancel: () => void;
}

const OKRForm: React.FC<OKRFormProps> = ({ objective, onSuccess, onCancel }) => {
  const form = useForm<ObjectiveFormData>({
    resolver: zodResolver(objectiveSchema),
    defaultValues: {
      title: objective?.title || '',
      description: objective?.description || '',
      startDate: objective?.startDate || '',
      endDate: objective?.endDate || '',
      assigneeId: objective?.assigneeId || '',
      assigneeName: objective?.assigneeName || '',
      departmentId: objective?.departmentId || '',
      progress: objective?.progress || 0,
      status: objective?.status || 'not-started',
    },
  });

  const onSubmit = (data: ObjectiveFormData) => {
    try {
      // Convert form data to OKRObjective format
      const objectiveData: Omit<OKRObjective, 'id'> = {
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        assigneeId: data.assigneeId,
        assigneeName: data.assigneeName,
        departmentId: data.departmentId,
        progress: data.progress,
        status: data.status,
      };

      if (objective) {
        updateObjective({ ...objective, ...objectiveData });
      } else {
        saveObjective(objectiveData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving objective:', error);
    }
  };

  const statusOptions = [
    { value: 'not-started', label: 'Belum Dimulai' },
    { value: 'in-progress', label: 'Dalam Proses' },
    { value: 'at-risk', label: 'Berisiko' },
    { value: 'completed', label: 'Selesai' },
  ];

  const employeeOptions = [
    { id: '1', name: 'Budi Santoso' },
    { id: '2', name: 'Siti Nurhayati' },
    { id: '3', name: 'Ahmad Wijaya' },
    { id: '4', name: 'Dewi Sartika' },
  ];

  const handleAssigneeChange = (assigneeId: string) => {
    const employee = employeeOptions.find(emp => emp.id === assigneeId);
    if (employee) {
      form.setValue('assigneeId', assigneeId);
      form.setValue('assigneeName', employee.name);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Objektif</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul objektif" {...field} />
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
                  placeholder="Masukkan deskripsi objektif" 
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
          name="assigneeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Penugasan</FormLabel>
              <Select onValueChange={handleAssigneeChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih karyawan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employeeOptions.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="progress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Progress (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    max="100" 
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
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" className="flex-1">
            {objective ? 'Update Objektif' : 'Simpan Objektif'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Batal
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OKRForm;

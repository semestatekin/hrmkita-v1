
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
import { KeyResult } from '@/types/performance';
import { saveKeyResult, updateKeyResult } from '@/services/performanceService';

const keyResultSchema = z.object({
  objectiveId: z.string().min(1, 'Objektif ID wajib diisi'),
  title: z.string().min(1, 'Judul Key Result wajib diisi'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  targetValue: z.number().min(0, 'Target harus berupa angka positif'),
  currentValue: z.number().min(0, 'Nilai saat ini harus berupa angka positif'),
  unit: z.string().min(1, 'Unit wajib dipilih'),
  progress: z.number().min(0).max(100, 'Progress harus antara 0-100'),
  status: z.enum(['not-started', 'in-progress', 'at-risk', 'completed']),
});

type KeyResultFormData = z.infer<typeof keyResultSchema>;

interface KeyResultFormProps {
  keyResult?: KeyResult;
  objectiveId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const KeyResultForm: React.FC<KeyResultFormProps> = ({ 
  keyResult, 
  objectiveId, 
  onSuccess, 
  onCancel 
}) => {
  const form = useForm<KeyResultFormData>({
    resolver: zodResolver(keyResultSchema),
    defaultValues: {
      objectiveId: keyResult?.objectiveId || objectiveId,
      title: keyResult?.title || '',
      description: keyResult?.description || '',
      targetValue: keyResult?.targetValue || 0,
      currentValue: keyResult?.currentValue || 0,
      unit: keyResult?.unit || '',
      progress: keyResult?.progress || 0,
      status: keyResult?.status || 'not-started',
    },
  });

  const onSubmit = (data: KeyResultFormData) => {
    try {
      // Calculate progress based on current vs target value
      const calculatedProgress = Math.min(Math.round((data.currentValue / data.targetValue) * 100), 100);
      const formData = { ...data, progress: calculatedProgress };

      if (keyResult) {
        updateKeyResult({ ...keyResult, ...formData });
      } else {
        saveKeyResult(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving key result:', error);
    }
  };

  const unitOptions = [
    { value: 'Rupiah', label: 'Rupiah' },
    { value: '%', label: 'Persen (%)' },
    { value: 'Unit', label: 'Unit' },
    { value: 'Orang', label: 'Orang' },
    { value: 'Hari', label: 'Hari' },
    { value: 'Produk', label: 'Produk' },
    { value: 'Fitur', label: 'Fitur' },
    { value: 'Pelanggan', label: 'Pelanggan' },
    { value: 'Skor', label: 'Skor' },
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
              <FormLabel>Judul Key Result</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul key result" {...field} />
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
                  placeholder="Masukkan deskripsi key result" 
                  className="min-h-[80px]" 
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

        <div className="grid grid-cols-2 gap-4">
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
            {keyResult ? 'Update Key Result' : 'Simpan Key Result'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Batal
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default KeyResultForm;

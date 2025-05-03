
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface JobOpening {
  id: number;
  title: string;
  description: string;
  requirements: string;
  deadline: string;
}

interface JobApplicationFormProps {
  jobOpenings: JobOpening[];
  selectedJob: number | null;
  onCancel: () => void;
}

const applicationSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap harus diisi minimal 3 karakter"),
  position: z.string().min(1, "Pilih posisi yang dilamar"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  address: z.string().min(10, "Alamat harus diisi minimal 10 karakter"),
  education: z.string().min(3, "Pendidikan terakhir harus diisi"),
  experience: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ 
  jobOpenings,
  selectedJob,
  onCancel
}) => {
  const [uploadedFiles, setUploadedFiles] = useState({
    photo: null,
    idCard: null,
    certificate: null,
    cv: null,
    applicationLetter: null,
    policeRecord: null,
    healthCertificate: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      position: selectedJob ? jobOpenings.find(job => job.id === selectedJob)?.title || "" : "",
      email: "",
      phone: "",
      address: "",
      education: "",
      experience: "",
    },
  });

  const handleFileUpload = (fileType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles({
        ...uploadedFiles,
        [fileType]: e.target.files[0]
      });
      toast.success(`File ${fileType} berhasil diunggah`);
    }
  };

  const onApplicationSubmit = async (data: ApplicationFormData) => {
    // Check if all required documents are uploaded
    const requiredFiles = ['photo', 'idCard', 'certificate', 'cv', 'applicationLetter'];
    const missingFiles = requiredFiles.filter(file => !uploadedFiles[file as keyof typeof uploadedFiles]);
    
    if (missingFiles.length > 0) {
      toast.error("Mohon unggah semua dokumen yang diperlukan");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create a candidate object
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      
      // Simulate saving the candidate data
      // In a real app, this would make an API call to your backend
      const newCandidate = {
        id: uuidv4(),
        fullName: data.fullName,
        position: data.position,
        email: data.email,
        phone: data.phone,
        address: data.address,
        education: data.education,
        experience: data.experience || undefined,
        appliedDate: formattedDate,
        status: 'new',
        documents: {
          // In a real app, these would be URLs to the uploaded files
          photo: `/mock-photos/photo${Math.floor(Math.random() * 5) + 1}.jpg`,
          idCard: "/mock-docs/ktp.pdf",
          certificate: "/mock-docs/ijazah.pdf",
          cv: "/mock-docs/cv.pdf",
          applicationLetter: "/mock-docs/surat-lamaran.pdf",
          policeRecord: uploadedFiles.policeRecord ? "/mock-docs/skck.pdf" : undefined,
          healthCertificate: uploadedFiles.healthCertificate ? "/mock-docs/surat-kesehatan.pdf" : undefined
        }
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Lamaran berhasil dikirim! Tim kami akan menghubungi Anda untuk proses selanjutnya.");
      
      // Reset form and state after submission
      form.reset();
      setUploadedFiles({
        photo: null,
        idCard: null,
        certificate: null,
        cv: null,
        applicationLetter: null,
        policeRecord: null,
        healthCertificate: null,
      });
      onCancel();
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengirim lamaran");
      console.error("Application submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulir Lamaran Kerja</CardTitle>
        <CardDescription>
          {selectedJob 
            ? `Posisi yang dilamar: ${jobOpenings.find(job => job.id === selectedJob)?.title}` 
            : "Silakan pilih posisi yang ingin dilamar"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onApplicationSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
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
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        defaultValue={selectedJob ? jobOpenings.find(job => job.id === selectedJob)?.title : ""}
                        {...field}
                      >
                        <option value="">Pilih posisi</option>
                        {jobOpenings.map(job => (
                          <option key={job.id} value={job.title}>
                            {job.title}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@contoh.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="08xxxxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pendidikan Terakhir</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: S1 Akuntansi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Masukkan alamat lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pengalaman Kerja</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Jelaskan pengalaman kerja Anda (opsional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-base font-medium">Upload Dokumen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="photo" className="text-sm">Foto (Wajib)</Label>
                  <div className="flex items-center mt-1 gap-2">
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('photo', e)}
                      className="text-xs file:text-xs"
                    />
                    {uploadedFiles.photo && <Check className="h-4 w-4 text-green-500" />}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="idCard" className="text-sm">KTP (Wajib)</Label>
                  <div className="flex items-center mt-1 gap-2">
                    <Input
                      id="idCard"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('idCard', e)}
                      className="text-xs file:text-xs"
                    />
                    {uploadedFiles.idCard && <Check className="h-4 w-4 text-green-500" />}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="certificate" className="text-sm">Ijazah (Wajib)</Label>
                  <div className="flex items-center mt-1 gap-2">
                    <Input
                      id="certificate"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload('certificate', e)}
                      className="text-xs file:text-xs"
                    />
                    {uploadedFiles.certificate && <Check className="h-4 w-4 text-green-500" />}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cv" className="text-sm">CV (Wajib)</Label>
                  <div className="flex items-center mt-1 gap-2">
                    <Input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload('cv', e)}
                      className="text-xs file:text-xs"
                    />
                    {uploadedFiles.cv && <Check className="h-4 w-4 text-green-500" />}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="applicationLetter" className="text-sm">Surat Lamaran (Wajib)</Label>
                  <div className="flex items-center mt-1 gap-2">
                    <Input
                      id="applicationLetter"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload('applicationLetter', e)}
                      className="text-xs file:text-xs"
                    />
                    {uploadedFiles.applicationLetter && <Check className="h-4 w-4 text-green-500" />}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="policeRecord" className="text-sm">SKCK (Opsional)</Label>
                  <div className="flex items-center mt-1 gap-2">
                    <Input
                      id="policeRecord"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('policeRecord', e)}
                      className="text-xs file:text-xs"
                    />
                    {uploadedFiles.policeRecord && <Check className="h-4 w-4 text-green-500" />}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="healthCertificate" className="text-sm">Surat Kesehatan (Opsional)</Label>
                  <div className="flex items-center mt-1 gap-2">
                    <Input
                      id="healthCertificate"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('healthCertificate', e)}
                      className="text-xs file:text-xs"
                    />
                    {uploadedFiles.healthCertificate && <Check className="h-4 w-4 text-green-500" />}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end pt-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={onCancel}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Mengirim..." : "Kirim Lamaran"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JobApplicationForm;

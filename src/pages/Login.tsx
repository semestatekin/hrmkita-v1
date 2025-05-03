import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Lock, User, FileText, Upload, Check, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

const jobOpenings = [
  {
    id: 1,
    title: "Manager Keuangan",
    description: "Bertanggung jawab untuk pengelolaan keuangan perusahaan, penyusunan laporan keuangan, dan perencanaan anggaran.",
    requirements: "Minimal S1 Akuntansi, pengalaman 5 tahun di bidang keuangan, menguasai aplikasi akuntansi.",
    deadline: "30 Juni 2025"
  },
  {
    id: 2,
    title: "Staff Administrasi",
    description: "Mengelola dokumen perusahaan, surat menyurat, dan administrasi umum kantor.",
    requirements: "Minimal D3 Administrasi Bisnis, pengalaman 2 tahun, mahir Microsoft Office.",
    deadline: "15 Juni 2025"
  },
  {
    id: 3,
    title: "Sekuriti",
    description: "Menjaga keamanan lingkungan perusahaan dan mengatur lalu lintas kendaraan di area perusahaan.",
    requirements: "Minimal SMA/SMK, tinggi minimal 170cm, sehat jasmani dan rohani.",
    deadline: "10 Juni 2025"
  }
];

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

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("jobinfo");
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
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
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      position: "",
      email: "",
      phone: "",
      address: "",
      education: "",
      experience: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!username || !password) {
        toast.error("Username dan password harus diisi");
        setIsLoading(false);
        return;
      }

      const success = await login(username, password);
      if (success) {
        toast.success("Login berhasil!");
        navigate("/");
      } else {
        toast.error("Terjadi kesalahan saat login");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobSelect = (jobId: number) => {
    setSelectedJob(jobId);
    setActiveTab("apply");
  };

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
      setActiveTab("jobinfo");
      setSelectedJob(null);
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengirim lamaran");
      console.error("Application submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Login Column */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-hrm-primary/5 via-white to-hrm-secondary/10 p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-hrm-primary">HRM System</h1>
            <p className="mt-2 text-muted-foreground">Login untuk mengakses dashboard</p>
          </div>
          
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Masuk</CardTitle>
              <CardDescription className="text-center">
                Masukkan username dan password apapun untuk login demo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <Input
                      id="username"
                      placeholder="Masukkan username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Masuk"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Demo: Gunakan username dan password apapun
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Job Portal Column */}
      <div className="w-full md:w-1/2 bg-slate-50 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-hrm-primary">Portal Lowongan Kerja</h2>
            <p className="text-muted-foreground">Temukan karir impian Anda bersama kami</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="jobinfo">Info Lowongan</TabsTrigger>
              <TabsTrigger value="apply">Formulir Lamaran</TabsTrigger>
            </TabsList>
            
            <TabsContent value="jobinfo" className="space-y-6">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-hrm-primary/10 to-hrm-secondary/10 pb-2">
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 pb-2">
                    <p className="text-sm mb-2">{job.description}</p>
                    <div className="text-sm text-muted-foreground mb-3">
                      <strong>Persyaratan:</strong> {job.requirements}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Tenggat: {job.deadline}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => handleJobSelect(job.id)}
                    >
                      Lamar Sekarang
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="apply">
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
                          onClick={() => {
                            setActiveTab("jobinfo");
                            setSelectedJob(null);
                          }}
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;


import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import JobPortalSection from "@/components/jobportal/JobPortalSection";

// Job openings data
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

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Login Column */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-hrm-primary/5 via-white to-hrm-secondary/10 p-4">
        <LoginForm />
      </div>
      
      {/* Job Portal Column */}
      <div className="w-full md:w-1/2 bg-slate-50 p-4 overflow-y-auto">
        <JobPortalSection jobOpenings={jobOpenings} />
      </div>
    </div>
  );
};

export default Login;

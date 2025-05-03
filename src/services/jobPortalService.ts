
import { Candidate, JobOpening } from "@/types/jobPortal";
import { v4 as uuidv4 } from "uuid";

// Mock Indonesian names for demo data
const indonesianNames = [
  "Budi Santoso",
  "Dewi Lestari",
  "Ahmad Wijaya",
  "Siti Rahayu",
  "Eko Prasetyo",
  "Ani Wulandari",
  "Joko Susilo",
  "Rina Anggraini",
  "Agus Setiawan",
  "Tri Wahyuni"
];

// Mock education backgrounds
const educationBackgrounds = [
  "S1 Akuntansi Universitas Indonesia",
  "S1 Teknik Informatika ITB",
  "D3 Administrasi Bisnis Politeknik Negeri Jakarta",
  "S1 Manajemen Universitas Gadjah Mada",
  "SMK Kejuruan Teknik",
  "S1 Ekonomi Universitas Brawijaya",
  "D4 Akuntansi Politeknik Negeri Semarang",
  "S1 Hukum Universitas Airlangga",
  "S2 Manajemen Keuangan Universitas Indonesia",
  "SMA Negeri 1 Jakarta"
];

// Generate random Indonesian addresses
const generateAddress = () => {
  const streets = ["Jl. Sudirman", "Jl. Thamrin", "Jl. Gatot Subroto", "Jl. Ahmad Yani", "Jl. Merdeka"];
  const numbers = Math.floor(Math.random() * 100) + 1;
  const rts = Math.floor(Math.random() * 20) + 1;
  const rws = Math.floor(Math.random() * 15) + 1;
  const districts = ["Menteng", "Kebayoran Baru", "Kemang", "Tebet", "Kuningan", "Pondok Indah", "Cempaka Putih"];
  const cities = ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara", "Bandung", "Surabaya"];
  const postalCodes = ["10110", "10220", "10330", "10440", "10550", "40115", "60235"];
  
  return `${streets[Math.floor(Math.random() * streets.length)]} No. ${numbers}, RT ${rts}/RW ${rws}, ${districts[Math.floor(Math.random() * districts.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}, ${postalCodes[Math.floor(Math.random() * postalCodes.length)]}`;
};

// Generate random Indonesian phone numbers
const generatePhone = () => {
  const prefixes = ["0812", "0813", "0857", "0878", "0821", "0822", "0852"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  return `${prefix}${suffix}`;
};

// Mock job positions
const positions = [
  "Manager Keuangan",
  "Staff Administrasi",
  "Sekuriti"
];

// Generate mock candidate data
const generateMockCandidates = (): Candidate[] => {
  const candidates: Candidate[] = [];
  
  for (let i = 0; i < 10; i++) {
    const fullName = indonesianNames[i];
    const nameParts = fullName.split(' ');
    const email = `${nameParts[0].toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`;
    const position = positions[Math.floor(Math.random() * positions.length)];
    const status = ["new", "validating", "rejected", "accepted"][Math.floor(Math.random() * 4)] as Candidate['status'];
    
    // Generate a date within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const appliedDate = date.toISOString().split('T')[0];
    
    // Mock photo URLs based on position
    const photoNumber = Math.floor(Math.random() * 5) + 1;
    
    const candidate: Candidate = {
      id: uuidv4(),
      fullName,
      position,
      email,
      phone: generatePhone(),
      address: generateAddress(),
      education: educationBackgrounds[Math.floor(Math.random() * educationBackgrounds.length)],
      experience: Math.random() > 0.3 ? `${Math.floor(Math.random() * 10) + 1} tahun pengalaman sebagai ${position}` : undefined,
      appliedDate,
      status,
      documents: {
        photo: `/mock-photos/photo${photoNumber}.jpg`,
        idCard: "/mock-docs/ktp.pdf",
        certificate: "/mock-docs/ijazah.pdf",
        cv: "/mock-docs/cv.pdf",
        applicationLetter: "/mock-docs/surat-lamaran.pdf",
        policeRecord: Math.random() > 0.5 ? "/mock-docs/skck.pdf" : undefined,
        healthCertificate: Math.random() > 0.5 ? "/mock-docs/surat-kesehatan.pdf" : undefined
      }
    };
    
    // Add rejection reason for rejected candidates
    if (status === 'rejected') {
      const rejectionReasons = [
        "Kualifikasi tidak sesuai dengan kebutuhan posisi",
        "Pengalaman kerja kurang memadai",
        "Tidak lolos tahap wawancara",
        "Dokumen tidak lengkap",
        "Posisi sudah terisi"
      ];
      candidate.rejectionReason = rejectionReasons[Math.floor(Math.random() * rejectionReasons.length)];
    }
    
    candidates.push(candidate);
  }
  
  return candidates;
};

// Mock data for candidates
const mockCandidates = generateMockCandidates();

// Mock data for job openings
const mockJobOpenings: JobOpening[] = [
  {
    id: 1,
    title: "Manager Keuangan",
    description: "Bertanggung jawab untuk pengelolaan keuangan perusahaan, penyusunan laporan keuangan, dan perencanaan anggaran.",
    requirements: "Minimal S1 Akuntansi, pengalaman 5 tahun di bidang keuangan, menguasai aplikasi akuntansi.",
    deadline: "30 Juni 2025",
    isActive: true
  },
  {
    id: 2,
    title: "Staff Administrasi",
    description: "Mengelola dokumen perusahaan, surat menyurat, dan administrasi umum kantor.",
    requirements: "Minimal D3 Administrasi Bisnis, pengalaman 2 tahun, mahir Microsoft Office.",
    deadline: "15 Juni 2025",
    isActive: true
  },
  {
    id: 3,
    title: "Sekuriti",
    description: "Menjaga keamanan lingkungan perusahaan dan mengatur lalu lintas kendaraan di area perusahaan.",
    requirements: "Minimal SMA/SMK, tinggi minimal 170cm, sehat jasmani dan rohani.",
    deadline: "10 Juni 2025",
    isActive: true
  }
];

// Service methods
export const getCandidates = () => {
  return Promise.resolve([...mockCandidates]);
};

export const getCandidateById = (id: string) => {
  const candidate = mockCandidates.find(c => c.id === id);
  return Promise.resolve(candidate || null);
};

export const updateCandidateStatus = (id: string, status: Candidate['status'], rejectionReason?: string) => {
  const candidateIndex = mockCandidates.findIndex(c => c.id === id);
  if (candidateIndex >= 0) {
    mockCandidates[candidateIndex].status = status;
    
    // Add rejection reason if provided and status is rejected
    if (status === 'rejected' && rejectionReason) {
      mockCandidates[candidateIndex].rejectionReason = rejectionReason;
    }
    
    return Promise.resolve(mockCandidates[candidateIndex]);
  }
  return Promise.reject(new Error("Candidate not found"));
};

export const addCandidate = (candidate: Omit<Candidate, 'id'>) => {
  const newCandidate: Candidate = {
    ...candidate,
    id: uuidv4()
  };
  
  mockCandidates.push(newCandidate);
  return Promise.resolve(newCandidate);
};

export const getJobOpenings = () => {
  return Promise.resolve([...mockJobOpenings]);
};

export const getCandidatesByStatus = (status: Candidate['status']) => {
  const filteredCandidates = mockCandidates.filter(c => c.status === status);
  return Promise.resolve(filteredCandidates);
};

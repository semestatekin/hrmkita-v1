
export interface Candidate {
  id: string;
  fullName: string;
  position: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience?: string;
  appliedDate: string;
  status: 'new' | 'validating' | 'rejected' | 'accepted';
  documents: {
    photo: string;
    idCard: string;
    certificate: string;
    cv: string;
    applicationLetter: string;
    policeRecord?: string;
    healthCertificate?: string;
  };
}

export interface JobOpening {
  id: number;
  title: string;
  description: string;
  requirements: string;
  deadline: string;
  isActive: boolean;
}

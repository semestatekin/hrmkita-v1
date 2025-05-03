
import React from "react";
import { Candidate } from "@/types/jobPortal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";

interface CandidateDetailProps {
  candidate: Candidate;
  onViewDocument?: (src: string | undefined, type: string) => void;
}

const CandidateDetail: React.FC<CandidateDetailProps> = ({ 
  candidate,
  onViewDocument
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
            {candidate.documents.photo ? (
              <img
                src={candidate.documents.photo}
                alt={`Foto ${candidate.fullName}`}
                className="h-full w-full object-cover cursor-pointer"
                onClick={() => onViewDocument && onViewDocument(candidate.documents.photo, 'photo')}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Tidak ada foto</p>
              </div>
            )}
          </div>
        </div>
        <div className="md:w-2/3 space-y-4">
          <h3 className="text-2xl font-semibold">{candidate.fullName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Posisi yang Dilamar</p>
              <p>{candidate.position}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <p>
                {candidate.status === 'new' ? 'Baru' : 
                 candidate.status === 'validating' ? 'Proses Validasi' : 
                 candidate.status === 'rejected' ? 'Ditolak' : 'Diterima'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tanggal Lamaran</p>
              <p>{candidate.appliedDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pendidikan</p>
              <p>{candidate.education}</p>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="text-lg font-medium mb-4">Informasi Kontak</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p>{candidate.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Telepon</p>
            <p>{candidate.phone}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-muted-foreground">Alamat</p>
            <p>{candidate.address}</p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="text-lg font-medium mb-4">Pengalaman Kerja</h4>
        <p>{candidate.experience || 'Tidak ada informasi pengalaman kerja'}</p>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="text-lg font-medium mb-4">Dokumen</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => onViewDocument && onViewDocument(candidate.documents.idCard, 'idCard')}
          >
            <FileText className="mr-2 h-4 w-4" />
            KTP
          </Button>
          
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => onViewDocument && onViewDocument(candidate.documents.certificate, 'certificate')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Ijazah
          </Button>
          
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => onViewDocument && onViewDocument(candidate.documents.cv, 'cv')}
          >
            <FileText className="mr-2 h-4 w-4" />
            CV
          </Button>
          
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => onViewDocument && onViewDocument(candidate.documents.applicationLetter, 'applicationLetter')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Surat Lamaran
          </Button>
          
          {candidate.documents.policeRecord && (
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => onViewDocument && onViewDocument(candidate.documents.policeRecord, 'policeRecord')}
            >
              <FileText className="mr-2 h-4 w-4" />
              SKCK
            </Button>
          )}
          
          {candidate.documents.healthCertificate && (
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => onViewDocument && onViewDocument(candidate.documents.healthCertificate, 'healthCertificate')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Surat Kesehatan
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;

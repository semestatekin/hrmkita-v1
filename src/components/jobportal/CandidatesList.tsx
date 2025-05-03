
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Candidate } from "@/types/jobPortal";
import { updateCandidateStatus } from "@/services/jobPortalService";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CandidateDetail from "./CandidateDetail";

interface CandidatesListProps {
  candidates: Candidate[];
  isLoading: boolean;
  onStatusUpdate: (candidate: Candidate) => void;
}

const CandidatesList: React.FC<CandidatesListProps> = ({ 
  candidates, 
  isLoading, 
  onStatusUpdate 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [documentSrc, setDocumentSrc] = useState<string | null>(null);

  const handleStartValidation = async (candidateId: string) => {
    try {
      const updatedCandidate = await updateCandidateStatus(candidateId, 'validating');
      onStatusUpdate(updatedCandidate);
      toast.success("Kandidat telah dipindahkan ke proses validasi");
    } catch (error) {
      toast.error("Gagal memindahkan kandidat");
    }
  };

  const handleViewDetail = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailOpen(true);
  };

  const handleViewDocument = (src: string | undefined, type: string) => {
    if (!src) return;
    
    setDocumentSrc(src);
    setDocumentType(type);
    setIsDocumentOpen(true);
  };

  // Filter candidates based on search query
  const filteredCandidates = candidates.filter(
    candidate => 
      candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h3 className="text-xl font-medium">Daftar Kandidat Baru</h3>
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari kandidat..."
              className="pl-8 max-w-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Memuat data kandidat...</div>
        ) : filteredCandidates.length === 0 ? (
          <div className="text-center py-8 border rounded-md bg-muted/20">
            {searchQuery ? "Tidak ada kandidat yang sesuai dengan pencarian" : "Belum ada kandidat baru"}
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Posisi</TableHead>
                  <TableHead>Pendidikan</TableHead>
                  <TableHead>Tanggal Lamaran</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium">{candidate.fullName}</TableCell>
                    <TableCell>{candidate.position}</TableCell>
                    <TableCell>{candidate.education}</TableCell>
                    <TableCell>{candidate.appliedDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleViewDetail(candidate)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Detail
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleStartValidation(candidate.id)}
                        >
                          Validasi
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Candidate Detail Dialog */}
      {selectedCandidate && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detail Kandidat</DialogTitle>
              <DialogDescription>
                Informasi lengkap tentang kandidat
              </DialogDescription>
            </DialogHeader>
            
            <CandidateDetail 
              candidate={selectedCandidate}
              onViewDocument={(src, type) => handleViewDocument(src, type)}
            />
            
            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Tutup
              </Button>
              <Button 
                onClick={() => {
                  handleStartValidation(selectedCandidate.id);
                  setIsDetailOpen(false);
                }}
              >
                Mulai Validasi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Document Viewer Dialog */}
      <Dialog open={isDocumentOpen} onOpenChange={setIsDocumentOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {documentType === 'photo' 
                ? 'Foto Kandidat' 
                : documentType === 'idCard'
                ? 'KTP Kandidat'
                : documentType === 'certificate'
                ? 'Ijazah'
                : documentType === 'cv'
                ? 'Curriculum Vitae'
                : documentType === 'applicationLetter'
                ? 'Surat Lamaran'
                : documentType === 'policeRecord'
                ? 'SKCK'
                : documentType === 'healthCertificate'
                ? 'Surat Kesehatan'
                : 'Dokumen'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-center my-4">
            {documentType === 'photo' ? (
              <img 
                src={documentSrc || ''} 
                alt="Foto Kandidat" 
                className="max-w-full max-h-[70vh] object-contain" 
              />
            ) : (
              <div className="bg-slate-100 p-10 rounded-md w-full text-center">
                <p className="text-lg font-medium mb-4">Pratinjau Dokumen</p>
                <p className="text-sm text-gray-500">
                  Dokumen {documentType === 'idCard' 
                    ? 'KTP' 
                    : documentType === 'certificate'
                    ? 'Ijazah'
                    : documentType === 'cv'
                    ? 'CV'
                    : documentType === 'applicationLetter'
                    ? 'Surat Lamaran'
                    : documentType === 'policeRecord'
                    ? 'SKCK'
                    : documentType === 'healthCertificate'
                    ? 'Surat Kesehatan'
                    : ''
                  }</p>
                <div className="mt-4">
                  <Button onClick={() => window.open(documentSrc || '', '_blank')}>
                    Buka Dokumen
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CandidatesList;

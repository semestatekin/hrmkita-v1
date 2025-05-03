
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CandidateDetail from "./CandidateDetail";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface RejectedCandidatesProps {
  candidates: Candidate[];
  isLoading: boolean;
}

const RejectedCandidates: React.FC<RejectedCandidatesProps> = ({ 
  candidates, 
  isLoading 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [documentSrc, setDocumentSrc] = useState<string | null>(null);

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
          <h3 className="text-xl font-medium">Daftar Kandidat Tidak Diterima</h3>
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
            {searchQuery ? "Tidak ada kandidat yang sesuai dengan pencarian" : "Belum ada kandidat yang ditolak"}
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
                  <TableHead>Alasan Penolakan</TableHead>
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
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {candidate.rejectionReason || "Tidak ada alasan"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleViewDetail(candidate)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Detail
                      </Button>
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
            </DialogHeader>
            
            <div className="mb-4">
              <Badge variant="destructive" className="mb-2">Ditolak</Badge>
              {selectedCandidate.rejectionReason && (
                <div className="bg-red-50 border border-red-100 p-3 rounded-md mt-1">
                  <p className="text-sm font-medium text-red-800">Alasan Penolakan:</p>
                  <p className="text-sm text-red-600">{selectedCandidate.rejectionReason}</p>
                </div>
              )}
            </div>

            <Separator className="my-4" />
            
            <CandidateDetail 
              candidate={selectedCandidate} 
              onViewDocument={(src, type) => handleViewDocument(src, type)}
            />
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

export default RejectedCandidates;

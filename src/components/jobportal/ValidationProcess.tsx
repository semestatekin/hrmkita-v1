
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
import { Check, Eye, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import CandidateDetail from "./CandidateDetail";

interface ValidationProcessProps {
  candidates: Candidate[];
  isLoading: boolean;
  onStatusUpdate: (candidate: Candidate) => void;
}

const ValidationProcess: React.FC<ValidationProcessProps> = ({ 
  candidates, 
  isLoading, 
  onStatusUpdate 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);

  const handleReject = async (candidateId: string) => {
    try {
      const updatedCandidate = await updateCandidateStatus(candidateId, 'rejected');
      onStatusUpdate(updatedCandidate);
      toast.success("Kandidat ditolak");
      setIsRejectDialogOpen(false);
    } catch (error) {
      toast.error("Gagal menolak kandidat");
    }
  };

  const handleAccept = async (candidateId: string) => {
    try {
      const updatedCandidate = await updateCandidateStatus(candidateId, 'accepted');
      onStatusUpdate(updatedCandidate);
      toast.success("Kandidat diterima");
      setIsAcceptDialogOpen(false);
    } catch (error) {
      toast.error("Gagal menerima kandidat");
    }
  };

  const handleViewDetail = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailOpen(true);
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
          <h3 className="text-xl font-medium">Proses Validasi Kandidat</h3>
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
            {searchQuery ? "Tidak ada kandidat yang sesuai dengan pencarian" : "Belum ada kandidat dalam proses validasi"}
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
                          variant="destructive"
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setIsRejectDialogOpen(true);
                          }}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Tolak
                        </Button>
                        <Button 
                          size="sm"
                          variant="default"
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setIsAcceptDialogOpen(true);
                          }}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Terima
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
            
            <CandidateDetail candidate={selectedCandidate} />
            
            <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Tutup
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="destructive"
                  onClick={() => {
                    setIsDetailOpen(false);
                    setIsRejectDialogOpen(true);
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  Tolak
                </Button>
                <Button 
                  onClick={() => {
                    setIsDetailOpen(false);
                    setIsAcceptDialogOpen(true);
                  }}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Terima
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Confirmation Dialog */}
      {selectedCandidate && (
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tolak Kandidat</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menolak kandidat ini? Tindakan ini tidak dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p><strong>Nama:</strong> {selectedCandidate.fullName}</p>
              <p><strong>Posisi:</strong> {selectedCandidate.position}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                Batal
              </Button>
              <Button 
                variant="destructive"
                onClick={() => handleReject(selectedCandidate.id)}
              >
                Ya, Tolak Kandidat
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Accept Confirmation Dialog */}
      {selectedCandidate && (
        <Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Terima Kandidat</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menerima kandidat ini?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p><strong>Nama:</strong> {selectedCandidate.fullName}</p>
              <p><strong>Posisi:</strong> {selectedCandidate.position}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAcceptDialogOpen(false)}>
                Batal
              </Button>
              <Button 
                onClick={() => handleAccept(selectedCandidate.id)}
              >
                Ya, Terima Kandidat
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ValidationProcess;

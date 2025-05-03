
import React, { useState } from "react";
import { Candidate } from "@/types/jobPortal";
import { updateCandidateStatus } from "@/services/jobPortalService";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import CandidateDetail from "./CandidateDetail";
import CandidateSearchBar from "./candidate-table/CandidateSearchBar";
import CandidateTable from "./candidate-table/CandidateTable";
import RejectionDialog from "./dialogs/RejectionDialog";
import AcceptanceDialog from "./dialogs/AcceptanceDialog";
import DocumentViewerDialog from "./dialogs/DocumentViewerDialog";

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
  const [rejectionReason, setRejectionReason] = useState("");
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [documentSrc, setDocumentSrc] = useState<string | null>(null);

  const handleReject = async (candidateId: string) => {
    try {
      const updatedCandidate = await updateCandidateStatus(candidateId, 'rejected', rejectionReason);
      onStatusUpdate(updatedCandidate);
      toast.success("Kandidat ditolak");
      setIsRejectDialogOpen(false);
      setRejectionReason("");
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

  const renderActionButtons = (candidate: Candidate) => {
    return (
      <>
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
      </>
    );
  };

  return (
    <>
      <div className="space-y-4">
        <CandidateSearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          title="Proses Validasi Kandidat"
        />

        {isLoading ? (
          <div className="text-center py-8">Memuat data kandidat...</div>
        ) : filteredCandidates.length === 0 ? (
          <div className="text-center py-8 border rounded-md bg-muted/20">
            {searchQuery ? "Tidak ada kandidat yang sesuai dengan pencarian" : "Belum ada kandidat dalam proses validasi"}
          </div>
        ) : (
          <CandidateTable
            candidates={filteredCandidates}
            onViewDetail={handleViewDetail}
            actionButtons={renderActionButtons}
          />
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

      {/* Dialogs */}
      <RejectionDialog
        candidate={selectedCandidate}
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onReject={handleReject}
      />

      <AcceptanceDialog
        candidate={selectedCandidate}
        open={isAcceptDialogOpen}
        onOpenChange={setIsAcceptDialogOpen}
        onAccept={handleAccept}
      />

      <DocumentViewerDialog
        open={isDocumentOpen}
        onOpenChange={setIsDocumentOpen}
        documentType={documentType}
        documentSrc={documentSrc}
      />
    </>
  );
};

export default ValidationProcess;

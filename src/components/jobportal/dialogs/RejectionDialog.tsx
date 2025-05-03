
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { Candidate } from "@/types/jobPortal";

interface RejectionDialogProps {
  candidate: Candidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onReject: (candidateId: string) => void;
}

const RejectionDialog: React.FC<RejectionDialogProps> = ({
  candidate,
  open,
  onOpenChange,
  rejectionReason,
  setRejectionReason,
  onReject,
}) => {
  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tolak Kandidat</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menolak kandidat ini? Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p><strong>Nama:</strong> {candidate.fullName}</p>
          <p><strong>Posisi:</strong> {candidate.position}</p>
          
          <div className="mt-4">
            <Label htmlFor="rejectionReason">Alasan Penolakan (Opsional)</Label>
            <Textarea 
              id="rejectionReason"
              placeholder="Masukkan alasan penolakan kandidat..."
              className="mt-1"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button 
            variant="destructive"
            onClick={() => onReject(candidate.id)}
          >
            <X className="h-4 w-4 mr-1" />
            Ya, Tolak Kandidat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectionDialog;

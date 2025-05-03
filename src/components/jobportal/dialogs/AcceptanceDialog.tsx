
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { Candidate } from "@/types/jobPortal";

interface AcceptanceDialogProps {
  candidate: Candidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: (candidateId: string) => void;
}

const AcceptanceDialog: React.FC<AcceptanceDialogProps> = ({
  candidate,
  open,
  onOpenChange,
  onAccept,
}) => {
  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terima Kandidat</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menerima kandidat ini?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p><strong>Nama:</strong> {candidate.fullName}</p>
          <p><strong>Posisi:</strong> {candidate.position}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button 
            onClick={() => onAccept(candidate.id)}
          >
            <Check className="h-4 w-4 mr-1" />
            Ya, Terima Kandidat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptanceDialog;


import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DocumentViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentType: string | null;
  documentSrc: string | null;
}

const DocumentViewerDialog: React.FC<DocumentViewerDialogProps> = ({
  open,
  onOpenChange,
  documentType,
  documentSrc
}) => {
  const getDocumentTypeName = (type: string | null): string => {
    switch(type) {
      case 'photo': return 'Foto Kandidat';
      case 'idCard': return 'KTP Kandidat';
      case 'certificate': return 'Ijazah';
      case 'cv': return 'Curriculum Vitae';
      case 'applicationLetter': return 'Surat Lamaran';
      case 'policeRecord': return 'SKCK';
      case 'healthCertificate': return 'Surat Kesehatan';
      default: return 'Dokumen';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {getDocumentTypeName(documentType)}
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
                Dokumen {getDocumentTypeName(documentType).toLowerCase()}
              </p>
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
  );
};

export default DocumentViewerDialog;

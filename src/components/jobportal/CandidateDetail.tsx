
import React from "react";
import { Candidate } from "@/types/jobPortal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, BookOpen, Briefcase, Calendar, Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CandidateDetailProps {
  candidate: Candidate;
}

const CandidateDetail: React.FC<CandidateDetailProps> = ({ candidate }) => {
  const getStatusBadge = (status: Candidate['status']) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Baru</Badge>;
      case 'validating':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Validasi</Badge>;
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Diterima</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Ditolak</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const renderDocumentButton = (label: string, docPath?: string) => {
    if (!docPath) return null;
    
    return (
      <Button variant="outline" size="sm" className="flex items-center gap-2 w-full justify-start">
        <FileText className="h-4 w-4" />
        <span className="truncate">{label}</span>
        <Download className="h-3 w-3 ml-auto" />
      </Button>
    );
  };

  return (
    <div className="space-y-6 py-2">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-40 bg-gray-100 rounded-md overflow-hidden">
            {candidate.documents.photo ? (
              <img 
                src={candidate.documents.photo} 
                alt={candidate.fullName}
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Photo
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold">{candidate.fullName}</h3>
            {getStatusBadge(candidate.status)}
          </div>
          
          <p className="text-lg font-medium">{candidate.position}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{candidate.email}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{candidate.phone}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{candidate.education}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Melamar pada {candidate.appliedDate}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-2 text-sm mt-2">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <span>{candidate.address}</span>
          </div>
          
          {candidate.experience && (
            <div className="flex items-start gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span>{candidate.experience}</span>
            </div>
          )}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="font-medium mb-3">Dokumen</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {renderDocumentButton("KTP", candidate.documents.idCard)}
          {renderDocumentButton("Ijazah", candidate.documents.certificate)}
          {renderDocumentButton("CV", candidate.documents.cv)}
          {renderDocumentButton("Surat Lamaran", candidate.documents.applicationLetter)}
          {renderDocumentButton("SKCK", candidate.documents.policeRecord)}
          {renderDocumentButton("Surat Kesehatan", candidate.documents.healthCertificate)}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;

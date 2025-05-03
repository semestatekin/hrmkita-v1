
import React from "react";
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
import { Eye, Check, X } from "lucide-react";

interface CandidateTableProps {
  candidates: Candidate[];
  onViewDetail: (candidate: Candidate) => void;
  actionButtons: (candidate: Candidate) => React.ReactNode;
}

const CandidateTable: React.FC<CandidateTableProps> = ({ 
  candidates,
  onViewDetail,
  actionButtons
}) => {
  return (
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
          {candidates.map((candidate) => (
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
                    onClick={() => onViewDetail(candidate)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Detail
                  </Button>
                  {actionButtons(candidate)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CandidateTable;

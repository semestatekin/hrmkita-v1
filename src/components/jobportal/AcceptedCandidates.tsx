
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CandidateDetail from "./CandidateDetail";

interface AcceptedCandidatesProps {
  candidates: Candidate[];
  isLoading: boolean;
}

const AcceptedCandidates: React.FC<AcceptedCandidatesProps> = ({ 
  candidates, 
  isLoading
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
          <h3 className="text-xl font-medium">Kandidat yang Diterima</h3>
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
            {searchQuery ? "Tidak ada kandidat yang sesuai dengan pencarian" : "Belum ada kandidat yang diterima"}
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
              <DialogDescription>
                Informasi lengkap tentang kandidat
              </DialogDescription>
            </DialogHeader>
            
            <CandidateDetail candidate={selectedCandidate} />
            
            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AcceptedCandidates;

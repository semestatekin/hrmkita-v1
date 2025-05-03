
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
import { JobOpening } from "@/types/jobPortal";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface JobOpeningsListProps {
  jobOpenings: JobOpening[];
  isLoading: boolean;
}

const JobOpeningsList: React.FC<JobOpeningsListProps> = ({ 
  jobOpenings, 
  isLoading
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h3 className="text-xl font-medium">Daftar Lowongan Kerja</h3>
        <Button>Tambah Lowongan Baru</Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Memuat data lowongan...</div>
      ) : jobOpenings.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-muted/20">
          Belum ada lowongan kerja yang tersedia
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posisi</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Persyaratan</TableHead>
                <TableHead>Tenggat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobOpenings.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{job.description}</TableCell>
                  <TableCell className="max-w-xs truncate">{job.requirements}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      {job.deadline}
                    </div>
                  </TableCell>
                  <TableCell>
                    {job.isActive ? 
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Aktif</Badge> : 
                      <Badge variant="secondary">Nonaktif</Badge>
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm"
                        variant={job.isActive ? "destructive" : "default"}
                      >
                        {job.isActive ? "Nonaktifkan" : "Aktifkan"}
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
  );
};

export default JobOpeningsList;


import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { PaySlip, paySlipStatusColors, paySlipStatusLabels } from "@/types/payslip";

interface PaySlipTableProps {
  paySlips: PaySlip[];
  onViewPaySlip: (slip: PaySlip) => void;
  onEditPaySlip: (slip: PaySlip) => void;
  onDeletePaySlip: (slip: PaySlip) => void;
  onIssuePaySlip: (slip: PaySlip) => void;
  onMarkAsPaid: (slip: PaySlip) => void;
}

const PaySlipTable: React.FC<PaySlipTableProps> = ({
  paySlips,
  onViewPaySlip,
  onEditPaySlip,
  onDeletePaySlip,
  onIssuePaySlip,
  onMarkAsPaid,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Karyawan</TableHead>
            <TableHead>Bulan</TableHead>
            <TableHead>Gaji Pokok</TableHead>
            <TableHead>Tunjangan</TableHead>
            <TableHead>Potongan</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paySlips.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                Tidak ada slip gaji
              </TableCell>
            </TableRow>
          ) : (
            paySlips.map((slip) => (
              <TableRow key={slip.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="font-medium text-gray-600">
                        {slip.employeeName.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{slip.employeeName}</div>
                      <div className="text-sm text-gray-500">{slip.position}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{`${slip.month} ${slip.year}`}</TableCell>
                <TableCell>{slip.baseSalary}</TableCell>
                <TableCell>{slip.allowances}</TableCell>
                <TableCell>{slip.deductions}</TableCell>
                <TableCell className="font-bold">{slip.totalSalary}</TableCell>
                <TableCell>
                  <Badge
                    className={`${paySlipStatusColors[slip.status]} text-white font-normal`}
                  >
                    {paySlipStatusLabels[slip.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewPaySlip(slip)}>
                        Lihat Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditPaySlip(slip)}>
                        Edit
                      </DropdownMenuItem>
                      {slip.status === "draft" && (
                        <DropdownMenuItem onClick={() => onIssuePaySlip(slip)}>
                          Terbitkan
                        </DropdownMenuItem>
                      )}
                      {slip.status === "issued" && (
                        <DropdownMenuItem onClick={() => onMarkAsPaid(slip)}>
                          Tandai Dibayar
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Unduh PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-500" 
                        onClick={() => onDeletePaySlip(slip)}
                      >
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaySlipTable;

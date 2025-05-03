
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { PayrollItem } from "@/types/payroll";

interface PayrollTableProps {
  payrollItems: PayrollItem[];
  onEditItem: (item: PayrollItem) => void;
  onDeleteItem: (item: PayrollItem) => void;
}

// Define status mapping
const statusColors: Record<string, string> = {
  paid: "bg-green-500",
  processing: "bg-yellow-500",
  pending: "bg-gray-500",
};

const statusLabels: Record<string, string> = {
  paid: "Dibayarkan",
  processing: "Diproses",
  pending: "Menunggu",
};

const PayrollTable: React.FC<PayrollTableProps> = ({ 
  payrollItems, 
  onEditItem, 
  onDeleteItem 
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Karyawan</TableHead>
            <TableHead>Gaji Pokok</TableHead>
            <TableHead>Bonus</TableHead>
            <TableHead>Potongan</TableHead>
            <TableHead>Total Gaji</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrollItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                Tidak ada data penggajian
              </TableCell>
            </TableRow>
          ) : (
            payrollItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="font-medium text-gray-600">
                        {item.employee.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{item.employee}</div>
                      <div className="text-sm text-gray-500">{item.position}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.salary}</TableCell>
                <TableCell>{item.bonus}</TableCell>
                <TableCell>{item.deductions}</TableCell>
                <TableCell className="font-bold">{item.total}</TableCell>
                <TableCell>
                  <Badge
                    className={`${statusColors[item.status]} text-white font-normal`}
                  >
                    {statusLabels[item.status]}
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
                      <DropdownMenuItem onClick={() => onEditItem(item)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeleteItem(item)}>
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

export default PayrollTable;

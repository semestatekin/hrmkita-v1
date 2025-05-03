
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, CreditCard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaySlipSearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddPaySlip: () => void;
  onBulkPayment: () => void;
}

const PaySlipSearch: React.FC<PaySlipSearchProps> = ({
  searchQuery,
  onSearchChange,
  onAddPaySlip,
  onBulkPayment,
}) => {
  return (
    <div className="flex justify-between flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[250px] flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari karyawan..."
            className="pl-9"
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="issued">Diterbitkan</SelectItem>
            <SelectItem value="paid">Dibayar</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onBulkPayment}>
          <CreditCard className="mr-2 h-4 w-4" />
          Pembayaran Massal
        </Button>
        <Button onClick={onAddPaySlip}>
          <Plus className="mr-2 h-4 w-4" />
          Buat Slip Gaji
        </Button>
      </div>
    </div>
  );
};

export default PaySlipSearch;

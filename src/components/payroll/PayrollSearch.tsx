
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, CreditCard } from "lucide-react";

interface PayrollSearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddPayroll: () => void;
  onBulkPayment: () => void;
}

const PayrollSearch: React.FC<PayrollSearchProps> = ({
  searchQuery,
  onSearchChange,
  onAddPayroll,
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
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onBulkPayment}>
          <CreditCard className="mr-2 h-4 w-4" />
          Pembayaran Massal
        </Button>
        <Button onClick={onAddPayroll}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Penggajian
        </Button>
      </div>
    </div>
  );
};

export default PayrollSearch;

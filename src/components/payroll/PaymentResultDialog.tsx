
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BulkPaymentResult } from "@/services/payrollService";

interface PaymentResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  result: BulkPaymentResult | null;
}

const PaymentResultDialog: React.FC<PaymentResultDialogProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  if (!result) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Hasil Proses Pembayaran Massal</DialogTitle>
          <DialogDescription>
            Berikut adalah ringkasan proses pembayaran gaji massal.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">Total Diproses</div>
              <div className="text-lg font-bold">{result.totalProcessed} Karyawan</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">Total Nilai</div>
              <div className="text-lg font-bold">{result.totalAmount}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-md">
              <div className="text-sm text-green-500">Berhasil</div>
              <div className="text-lg font-bold">{result.successCount} Karyawan</div>
            </div>
            {result.failedCount > 0 && (
              <div className="bg-red-50 p-4 rounded-md">
                <div className="text-sm text-red-500">Gagal</div>
                <div className="text-lg font-bold">{result.failedCount} Karyawan</div>
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-500">
            Semua slip gaji telah dibuat dan data penggajian telah diperbarui.
          </p>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentResultDialog;

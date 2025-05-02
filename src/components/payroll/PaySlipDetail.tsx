
import React from "react";
import { PaySlip, paySlipStatusColors, paySlipStatusLabels } from "@/types/payslip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Calendar, Save, User } from "lucide-react";

interface PaySlipDetailProps {
  paySlip: PaySlip;
}

const PaySlipDetail: React.FC<PaySlipDetailProps> = ({ paySlip }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd MMMM yyyy");
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Slip Gaji</h2>
          <p className="text-gray-500">
            Periode: {paySlip.month} {paySlip.year}
          </p>
        </div>
        <Badge
          className={`${paySlipStatusColors[paySlip.status]} text-white`}
        >
          {paySlipStatusLabels[paySlip.status]}
        </Badge>
      </div>
      
      <Separator />
      
      {/* Employee Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Informasi Karyawan</span>
          </div>
          <div className="pl-6">
            <div className="grid grid-cols-[100px_auto] gap-1">
              <span className="text-gray-500">Nama:</span>
              <span className="font-medium">{paySlip.employeeName}</span>
              
              <span className="text-gray-500">Posisi:</span>
              <span>{paySlip.position}</span>
              
              <span className="text-gray-500">ID Karyawan:</span>
              <span>{paySlip.employeeId}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Informasi Slip</span>
          </div>
          <div className="pl-6">
            <div className="grid grid-cols-[120px_auto] gap-1">
              <span className="text-gray-500">Tanggal Terbit:</span>
              <span>{formatDate(paySlip.issuedDate)}</span>
              
              <span className="text-gray-500">Tanggal Bayar:</span>
              <span>{paySlip.paidDate ? formatDate(paySlip.paidDate) : "-"}</span>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Payment Details */}
      <div>
        <h3 className="font-medium mb-3">Rincian Pembayaran</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <span className="text-gray-500">Gaji Pokok</span>
            <span className="text-right">{paySlip.baseSalary}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pb-2">
            <span className="text-gray-500">Tunjangan</span>
            <span className="text-right">{paySlip.allowances}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pb-3 border-b">
            <span className="text-gray-500">Potongan</span>
            <span className="text-right text-red-500">-{paySlip.deductions}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 font-bold">
            <span>Total Gaji</span>
            <span className="text-right">{paySlip.totalSalary}</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Notes */}
      <div className="text-sm text-gray-500 italic">
        <p>Slip gaji ini dikeluarkan secara otomatis dan sah tanpa tanda tangan.</p>
      </div>
    </div>
  );
};

export default PaySlipDetail;

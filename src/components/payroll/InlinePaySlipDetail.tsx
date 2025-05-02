
import React from "react";
import { PaySlip, paySlipStatusColors, paySlipStatusLabels } from "@/types/payslip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Calendar, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InlinePaySlipDetailProps {
  paySlip: PaySlip;
  onClose: () => void;
  onEdit: (paySlip: PaySlip) => void;
}

const InlinePaySlipDetail: React.FC<InlinePaySlipDetailProps> = ({ 
  paySlip, 
  onClose,
  onEdit
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd MMMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  // Format currency amount for display
  const formatCurrency = (amount: string) => {
    // Return as is if already formatted
    if (amount.includes("Rp")) return amount;
    return `Rp ${parseInt(amount).toLocaleString("id-ID")}`;
  };
  
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Slip Gaji</h2>
          <p className="text-gray-500">
            Periode: {paySlip.month} {paySlip.year}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={`${paySlipStatusColors[paySlip.status]} text-white`}
          >
            {paySlipStatusLabels[paySlip.status]}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => onEdit(paySlip)}>
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Tutup
          </Button>
        </div>
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
            <span className="text-right">{formatCurrency(paySlip.baseSalary)}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pb-2">
            <span className="text-gray-500">Tunjangan</span>
            <span className="text-right">{formatCurrency(paySlip.allowances)}</span>
          </div>
          
          {/* Deductions Detail Section */}
          <div className="pb-2">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-500">Potongan:</span>
              <span className="text-right text-red-500">-{formatCurrency(paySlip.deductions)}</span>
            </div>
            
            {paySlip.deductionDetails && (
              <div className="mt-2 pl-4 text-sm text-gray-500">
                <div className="flex items-center gap-1 mb-1">
                  <FileText className="h-3 w-3" />
                  <span className="font-medium">Rincian Potongan:</span>
                </div>
                <ul className="list-disc pl-6 space-y-1">
                  {paySlip.deductionDetails.absence && (
                    <li>Ketidakhadiran: -{formatCurrency(paySlip.deductionDetails.absence)}</li>
                  )}
                  {paySlip.deductionDetails.late && (
                    <li>Keterlambatan: -{formatCurrency(paySlip.deductionDetails.late)}</li>
                  )}
                  {paySlip.deductionDetails.tax && (
                    <li>Pajak: -{formatCurrency(paySlip.deductionDetails.tax)}</li>
                  )}
                  {paySlip.deductionDetails.other && (
                    <li>Lainnya: -{formatCurrency(paySlip.deductionDetails.other)}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-3 pb-3 border-t border-b">
            <span className="text-gray-500">Kehadiran</span>
            <span className="text-right">
              {paySlip.attendanceRecord ? `${paySlip.attendanceRecord.presentDays}/${paySlip.attendanceRecord.totalDays} hari` : "-"}
              {paySlip.attendanceRecord?.lateDays ? `, Terlambat: ${paySlip.attendanceRecord.lateDays} hari` : ""}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 font-bold">
            <span>Total Gaji</span>
            <span className="text-right">{formatCurrency(paySlip.totalSalary)}</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Notes */}
      <div className="text-sm text-gray-500 italic">
        <p>Slip gaji ini dikeluarkan secara otomatis dan sah tanpa tanda tangan.</p>
        {paySlip.notes && <p className="mt-2">{paySlip.notes}</p>}
      </div>
    </div>
  );
};

export default InlinePaySlipDetail;

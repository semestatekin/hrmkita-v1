import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  getPayroll, 
  getPayrollSummary, 
  updatePayrollItem, 
  deletePayrollItem, 
  createPayrollItem,
  BulkPaymentResult 
} from "@/services/payrollService";
import { 
  getPaySlips, 
  updatePaySlip, 
  deletePaySlip, 
  issuePaySlip,
  markPaySlipAsPaid 
} from "@/services/paySlipService";
import { PayrollItem, PayrollSummary } from "@/types/payroll";
import { PaySlip } from "@/types/payslip";

export const usePayroll = () => {
  // Payroll state
  const [payrollData, setPayrollData] = useState<PayrollItem[]>([]);
  const [filteredPayroll, setFilteredPayroll] = useState<PayrollItem[]>([]);
  const [summary, setSummary] = useState<PayrollSummary>({
    totalAmount: "Rp 0",
    employeeCount: 0,
    averageSalary: "Rp 0",
    totalBonus: "Rp 0",
    totalDeductions: "Rp 0",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeletePayrollDialogOpen, setIsDeletePayrollDialogOpen] = useState(false);
  
  // Pay slip state
  const [paySlips, setPaySlips] = useState<PaySlip[]>([]);
  const [filteredPaySlips, setFilteredPaySlips] = useState<PaySlip[]>([]);
  const [paySlipSearchQuery, setPaySlipSearchQuery] = useState("");
  const [isDeletePaySlipDialogOpen, setIsDeletePaySlipDialogOpen] = useState(false);
  
  // Editing states
  const [currentPayrollItem, setCurrentPayrollItem] = useState<PayrollItem | null>(null);
  const [isAddingPayroll, setIsAddingPayroll] = useState(false);
  const [currentPaySlip, setCurrentPaySlip] = useState<PaySlip | null>(null);
  const [isAddingPaySlip, setIsAddingPaySlip] = useState(false);
  const [isViewingPaySlipDetail, setIsViewingPaySlipDetail] = useState(false);
  const [viewingPaySlip, setViewingPaySlip] = useState<PaySlip | null>(null);

  // Bulk payment states
  const [isBulkPaymentModalOpen, setIsBulkPaymentModalOpen] = useState(false);
  const [bulkPaymentResult, setBulkPaymentResult] = useState<BulkPaymentResult | null>(null);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadedPayroll = getPayroll();
    setPayrollData(loadedPayroll);
    setFilteredPayroll(loadedPayroll);
    
    const payrollSummary = getPayrollSummary();
    setSummary(payrollSummary);
    
    const loadedPaySlips = getPaySlips();
    setPaySlips(loadedPaySlips);
    setFilteredPaySlips(loadedPaySlips);
  };

  // Filter payroll when search changes
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = payrollData.filter(
        (item) => 
          item.employee.toLowerCase().includes(query) || 
          item.position.toLowerCase().includes(query)
      );
      setFilteredPayroll(filtered);
    } else {
      setFilteredPayroll(payrollData);
    }
  }, [searchQuery, payrollData]);

  // Filter pay slips when search changes
  useEffect(() => {
    if (paySlipSearchQuery) {
      const query = paySlipSearchQuery.toLowerCase();
      const filtered = paySlips.filter(
        (slip) => 
          slip.employeeName.toLowerCase().includes(query) || 
          slip.position.toLowerCase().includes(query)
      );
      setFilteredPaySlips(filtered);
    } else {
      setFilteredPaySlips(paySlips);
    }
  }, [paySlipSearchQuery, paySlips]);

  // Payroll handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreatePayroll = () => {
    setCurrentPayrollItem(null);
    setIsAddingPayroll(true);
  };

  const handleEditPayrollItem = (item: PayrollItem) => {
    setCurrentPayrollItem(item);
    setIsAddingPayroll(true);
  };

  const handleCancelPayrollEdit = () => {
    setCurrentPayrollItem(null);
    setIsAddingPayroll(false);
  };

  const handleDeletePayrollClick = (item: PayrollItem) => {
    setCurrentPayrollItem(item);
    setIsDeletePayrollDialogOpen(true);
  };

  const handleDeletePayrollConfirm = () => {
    if (currentPayrollItem) {
      deletePayrollItem(currentPayrollItem.id);
      loadData();
      setIsDeletePayrollDialogOpen(false);
      toast.success(`Data gaji ${currentPayrollItem.employee} telah dihapus.`);
    }
  };

  const handlePayrollSave = (data: PayrollItem) => {
    if (currentPayrollItem) {
      updatePayrollItem({
        ...data,
        id: currentPayrollItem.id
      });
      toast.success(`Data gaji ${data.employee} telah berhasil diperbarui.`);
    } else {
      createPayrollItem(data);
      toast.success(`Data gaji ${data.employee} telah berhasil ditambahkan.`);
    }
    
    loadData();
    setIsAddingPayroll(false);
    setCurrentPayrollItem(null);
  };

  // Pay slip handlers
  const handlePaySlipSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaySlipSearchQuery(e.target.value);
  };

  const handleCreatePaySlip = () => {
    setCurrentPaySlip(null);
    setIsAddingPaySlip(true);
  };

  const handleViewPaySlip = (slip: PaySlip) => {
    setViewingPaySlip(slip);
    setIsViewingPaySlipDetail(true);
  };

  const handleClosePaySlipDetail = () => {
    setViewingPaySlip(null);
    setIsViewingPaySlipDetail(false);
  };

  const handleEditPaySlip = (slip: PaySlip) => {
    setCurrentPaySlip(slip);
    setIsAddingPaySlip(true);
    if (isViewingPaySlipDetail) {
      setIsViewingPaySlipDetail(false);
    }
  };

  const handleCancelPaySlipEdit = () => {
    setCurrentPaySlip(null);
    setIsAddingPaySlip(false);
  };

  const handleDeletePaySlipClick = (slip: PaySlip) => {
    setCurrentPaySlip(slip);
    setIsDeletePaySlipDialogOpen(true);
  };

  const handleDeletePaySlipConfirm = () => {
    if (currentPaySlip) {
      deletePaySlip(currentPaySlip.id);
      loadData();
      setIsDeletePaySlipDialogOpen(false);
      toast.success(`Slip gaji untuk ${currentPaySlip.employeeName} telah dihapus.`);
    }
  };

  const handleIssuePaySlip = (slip: PaySlip) => {
    issuePaySlip(slip.id);
    loadData();
    toast.success(`Slip gaji untuk ${slip.employeeName} telah diterbitkan.`);
  };

  const handleMarkAsPaid = (slip: PaySlip) => {
    markPaySlipAsPaid(slip.id);
    loadData();
    toast.success(`Slip gaji untuk ${slip.employeeName} telah ditandai sebagai dibayar.`);
  };

  const handlePaySlipSave = (data: PaySlip) => {
    if (currentPaySlip) {
      updatePaySlip({
        ...data,
        id: currentPaySlip.id
      });
      toast.success(`Slip gaji untuk ${data.employeeName} telah berhasil diperbarui.`);
    } else {
      updatePaySlip(data);
      toast.success(`Slip gaji untuk ${data.employeeName} telah berhasil ditambahkan.`);
    }
    
    loadData();
    setIsAddingPaySlip(false);
    setCurrentPaySlip(null);
  };

  // Bulk payment handlers
  const handleOpenBulkPayment = () => {
    setIsBulkPaymentModalOpen(true);
  };

  const handleCloseBulkPayment = () => {
    setIsBulkPaymentModalOpen(false);
  };

  const handleProcessBulkPayment = (result: BulkPaymentResult) => {
    setBulkPaymentResult(result);
    setIsResultDialogOpen(true);
    loadData();
    toast.success(`Proses pembayaran gaji massal berhasil untuk ${result.successCount} karyawan.`);
  };

  const handleCloseResultDialog = () => {
    setIsResultDialogOpen(false);
    setBulkPaymentResult(null);
  };
  
  return {
    // State
    payrollData,
    filteredPayroll,
    summary,
    searchQuery,
    isDeletePayrollDialogOpen,
    setIsDeletePayrollDialogOpen,
    paySlips,
    filteredPaySlips,
    paySlipSearchQuery,
    isDeletePaySlipDialogOpen,
    setIsDeletePaySlipDialogOpen,
    currentPayrollItem,
    isAddingPayroll, 
    currentPaySlip,
    isAddingPaySlip,
    isViewingPaySlipDetail,
    viewingPaySlip,
    isBulkPaymentModalOpen,
    bulkPaymentResult,
    isResultDialogOpen,
    
    // Payroll handlers
    handleSearchChange,
    handleCreatePayroll,
    handleEditPayrollItem,
    handleCancelPayrollEdit,
    handleDeletePayrollClick,
    handleDeletePayrollConfirm,
    handlePayrollSave,
    
    // Pay slip handlers
    handlePaySlipSearchChange,
    handleCreatePaySlip,
    handleViewPaySlip,
    handleClosePaySlipDetail,
    handleEditPaySlip,
    handleCancelPaySlipEdit,
    handleDeletePaySlipClick,
    handleDeletePaySlipConfirm,
    handleIssuePaySlip,
    handleMarkAsPaid,
    handlePaySlipSave,
    
    // Bulk payment handlers
    handleOpenBulkPayment,
    handleCloseBulkPayment,
    handleProcessBulkPayment,
    handleCloseResultDialog
  };
};

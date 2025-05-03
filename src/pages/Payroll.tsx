
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Calendar } from "lucide-react";

// Custom hooks
import { usePayroll } from "@/hooks/usePayroll";

// Component imports
import PayrollSummary from "@/components/payroll/PayrollSummary";
import PayrollTable from "@/components/payroll/PayrollTable";
import PayrollSearch from "@/components/payroll/PayrollSearch";
import PaySlipTable from "@/components/payroll/PaySlipTable";
import PaySlipSearch from "@/components/payroll/PaySlipSearch";
import InlinePayrollForm from "@/components/payroll/InlinePayrollForm";
import InlinePaySlipForm from "@/components/payroll/InlinePaySlipForm";
import InlinePaySlipDetail from "@/components/payroll/InlinePaySlipDetail";
import BulkPaymentModal from "@/components/payroll/BulkPaymentModal";
import PaymentResultDialog from "@/components/payroll/PaymentResultDialog";

// Service imports
import { processBulkPayment, BulkPaymentOptions } from "@/services/payrollService";

const Payroll: React.FC = () => {
  const [activeTab, setActiveTab] = useState("payroll");
  
  const {
    // State
    summary,
    filteredPayroll,
    searchQuery,
    isDeletePayrollDialogOpen,
    filteredPaySlips,
    paySlipSearchQuery,
    isDeletePaySlipDialogOpen,
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
    handleCloseResultDialog,
  } = usePayroll();

  const handleProcessBulkPayment = (data: BulkPaymentOptions) => {
    // Process the bulk payment
    const result = processBulkPayment(data);
    
    // Close the bulk payment modal
    handleCloseBulkPayment();
    
    // Handle the result
    handleProcessBulkPayment(result);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Penggajian</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Mei 2023
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="payroll"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="payroll">Data Penggajian</TabsTrigger>
          <TabsTrigger value="slips">Slip Gaji</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payroll" className="space-y-6">
          {/* Summary Cards */}
          <PayrollSummary summary={summary} />

          {/* Search and filters */}
          <PayrollSearch 
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onAddPayroll={handleCreatePayroll}
            onBulkPayment={handleOpenBulkPayment}
          />

          {/* Inline form for adding/editing payroll */}
          {isAddingPayroll && (
            <div className="mb-6">
              <InlinePayrollForm 
                initialData={currentPayrollItem} 
                onSave={handlePayrollSave} 
                onCancel={handleCancelPayrollEdit} 
              />
            </div>
          )}

          {/* Payroll table */}
          <PayrollTable 
            payrollItems={filteredPayroll}
            onEditItem={handleEditPayrollItem}
            onDeleteItem={handleDeletePayrollClick}
          />
        </TabsContent>

        <TabsContent value="slips" className="space-y-6">
          {/* Pay slip search and filters */}
          <PaySlipSearch 
            searchQuery={paySlipSearchQuery}
            onSearchChange={handlePaySlipSearchChange}
            onAddPaySlip={handleCreatePaySlip}
            onBulkPayment={handleOpenBulkPayment}
          />

          {/* Inline form for adding/editing pay slips */}
          {isAddingPaySlip && (
            <div className="mb-6">
              <InlinePaySlipForm 
                initialData={currentPaySlip} 
                onSave={handlePaySlipSave} 
                onCancel={handleCancelPaySlipEdit} 
              />
            </div>
          )}

          {/* Inline pay slip detail view */}
          {isViewingPaySlipDetail && viewingPaySlip && (
            <div className="mb-6">
              <InlinePaySlipDetail 
                paySlip={viewingPaySlip} 
                onClose={handleClosePaySlipDetail}
                onEdit={handleEditPaySlip}
              />
            </div>
          )}

          {/* Pay slip table */}
          <PaySlipTable 
            paySlips={filteredPaySlips}
            onViewPaySlip={handleViewPaySlip}
            onEditPaySlip={handleEditPaySlip}
            onDeletePaySlip={handleDeletePaySlipClick}
            onIssuePaySlip={handleIssuePaySlip}
            onMarkAsPaid={handleMarkAsPaid}
          />
        </TabsContent>
      </Tabs>

      {/* Delete Payroll Confirmation Dialog */}
      <AlertDialog open={isDeletePayrollDialogOpen} onOpenChange={setIsDeletePayrollDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data gaji {currentPayrollItem?.employee}? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePayrollConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Pay Slip Confirmation Dialog */}
      <AlertDialog open={isDeletePaySlipDialogOpen} onOpenChange={setIsDeletePaySlipDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus slip gaji untuk {currentPaySlip?.employeeName}? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePaySlipConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Payment Modal */}
      <BulkPaymentModal
        isOpen={isBulkPaymentModalOpen}
        onClose={handleCloseBulkPayment}
        onProcess={handleProcessBulkPayment}
      />

      {/* Bulk Payment Result Dialog */}
      <PaymentResultDialog 
        isOpen={isResultDialogOpen}
        onClose={handleCloseResultDialog}
        result={bulkPaymentResult}
      />
    </div>
  );
};

export default Payroll;

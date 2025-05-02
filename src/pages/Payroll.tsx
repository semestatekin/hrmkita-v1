
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Calendar, 
  FileText, 
  Download, 
  Filter, 
  Search, 
  MoreHorizontal, 
  Plus, 
  Save, 
  Trash2 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PayrollItem, PayrollSummary } from "@/types/payroll";
import { 
  getPayroll, 
  getPayrollSummary, 
  createPayrollItem, 
  updatePayrollItem, 
  deletePayrollItem 
} from "@/services/payrollService";
import { 
  getPaySlips, 
  createPaySlip, 
  updatePaySlip, 
  deletePaySlip,
  issuePaySlip,
  markPaySlipAsPaid 
} from "@/services/paySlipService";
import { PaySlip, paySlipStatusColors, paySlipStatusLabels } from "@/types/payslip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PayrollForm from "@/components/payroll/PayrollForm";
import PaySlipForm from "@/components/payroll/PaySlipForm";
import PaySlipDetail from "@/components/payroll/PaySlipDetail";

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

const Payroll: React.FC = () => {
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
  const [isPayrollDialogOpen, setIsPayrollDialogOpen] = useState(false);
  const [currentPayrollItem, setCurrentPayrollItem] = useState<PayrollItem | null>(null);
  const [isDeletePayrollDialogOpen, setIsDeletePayrollDialogOpen] = useState(false);
  
  // Pay slip state
  const [paySlips, setPaySlips] = useState<PaySlip[]>([]);
  const [filteredPaySlips, setFilteredPaySlips] = useState<PaySlip[]>([]);
  const [paySlipSearchQuery, setPaySlipSearchQuery] = useState("");
  const [isPaySlipDialogOpen, setIsPaySlipDialogOpen] = useState(false);
  const [isPaySlipDetailOpen, setIsPaySlipDetailOpen] = useState(false);
  const [currentPaySlip, setCurrentPaySlip] = useState<PaySlip | null>(null);
  const [isDeletePaySlipDialogOpen, setIsDeletePaySlipDialogOpen] = useState(false);
  
  const { toast } = useToast();

  // Active tab state
  const [activeTab, setActiveTab] = useState("payroll");

  // Load payroll data
  useEffect(() => {
    const loadedPayroll = getPayroll();
    setPayrollData(loadedPayroll);
    setFilteredPayroll(loadedPayroll);
    
    const payrollSummary = getPayrollSummary();
    setSummary(payrollSummary);
    
    const loadedPaySlips = getPaySlips();
    setPaySlips(loadedPaySlips);
    setFilteredPaySlips(loadedPaySlips);
  }, []);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePaySlipSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaySlipSearchQuery(e.target.value);
  };

  const handleCreatePayroll = () => {
    setCurrentPayrollItem(null);
    setIsPayrollDialogOpen(true);
  };

  const handleEditPayrollItem = (item: PayrollItem) => {
    setCurrentPayrollItem(item);
    setIsPayrollDialogOpen(true);
  };

  const handleDeletePayrollClick = (item: PayrollItem) => {
    setCurrentPayrollItem(item);
    setIsDeletePayrollDialogOpen(true);
  };

  const handleDeletePayrollConfirm = () => {
    if (currentPayrollItem) {
      deletePayrollItem(currentPayrollItem.id);
      
      // Refresh data
      const updatedPayroll = getPayroll();
      setPayrollData(updatedPayroll);
      
      // Update summary
      const updatedSummary = getPayrollSummary();
      setSummary(updatedSummary);
      
      setIsDeletePayrollDialogOpen(false);
      
      toast({
        title: "Item penggajian dihapus",
        description: `Data gaji ${currentPayrollItem.employee} telah dihapus.`,
      });
    }
  };

  const handleCreatePaySlip = () => {
    setCurrentPaySlip(null);
    setIsPaySlipDialogOpen(true);
  };

  const handleViewPaySlip = (slip: PaySlip) => {
    setCurrentPaySlip(slip);
    setIsPaySlipDetailOpen(true);
  };

  const handleEditPaySlip = (slip: PaySlip) => {
    setCurrentPaySlip(slip);
    setIsPaySlipDialogOpen(true);
  };

  const handleDeletePaySlipClick = (slip: PaySlip) => {
    setCurrentPaySlip(slip);
    setIsDeletePaySlipDialogOpen(true);
  };

  const handleDeletePaySlipConfirm = () => {
    if (currentPaySlip) {
      deletePaySlip(currentPaySlip.id);
      
      // Refresh data
      const updatedPaySlips = getPaySlips();
      setPaySlips(updatedPaySlips);
      
      setIsDeletePaySlipDialogOpen(false);
      
      toast({
        title: "Slip gaji dihapus",
        description: `Slip gaji untuk ${currentPaySlip.employeeName} telah dihapus.`,
      });
    }
  };

  const handleIssuePaySlip = (slip: PaySlip) => {
    issuePaySlip(slip.id);
    
    // Refresh data
    const updatedPaySlips = getPaySlips();
    setPaySlips(updatedPaySlips);
    
    toast({
      title: "Slip gaji diterbitkan",
      description: `Slip gaji untuk ${slip.employeeName} telah diterbitkan.`,
    });
  };

  const handleMarkAsPaid = (slip: PaySlip) => {
    markPaySlipAsPaid(slip.id);
    
    // Refresh data
    const updatedPaySlips = getPaySlips();
    setPaySlips(updatedPaySlips);
    
    toast({
      title: "Status slip gaji diubah",
      description: `Slip gaji untuk ${slip.employeeName} telah ditandai sebagai dibayar.`,
    });
  };

  const handlePayrollSave = (data: PayrollItem) => {
    if (currentPayrollItem) {
      // Update existing payroll item
      updatePayrollItem({
        ...data,
        id: currentPayrollItem.id
      });
      toast({
        title: "Data gaji diperbarui",
        description: `Data gaji ${data.employee} telah berhasil diperbarui.`,
      });
    } else {
      // Create new payroll item
      createPayrollItem(data);
      toast({
        title: "Data gaji ditambahkan",
        description: `Data gaji ${data.employee} telah berhasil ditambahkan.`,
      });
    }
    
    // Refresh data
    const updatedPayroll = getPayroll();
    setPayrollData(updatedPayroll);
    
    // Update summary
    const updatedSummary = getPayrollSummary();
    setSummary(updatedSummary);
    
    setIsPayrollDialogOpen(false);
  };

  const handlePaySlipSave = (data: PaySlip) => {
    if (currentPaySlip) {
      // Update existing pay slip
      updatePaySlip({
        ...data,
        id: currentPaySlip.id
      });
      toast({
        title: "Slip gaji diperbarui",
        description: `Slip gaji untuk ${data.employeeName} telah berhasil diperbarui.`,
      });
    } else {
      // Create new pay slip
      createPaySlip(data);
      toast({
        title: "Slip gaji ditambahkan",
        description: `Slip gaji untuk ${data.employeeName} telah berhasil ditambahkan.`,
      });
    }
    
    // Refresh data
    const updatedPaySlips = getPaySlips();
    setPaySlips(updatedPaySlips);
    
    setIsPaySlipDialogOpen(false);
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="card-dashboard">
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-sm font-medium">Total Penggajian</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <span className="text-2xl font-bold">{summary.totalAmount}</span>
                <p className="text-xs text-muted-foreground">{summary.employeeCount} karyawan</p>
              </CardContent>
            </Card>
            
            <Card className="card-dashboard">
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata Gaji</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <span className="text-2xl font-bold">{summary.averageSalary}</span>
              </CardContent>
            </Card>
            
            <Card className="card-dashboard">
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-sm font-medium">Total Bonus</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <span className="text-2xl font-bold">{summary.totalBonus}</span>
              </CardContent>
            </Card>
            
            <Card className="card-dashboard">
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-sm font-medium">Total Potongan</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <span className="text-2xl font-bold">{summary.totalDeductions}</span>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[250px] flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Cari karyawan..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <Button onClick={handleCreatePayroll}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Penggajian
            </Button>
          </div>

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
                {filteredPayroll.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                      Tidak ada data penggajian
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayroll.map((item) => (
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
                            <DropdownMenuItem onClick={() => handleEditPayrollItem(item)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeletePayrollClick(item)}>
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
        </TabsContent>

        <TabsContent value="slips" className="space-y-6">
          <div className="flex justify-between flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[250px] flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Cari karyawan..." 
                  className="pl-9" 
                  value={paySlipSearchQuery}
                  onChange={handlePaySlipSearchChange}
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
            <Button onClick={handleCreatePaySlip}>
              <Plus className="mr-2 h-4 w-4" />
              Buat Slip Gaji
            </Button>
          </div>

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
                {filteredPaySlips.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                      Tidak ada slip gaji
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPaySlips.map((slip) => (
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
                            <DropdownMenuItem onClick={() => handleViewPaySlip(slip)}>
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditPaySlip(slip)}>
                              Edit
                            </DropdownMenuItem>
                            {slip.status === "draft" && (
                              <DropdownMenuItem onClick={() => handleIssuePaySlip(slip)}>
                                Terbitkan
                              </DropdownMenuItem>
                            )}
                            {slip.status === "issued" && (
                              <DropdownMenuItem onClick={() => handleMarkAsPaid(slip)}>
                                Tandai Dibayar
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Unduh PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-500" 
                              onClick={() => handleDeletePaySlipClick(slip)}
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
        </TabsContent>
      </Tabs>

      {/* Payroll Form Dialog */}
      <Dialog open={isPayrollDialogOpen} onOpenChange={setIsPayrollDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentPayrollItem ? "Edit Data Gaji" : "Tambah Data Gaji"}
            </DialogTitle>
          </DialogHeader>
          <PayrollForm 
            initialData={currentPayrollItem} 
            onSave={handlePayrollSave} 
            onCancel={() => setIsPayrollDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Pay Slip Form Dialog */}
      <Dialog open={isPaySlipDialogOpen} onOpenChange={setIsPaySlipDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentPaySlip ? "Edit Slip Gaji" : "Buat Slip Gaji"}
            </DialogTitle>
          </DialogHeader>
          <PaySlipForm 
            initialData={currentPaySlip} 
            onSave={handlePaySlipSave} 
            onCancel={() => setIsPaySlipDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Pay Slip Detail Dialog */}
      <Dialog open={isPaySlipDetailOpen} onOpenChange={setIsPaySlipDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Slip Gaji</DialogTitle>
          </DialogHeader>
          {currentPaySlip && <PaySlipDetail paySlip={currentPaySlip} />}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaySlipDetailOpen(false)}>
              Tutup
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Unduh PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Payroll Confirmation Dialog */}
      <Dialog open={isDeletePayrollDialogOpen} onOpenChange={setIsDeletePayrollDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Apakah Anda yakin ingin menghapus data gaji {currentPayrollItem?.employee}? Tindakan ini tidak dapat dibatalkan.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeletePayrollDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeletePayrollConfirm}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Pay Slip Confirmation Dialog */}
      <Dialog open={isDeletePaySlipDialogOpen} onOpenChange={setIsDeletePaySlipDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Apakah Anda yakin ingin menghapus slip gaji untuk {currentPaySlip?.employeeName}? Tindakan ini tidak dapat dibatalkan.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeletePaySlipDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeletePaySlipConfirm}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payroll;

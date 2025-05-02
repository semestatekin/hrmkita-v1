
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar, FileText, Download, Filter, Search, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PayrollItem, PayrollSummary } from "@/types/payroll";
import { getPayroll, getPayrollSummary, createPayrollItem, updatePayrollItem, deletePayrollItem } from "@/services/payrollService";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPayrollItem, setCurrentPayrollItem] = useState<PayrollItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load payroll data
  useEffect(() => {
    const loadedPayroll = getPayroll();
    setPayrollData(loadedPayroll);
    setFilteredPayroll(loadedPayroll);
    
    const payrollSummary = getPayrollSummary();
    setSummary(payrollSummary);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreatePayroll = () => {
    setCurrentPayrollItem(null);
    setIsDialogOpen(true);
  };

  const handleEditPayrollItem = (item: PayrollItem) => {
    setCurrentPayrollItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (item: PayrollItem) => {
    setCurrentPayrollItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentPayrollItem) {
      deletePayrollItem(currentPayrollItem.id);
      
      // Refresh data
      const updatedPayroll = getPayroll();
      setPayrollData(updatedPayroll);
      
      // Update summary
      const updatedSummary = getPayrollSummary();
      setSummary(updatedSummary);
      
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "Item penggajian dihapus",
        description: `Data gaji ${currentPayrollItem.employee} telah dihapus.`,
      });
    }
  };

  // This would be expanded in a real implementation
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling would go here in a real implementation
    setIsDialogOpen(false);
    
    // For demonstration, we'll just show a toast
    toast({
      title: currentPayrollItem ? "Data gaji diperbarui" : "Data gaji ditambahkan",
      description: "Data penggajian telah berhasil disimpan.",
    });
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
          <Button onClick={handleCreatePayroll}>
            <FileText className="mr-2 h-4 w-4" />
            Buat Penggajian
          </Button>
        </div>
      </div>

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

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Cari karyawan..." 
              className="pl-9" 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="table-container">
        <table className="table-hrm">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Karyawan</th>
              <th className="table-header-cell">Gaji Pokok</th>
              <th className="table-header-cell">Bonus</th>
              <th className="table-header-cell">Potongan</th>
              <th className="table-header-cell">Total Gaji</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Aksi</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredPayroll.map((item) => (
              <tr key={item.id} className="table-row">
                <td className="table-data">
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
                </td>
                <td className="table-data">{item.salary}</td>
                <td className="table-data">{item.bonus}</td>
                <td className="table-data">{item.deductions}</td>
                <td className="table-data font-bold">{item.total}</td>
                <td className="table-data">
                  <Badge
                    className={`${statusColors[item.status]} text-white font-normal`}
                  >
                    {statusLabels[item.status]}
                  </Badge>
                </td>
                <td className="table-data">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Unduh Slip
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditPayrollItem(item)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(item)}>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Payroll Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentPayrollItem ? "Edit Data Gaji" : "Tambah Data Gaji"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              {/* Form fields would go here */}
              <p className="text-sm text-gray-500">
                Form input untuk {currentPayrollItem ? "mengedit" : "menambahkan"} data gaji akan ditampilkan di sini.
              </p>
            </div>
            <DialogFooter>
              <Button type="submit">
                {currentPayrollItem ? "Simpan Perubahan" : "Tambah Data"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Apakah Anda yakin ingin menghapus data gaji {currentPayrollItem?.employee}? Tindakan ini tidak dapat dibatalkan.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payroll;

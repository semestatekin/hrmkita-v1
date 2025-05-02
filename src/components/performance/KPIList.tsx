
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { KPI, statusColors, statusLabels } from '@/types/performance';
import { getKPIs, deleteKPI } from '@/services/performanceService';
import { toast } from '@/components/ui/sonner';

const KPIList: React.FC = () => {
  const [kpis, setKpis] = useState<KPI[]>(getKPIs());
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus KPI ini?')) {
      deleteKPI(id);
      setKpis(getKPIs());
      toast.success('KPI berhasil dihapus');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredKPIs = kpis.filter(kpi => 
    kpi.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    kpi.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === 'Rupiah') {
      return formatCurrency(value);
    } else if (unit === '%') {
      return `${value}%`;
    } else {
      return `${value} ${unit}`;
    }
  };

  const getProgressPercent = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Indikator Kinerja Utama (KPI)</CardTitle>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah KPI
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Cari KPI..." 
              className="pl-9" 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul KPI</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Pencapaian</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKPIs.length > 0 ? (
                filteredKPIs.map((kpi) => (
                  <TableRow key={kpi.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-medium">{kpi.title}</div>
                        <div className="text-sm text-gray-500">{kpi.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatValue(kpi.targetValue, kpi.unit)}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{formatValue(kpi.currentValue, kpi.unit)}</span>
                          <span>{getProgressPercent(kpi.currentValue, kpi.targetValue)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${getProgressPercent(kpi.currentValue, kpi.targetValue)}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[kpi.status]} text-white`}>
                        {statusLabels[kpi.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formatDate(kpi.startDate)} - {formatDate(kpi.endDate)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDelete(kpi.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    {searchTerm ? 'Tidak ada KPI yang sesuai dengan pencarian' : 'Belum ada data KPI'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPIList;

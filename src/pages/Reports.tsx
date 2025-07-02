
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BarChart3, Users, Calendar } from 'lucide-react';

const Reports = () => {
  const reportCategories = [
    {
      title: 'Laporan Karyawan',
      description: 'Data dan statistik karyawan',
      icon: Users,
      reports: ['Daftar Karyawan', 'Kinerja Karyawan', 'Absensi Karyawan']
    },
    {
      title: 'Laporan Keuangan',
      description: 'Laporan penggajian dan keuangan',
      icon: BarChart3,
      reports: ['Slip Gaji', 'Total Penggajian', 'Potongan dan Tunjangan']
    },
    {
      title: 'Laporan Kehadiran',
      description: 'Statistik kehadiran dan absensi',
      icon: Calendar,
      reports: ['Rekap Kehadiran', 'Keterlambatan', 'Cuti dan Izin']
    },
    {
      title: 'Laporan Proyek',
      description: 'Progress dan status proyek',
      icon: FileText,
      reports: ['Status Proyek', 'Timeline Proyek', 'Alokasi Sumber Daya']
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Laporan</h1>
        <p className="text-muted-foreground">
          Kelola dan unduh berbagai laporan sistem HRM
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reportCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-6 w-6 text-hrm-primary" />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.reports.map((report, reportIndex) => (
                    <div
                      key={reportIndex}
                      className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <span className="text-sm">{report}</span>
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Reports;

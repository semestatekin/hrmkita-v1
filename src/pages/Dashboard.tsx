
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, ChartBar, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Jan",
    proyek: 4,
    tugas: 24,
  },
  {
    name: "Feb",
    proyek: 3,
    tugas: 13,
  },
  {
    name: "Mar",
    proyek: 2,
    tugas: 18,
  },
  {
    name: "Apr",
    proyek: 2,
    tugas: 28,
  },
  {
    name: "Mei",
    proyek: 1,
    tugas: 30,
  },
  {
    name: "Jun",
    proyek: 5,
    tugas: 41,
  },
];

const activityData = [
  {
    user: "Budi Santoso",
    time: "08:30",
    activity: "Menyelesaikan tugas 'Desain Homepage'",
  },
  {
    user: "Ani Wijaya",
    time: "09:15",
    activity: "Menandai kehadiran",
  },
  {
    user: "Rudi Hartono",
    time: "10:00",
    activity: "Membuat proyek baru 'Website E-commerce'",
  },
  {
    user: "Dewi Sartika",
    time: "11:30",
    activity: "Mengirim laporan kinerja",
  },
  {
    user: "Joko Widodo",
    time: "13:00",
    activity: "Memperbarui status tugas",
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Selamat Datang di Sistem HRM</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Total Karyawan</CardTitle>
            <Users className="h-5 w-5 text-hrm-primary" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-2xl font-bold">42</span>
            <p className="text-xs text-muted-foreground">+2 bulan ini</p>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Proyek Aktif</CardTitle>
            <Briefcase className="h-5 w-5 text-hrm-secondary" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-2xl font-bold">7</span>
            <p className="text-xs text-muted-foreground">5 perlu perhatian</p>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Tugas Menunggu</CardTitle>
            <Clock className="h-5 w-5 text-hrm-warning" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-2xl font-bold">18</span>
            <p className="text-xs text-muted-foreground">3 mendekati tenggat</p>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Kinerja Rata-Rata</CardTitle>
            <ChartBar className="h-5 w-5 text-hrm-success" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-2xl font-bold">85%</span>
            <p className="text-xs text-muted-foreground">+2% dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle>Aktivitas Proyek dan Tugas</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="proyek" fill="#4F46E5" name="Proyek" />
                <Bar dataKey="tugas" fill="#9b87f5" name="Tugas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activityData.map((activity, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="bg-hrm-primary/10 h-10 w-10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-hrm-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">Hari ini - {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, Filter } from "lucide-react";

// Sample attendance data
const attendance = [
  {
    id: 1,
    employee: "Budi Santoso",
    date: "12 Juni 2023",
    checkIn: "08:05",
    checkOut: "17:15",
    status: "present",
    workHours: "9:10",
  },
  {
    id: 2,
    employee: "Siti Nurhayati",
    date: "12 Juni 2023",
    checkIn: "07:55",
    checkOut: "17:00",
    status: "present",
    workHours: "9:05",
  },
  {
    id: 3,
    employee: "Andi Wijaya",
    date: "12 Juni 2023",
    checkIn: "08:20",
    checkOut: "17:30",
    status: "late",
    workHours: "9:10",
  },
  {
    id: 4,
    employee: "Dewi Sartika",
    date: "12 Juni 2023",
    checkIn: "-",
    checkOut: "-",
    status: "absent",
    workHours: "0:00",
  },
  {
    id: 5,
    employee: "Rudi Hartono",
    date: "12 Juni 2023",
    checkIn: "08:00",
    checkOut: "16:30",
    status: "present",
    workHours: "8:30",
  },
  {
    id: 6,
    employee: "Maya Indah",
    date: "12 Juni 2023",
    checkIn: "08:45",
    checkOut: "17:15",
    status: "late",
    workHours: "8:30",
  },
];

const statusColors: Record<string, string> = {
  present: "bg-green-500",
  late: "bg-yellow-500",
  absent: "bg-red-500",
  "half-day": "bg-blue-500",
};

const statusLabels: Record<string, string> = {
  present: "Hadir",
  late: "Terlambat",
  absent: "Absen",
  "half-day": "Setengah Hari",
};

const Attendance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Kehadiran</h2>
        <Button>
          <Calendar className="mr-2 h-4 w-4" /> Pilih Tanggal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Total Karyawan</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-2xl font-bold">42</span>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Hadir</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-2xl font-bold">36</span>
            <p className="text-xs text-muted-foreground">85.7%</p>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Terlambat</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-2xl font-bold">4</span>
            <p className="text-xs text-muted-foreground">9.5%</p>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Absen</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-2xl font-bold">2</span>
            <p className="text-xs text-muted-foreground">4.8%</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Cari karyawan..." className="pl-9" />
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
              <th className="table-header-cell">Tanggal</th>
              <th className="table-header-cell">Jam Masuk</th>
              <th className="table-header-cell">Jam Keluar</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Jam Kerja</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {attendance.map((item) => (
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
                    </div>
                  </div>
                </td>
                <td className="table-data">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{item.date}</span>
                  </div>
                </td>
                <td className="table-data">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{item.checkIn}</span>
                  </div>
                </td>
                <td className="table-data">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{item.checkOut}</span>
                  </div>
                </td>
                <td className="table-data">
                  <Badge
                    className={`${statusColors[item.status]} text-white font-normal`}
                  >
                    {statusLabels[item.status]}
                  </Badge>
                </td>
                <td className="table-data">{item.workHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Calendar, 
  Receipt, 
  TrendingUp, 
  User, 
  MapPin,
  CheckCircle,
  XCircle,
  ChevronRight
} from "lucide-react";
import { useEmployeeAuth } from "@/contexts/EmployeeAuthContext";
import { getEmployees } from "@/services/employeeService";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'late' | 'absent';
}

interface SalaryRecord {
  month: string;
  amount: string;
  status: 'paid' | 'pending';
}

const SelfService: React.FC = () => {
  const { employee, getEmployeeData } = useEmployeeAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'attendance' | 'salary' | 'performance' | 'profile'>('dashboard');

  // Get employee data
  const employeeData = getEmployeeData();
  
  if (!employeeData) {
    return <div>Loading...</div>;
  }
  
  const attendanceHistory: AttendanceRecord[] = [
    { date: '2024-01-23', checkIn: '08:00', checkOut: '17:00', status: 'present' },
    { date: '2024-01-22', checkIn: '08:15', checkOut: '17:00', status: 'late' },
    { date: '2024-01-21', checkIn: '08:00', checkOut: '17:00', status: 'present' },
    { date: '2024-01-20', checkIn: '08:00', checkOut: '17:00', status: 'present' },
    { date: '2024-01-19', checkIn: '', checkOut: '', status: 'absent' },
  ];

  const salaryHistory: SalaryRecord[] = [
    { month: 'Januari 2024', amount: 'Rp 15.000.000', status: 'paid' },
    { month: 'Desember 2023', amount: 'Rp 15.000.000', status: 'paid' },
    { month: 'November 2023', amount: 'Rp 14.500.000', status: 'paid' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check if already checked in today (mock logic)
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayRecord = attendanceHistory.find(record => record.date === today);
    if (todayRecord && todayRecord.checkIn) {
      setIsCheckedIn(true);
      setCheckInTime(todayRecord.checkIn);
    }
  }, []);

  const handleCheckIn = () => {
    const time = format(new Date(), 'HH:mm');
    setIsCheckedIn(true);
    setCheckInTime(time);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setCheckInTime(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-500';
      case 'late': return 'bg-yellow-500';
      case 'absent': return 'bg-red-500';
      case 'paid': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present': return 'Hadir';
      case 'late': return 'Terlambat';
      case 'absent': return 'Tidak Hadir';
      case 'paid': return 'Dibayar';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  const TabButton = ({ id, icon: Icon, label, active }: { 
    id: typeof activeTab, 
    icon: React.ElementType, 
    label: string, 
    active: boolean 
  }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
        active 
          ? 'bg-blue-500 text-white shadow-lg' 
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="h-5 w-5 mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  const renderDashboard = () => (
    <div className="space-y-4">
      {/* Time Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="text-center">
          <div className="text-3xl font-bold">
            {format(currentTime, 'HH:mm:ss')}
          </div>
          <div className="text-sm opacity-90">
            {format(currentTime, 'EEEE, dd MMMM yyyy', { locale: id })}
          </div>
          <div className="flex items-center justify-center mt-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">Jakarta Office</span>
          </div>
        </div>
      </Card>

      {/* Check In/Out */}
      <Card className="p-6">
        <div className="text-center space-y-4">
          {!isCheckedIn ? (
            <Button
              onClick={handleCheckIn}
              className="w-24 h-24 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
            >
              <div className="flex flex-col items-center">
                <CheckCircle className="h-8 w-8 mb-1" />
                <span className="text-xs">Check In</span>
              </div>
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                Check In: <span className="font-semibold text-green-600">{checkInTime}</span>
              </div>
              <Button
                onClick={handleCheckOut}
                className="w-24 h-24 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
              >
                <div className="flex flex-col items-center">
                  <XCircle className="h-8 w-8 mb-1" />
                  <span className="text-xs">Check Out</span>
                </div>
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 text-center">
          <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-500" />
          <div className="text-lg font-bold">22</div>
          <div className="text-xs text-gray-600">Hari Kerja</div>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="h-6 w-6 mx-auto mb-2 text-green-500" />
          <div className="text-lg font-bold">176</div>
          <div className="text-xs text-gray-600">Jam Kerja</div>
        </Card>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mb-4">Riwayat Presensi</h3>
      {attendanceHistory.map((record, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{format(new Date(record.date), 'dd MMM yyyy', { locale: id })}</div>
              <div className="text-sm text-gray-600">
                {record.checkIn && record.checkOut 
                  ? `${record.checkIn} - ${record.checkOut}`
                  : record.checkIn || 'Tidak Hadir'
                }
              </div>
            </div>
            <Badge className={`${getStatusColor(record.status)} text-white`}>
              {getStatusLabel(record.status)}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSalary = () => (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mb-4">Riwayat Gaji</h3>
      {salaryHistory.map((record, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{record.month}</div>
              <div className="text-lg font-bold text-green-600">{record.amount}</div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={`${getStatusColor(record.status)} text-white`}>
                {getStatusLabel(record.status)}
              </Badge>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Performa Pekerjaan</h3>
      
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">KPI Target</span>
          <span className="text-sm text-gray-600">85%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">Proyek Selesai</span>
          <span className="text-2xl font-bold text-green-600">12</span>
        </div>
        <div className="text-sm text-gray-600">Target: 15 proyek tahun ini</div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">Rating Performa</span>
          <div className="flex space-x-1">
            {[1,2,3,4,5].map((star) => (
              <div key={star} className={`w-4 h-4 rounded-full ${star <= 4 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-600">4.0 dari 5.0</div>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Profil Saya</h3>
      
      <Card className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={employeeData.avatar} />
            <AvatarFallback className="text-2xl">
              {employeeData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-xl font-bold">{employeeData.name}</h4>
            <p className="text-gray-600">{employeeData.position}</p>
            <p className="text-sm text-gray-500">{employeeData.department}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Email</span>
          <span className="font-medium">{employeeData.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Telepon</span>
          <span className="font-medium">{employeeData.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Bergabung</span>
          <span className="font-medium">{format(new Date(employeeData.joinDate), 'dd MMM yyyy', { locale: id })}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status</span>
          <Badge className={`${getStatusColor(employeeData.status)} text-white`}>
            {employeeData.status === 'active' ? 'Aktif' : employeeData.status === 'inactive' ? 'Tidak Aktif' : 'Cuti'}
          </Badge>
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'attendance': return renderAttendance();
      case 'salary': return renderSalary();
      case 'performance': return renderPerformance();
      case 'profile': return renderProfile();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Self Service</h1>
            <p className="text-sm text-gray-600">Selamat datang, {employeeData.name}</p>
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage src={employeeData.avatar} />
            <AvatarFallback>
              {employeeData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
        <div className="grid grid-cols-5 gap-2">
          <TabButton id="dashboard" icon={Clock} label="Dashboard" active={activeTab === 'dashboard'} />
          <TabButton id="attendance" icon={Calendar} label="Presensi" active={activeTab === 'attendance'} />
          <TabButton id="salary" icon={Receipt} label="Gaji" active={activeTab === 'salary'} />
          <TabButton id="performance" icon={TrendingUp} label="Performa" active={activeTab === 'performance'} />
          <TabButton id="profile" icon={User} label="Profil" active={activeTab === 'profile'} />
        </div>
      </div>
    </div>
  );
};

export default SelfService;
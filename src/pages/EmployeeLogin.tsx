import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserCircle, Eye, EyeOff, Smartphone } from "lucide-react";
import { getEmployees } from "@/services/employeeService";
import { setLocalData } from "@/utils/localStorage";
import { useToast } from "@/hooks/use-toast";

const EmployeeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Get employees from local storage
      const employees = getEmployees();
      
      // Find employee by email
      const employee = employees.find(emp => 
        emp.email.toLowerCase() === email.toLowerCase() && 
        emp.status === 'active'
      );

      if (!employee) {
        setError("Email tidak ditemukan atau akun tidak aktif");
        setIsLoading(false);
        return;
      }

      // For prototype: simple password validation (password = employee ID)
      // In production, this would be proper password hash validation
      const isValidPassword = password === employee.id.toString() || 
                            password === "password" || 
                            password === "123456";

      if (!isValidPassword) {
        setError("Password salah");
        setIsLoading(false);
        return;
      }

      // Store employee session
      const employeeSession = {
        id: employee.id,
        email: employee.email,
        name: employee.name,
        position: employee.position,
        department: employee.department,
        role: 'employee',
        loginTime: new Date().toISOString()
      };

      setLocalData("hrm_employee_session", employeeSession);

      toast({
        title: "Login Berhasil",
        description: `Selamat datang, ${employee.name}!`,
      });

      // Redirect to self-service portal
      navigate("/self-service");

    } catch (error) {
      setError("Terjadi kesalahan saat login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const employees = getEmployees();
    if (employees.length > 0) {
      const demoEmployee = employees[0]; // Use first employee for demo
      setEmail(demoEmployee.email);
      setPassword("password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-blue-500 p-3 rounded-full">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Self Service Portal</h1>
          <p className="text-gray-600">Akses untuk Karyawan</p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Masuk ke Akun Anda</CardTitle>
            <CardDescription className="text-center">
              Gunakan email perusahaan untuk mengakses portal
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Perusahaan</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@haisemesta.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-500 hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            {/* Demo Login */}
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleDemoLogin}
                className="w-full h-10"
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Coba Demo Login
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Password demo: password, 123456, atau ID karyawan
              </p>
            </div>

            {/* Admin Access */}
            <div className="text-center pt-2">
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Akses Admin? Klik di sini
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-sm text-gray-500">
          <p>Butuh bantuan? Hubungi IT Support</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
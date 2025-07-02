
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { ThemeProvider } from "next-themes";

// Import all pages
import Login from "./pages/Login";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";
import Roles from "./pages/Roles";
import Tasks from "./pages/Tasks";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import Departments from "./pages/Departments";
import Designations from "./pages/Designations";
import Performance from "./pages/Performance";
import JobPortal from "./pages/JobPortal";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={
                <PrivateRoute>
                  <Layout>
                    <Index />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/projects" element={
                <PrivateRoute>
                  <Layout>
                    <Projects />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/employees" element={
                <PrivateRoute>
                  <Layout>
                    <Employees />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/roles" element={
                <PrivateRoute>
                  <Layout>
                    <Roles />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/tasks" element={
                <PrivateRoute>
                  <Layout>
                    <Tasks />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/attendance" element={
                <PrivateRoute>
                  <Layout>
                    <Attendance />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/payroll" element={
                <PrivateRoute>
                  <Layout>
                    <Payroll />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/departments" element={
                <PrivateRoute>
                  <Layout>
                    <Departments />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/designations" element={
                <PrivateRoute>
                  <Layout>
                    <Designations />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/performance" element={
                <PrivateRoute>
                  <Layout>
                    <Performance />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/job-portal" element={
                <PrivateRoute>
                  <Layout>
                    <JobPortal />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/reports" element={
                <PrivateRoute>
                  <Layout>
                    <Reports />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="/settings" element={
                <PrivateRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </PrivateRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

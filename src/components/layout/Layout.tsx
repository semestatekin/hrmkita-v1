
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

type LayoutProps = {
  children: React.ReactNode;
};

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/employees":
      return "Karyawan";
    case "/projects":
      return "Proyek";
    case "/roles":
      return "Peran";
    case "/tasks":
      return "Tugas";
    case "/attendance":
      return "Kehadiran";
    case "/payroll":
      return "Penggajian";
    case "/departments":
      return "Departemen";
    case "/designations":
      return "Jabatan";
    case "/performance":
      return "Kinerja";
    case "/job-portal":
      return "Job Portal";
    case "/reports":
      return "Laporan";
    case "/settings":
      return "Pengaturan";
    default:
      return "Dashboard";
  }
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="flex h-screen bg-gray-50">
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </div>

      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} title={pageTitle} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

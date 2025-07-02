
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  ShieldCheck,
  CheckSquare,
  CalendarClock,
  Receipt,
  Building2,
  Award,
  GaugeCircle,
  Settings,
  UserCircle,
} from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export const Sidebar = () => {
  const { pathname } = useLocation();

  const SidebarLink: React.FC<SidebarLinkProps> = ({
    href,
    icon: Icon,
    children,
    className,
  }) => {
    const isActive = pathname === href;

    return (
      <Link
        to={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-100",
          isActive
            ? "bg-hrm-primary/10 text-hrm-primary font-medium"
            : "text-gray-500 hover:text-gray-900",
          className
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5 shrink-0",
            isActive ? "text-hrm-primary" : "text-gray-400"
          )}
        />
        <span>{children}</span>
      </Link>
    );
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="text-xl flex items-center">
            <UserCircle className="h-6 w-6 text-hrm-primary mr-2" /> HRM Kita
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm">
          <SidebarLink href="/" icon={LayoutDashboard}>
            Dashboard
          </SidebarLink>

          <SidebarLink href="/employees" icon={Users}>
            Karyawan
          </SidebarLink>

          <SidebarLink href="/projects" icon={Briefcase}>
            Proyek
          </SidebarLink>

          <SidebarLink href="/roles" icon={ShieldCheck}>
            Peran
          </SidebarLink>

          <SidebarLink href="/tasks" icon={CheckSquare}>
            Tugas
          </SidebarLink>

          <SidebarLink href="/attendance" icon={CalendarClock}>
            Kehadiran
          </SidebarLink>

          <SidebarLink href="/payroll" icon={Receipt}>
            Penggajian
          </SidebarLink>

          <SidebarLink href="/departments" icon={Building2}>
            Departemen
          </SidebarLink>

          <SidebarLink href="/designations" icon={Award}>
            Jabatan
          </SidebarLink>

          <SidebarLink href="/performance" icon={GaugeCircle}>
            Kinerja
          </SidebarLink>
          
          <SidebarLink href="/job-portal" icon={Briefcase} className="relative">
            Job Portal
            <span className="absolute right-3 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              10
            </span>
          </SidebarLink>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <SidebarLink href="/settings" icon={Settings}>
          Pengaturan
        </SidebarLink>
      </div>
    </div>
  );
};

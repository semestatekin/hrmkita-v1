
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Users,
  Briefcase,
  Calendar,
  ClipboardList,
  FileText,
  ChartBar,
  Settings,
  Clock,
  User,
} from "lucide-react";

type SidebarItemProps = {
  href: string;
  icon: React.ElementType;
  title: string;
  active: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon: Icon,
  title,
  active,
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{title}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const routes = [
    {
      href: "/",
      title: "Dashboard",
      icon: ChartBar,
    },
    {
      href: "/employees",
      title: "Karyawan",
      icon: Users,
    },
    {
      href: "/projects",
      title: "Proyek",
      icon: Briefcase,
    },
    {
      href: "/tasks",
      title: "Tugas",
      icon: ClipboardList,
    },
    {
      href: "/roles",
      title: "Peran",
      icon: User,
    },
    {
      href: "/attendance",
      title: "Kehadiran",
      icon: Clock,
    },
    {
      href: "/payroll",
      title: "Penggajian",
      icon: FileText,
    },
    {
      href: "/departments",
      title: "Departemen",
      icon: Briefcase,
    },
    {
      href: "/designations",
      title: "Jabatan",
      icon: Briefcase,
    },
    {
      href: "/performance",
      title: "Kinerja",
      icon: ChartBar,
    },
    {
      href: "/settings",
      title: "Pengaturan",
      icon: Settings,
    },
  ];

  return (
    <div className="bg-sidebar flex flex-col h-full w-64 py-4 border-r">
      <div className="px-4 mb-6">
        <h1 className="text-xl font-bold text-white flex items-center justify-center">
          PT. HAI SEMESTA SOLUSINDO
        </h1>
      </div>
      <div className="flex flex-col gap-1 px-2 flex-1">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            href={route.href}
            icon={route.icon}
            title={route.title}
            active={pathname === route.href}
          />
        ))}
      </div>
      <div className="border-t border-sidebar-border pt-4 px-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="h-5 w-5 text-sidebar-accent-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground">
              Admin User
            </p>
            <p className="text-xs text-sidebar-foreground/60">
              admin@haisemesta.id
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

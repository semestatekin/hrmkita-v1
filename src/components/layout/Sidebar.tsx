
import React, { useState } from "react";
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
  ChevronDown,
  ChevronRight,
  Database,
  Activity,
  FileText,
} from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

interface MenuGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  items: {
    href: string;
    icon: React.ElementType;
    label: string;
  }[];
}

export const Sidebar = () => {
  const { pathname } = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['master-data', 'operasional']);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

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
            "h-4 w-4 shrink-0",
            isActive ? "text-hrm-primary" : "text-gray-400"
          )}
        />
        <span className="text-sm">{children}</span>
      </Link>
    );
  };

  const menuGroups: MenuGroup[] = [
    {
      id: 'master-data',
      label: 'Master Data',
      icon: Database,
      items: [
        { href: '/employees', icon: Users, label: 'Karyawan' },
        { href: '/departments', icon: Building2, label: 'Departemen' },
        { href: '/designations', icon: Award, label: 'Jabatan' },
      ]
    },
    {
      id: 'operasional',
      label: 'Operasional',
      icon: Activity,
      items: [
        { href: '/attendance', icon: CalendarClock, label: 'Kehadiran' },
        { href: '/projects', icon: Briefcase, label: 'Proyek' },
        { href: '/tasks', icon: CheckSquare, label: 'Tugas' },
        { href: '/performance', icon: GaugeCircle, label: 'Kinerja' },
        { href: '/job-portal', icon: Briefcase, label: 'Job Portal' },
        { href: '/payroll', icon: Receipt, label: 'Payroll' },
      ]
    }
  ];

  const isGroupActive = (items: MenuGroup['items']) => {
    return items.some(item => pathname === item.href);
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
        <nav className="grid items-start px-4 text-sm space-y-1">
          {/* Dashboard - Top Level */}
          <SidebarLink href="/" icon={LayoutDashboard}>
            Dashboard
          </SidebarLink>

          {/* Master Data Group */}
          {menuGroups.map((group) => {
            const isExpanded = expandedGroups.includes(group.id);
            const hasActiveItem = isGroupActive(group.items);
            
            return (
              <div key={group.id} className="space-y-1">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all hover:bg-gray-100",
                    hasActiveItem
                      ? "bg-hrm-primary/5 text-hrm-primary font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  <group.icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      hasActiveItem ? "text-hrm-primary" : "text-gray-400"
                    )}
                  />
                  <span className="flex-1 text-sm font-medium">{group.label}</span>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {group.items.map((item) => (
                      <SidebarLink
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        className="py-1.5"
                      >
                        {item.label}
                        {item.href === '/job-portal' && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                            10
                          </span>
                        )}
                      </SidebarLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Roles - Standalone */}
          <SidebarLink href="/roles" icon={ShieldCheck}>
            Peran
          </SidebarLink>

          {/* Self Service - Top Level */}
          <SidebarLink href="/self-service" icon={UserCircle}>
            Self Service
          </SidebarLink>

          {/* Laporan - Top Level */}
          <SidebarLink href="/reports" icon={FileText}>
            Laporan
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


export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  avatar?: string;
  salary?: string;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  birthDate?: string;
  emergencyContact?: string;
}

export const statusColors: Record<string, string> = {
  active: "bg-green-500",
  inactive: "bg-red-500",
  "on-leave": "bg-yellow-500",
};

export const statusLabels: Record<string, string> = {
  active: "Aktif",
  inactive: "Tidak Aktif",
  "on-leave": "Cuti",
};

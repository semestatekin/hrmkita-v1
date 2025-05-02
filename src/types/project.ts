
export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'not-started' | 'in-progress' | 'on-hold' | 'completed';
  client: string;
  budget?: string;
  manager: string;
  progress: number;
  team: string[];
}

export const statusColors: Record<string, string> = {
  'not-started': 'bg-gray-500',
  'in-progress': 'bg-blue-500',
  'on-hold': 'bg-yellow-500',
  'completed': 'bg-green-500'
};

export const statusLabels: Record<string, string> = {
  'not-started': 'Belum Dimulai',
  'in-progress': 'Sedang Berjalan',
  'on-hold': 'Ditunda',
  'completed': 'Selesai'
};

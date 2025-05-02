
export interface KPI {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  startDate: string;
  endDate: string;
  status: 'not-started' | 'in-progress' | 'at-risk' | 'completed';
  employeeId: string;
  departmentId: string;
}

export interface OKRObjective {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  assigneeId: string;
  assigneeName: string;
  departmentId: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'at-risk' | 'completed';
}

export interface KeyResult {
  id: string;
  objectiveId: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'at-risk' | 'completed';
}

export type PerformanceStatus = 'not-started' | 'in-progress' | 'at-risk' | 'completed';

export const statusColors: Record<PerformanceStatus, string> = {
  'not-started': 'bg-gray-400',
  'in-progress': 'bg-blue-500',
  'at-risk': 'bg-yellow-500',
  'completed': 'bg-green-500',
};

export const statusLabels: Record<PerformanceStatus, string> = {
  'not-started': 'Belum Dimulai',
  'in-progress': 'Dalam Proses',
  'at-risk': 'Berisiko',
  'completed': 'Selesai',
};

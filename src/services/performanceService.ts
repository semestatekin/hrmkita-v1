
import { v4 as uuidv4 } from 'uuid';
import { setLocalData, getLocalData } from '../utils/localStorage';
import { KPI, OKRObjective, KeyResult } from '../types/performance';

// Local storage keys
const KPI_KEY = 'hrm_kpi_data';
const OKR_OBJECTIVES_KEY = 'hrm_okr_objectives';
const KEY_RESULTS_KEY = 'hrm_key_results';

// Initial sample data for KPIs
const initialKPIs: KPI[] = [
  {
    id: '1',
    title: 'Target Penjualan Q2',
    description: 'Mencapai target penjualan untuk kuartal kedua',
    targetValue: 500000000,
    currentValue: 325000000,
    unit: 'Rupiah',
    startDate: '2023-04-01',
    endDate: '2023-06-30',
    status: 'in-progress',
    employeeId: '3',
    departmentId: '5'
  },
  {
    id: '2',
    title: 'Kepuasan Pelanggan',
    description: 'Meningkatkan skor kepuasan pelanggan',
    targetValue: 90,
    currentValue: 85,
    unit: '%',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    status: 'in-progress',
    employeeId: '4',
    departmentId: '5'
  },
  {
    id: '3',
    title: 'Pengembangan Produk Baru',
    description: 'Meluncurkan produk baru sesuai jadwal',
    targetValue: 3,
    currentValue: 2,
    unit: 'Produk',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    status: 'in-progress',
    employeeId: '1',
    departmentId: '1'
  }
];

// Initial sample data for OKR Objectives
const initialObjectives: OKRObjective[] = [
  {
    id: '1',
    title: 'Tingkatkan Pendapatan Perusahaan',
    description: 'Tingkatkan pendapatan perusahaan sebesar 20% dibandingkan tahun lalu',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    assigneeId: '1',
    assigneeName: 'Budi Santoso',
    departmentId: '1',
    progress: 65,
    status: 'in-progress'
  },
  {
    id: '2',
    title: 'Kembangkan Platform Digital',
    description: 'Mengembangkan dan meluncurkan versi baru platform digital perusahaan',
    startDate: '2023-02-15',
    endDate: '2023-08-30',
    assigneeId: '2',
    assigneeName: 'Siti Nurhayati',
    departmentId: '2',
    progress: 50,
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Tingkatkan Kepuasan Karyawan',
    description: 'Meningkatkan skor keterlibatan karyawan melalui inisiatif baru',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    assigneeId: '4',
    assigneeName: 'Dewi Sartika',
    departmentId: '4',
    progress: 30,
    status: 'in-progress'
  }
];

// Initial sample data for Key Results
const initialKeyResults: KeyResult[] = [
  {
    id: '1',
    objectiveId: '1',
    title: 'Akuisisi Pelanggan Baru',
    description: 'Mendapatkan 200 pelanggan baru dengan nilai tinggi',
    targetValue: 200,
    currentValue: 120,
    unit: 'Pelanggan',
    progress: 60,
    status: 'in-progress'
  },
  {
    id: '2',
    objectiveId: '1',
    title: 'Pendapatan per Pelanggan',
    description: 'Meningkatkan rata-rata pendapatan per pelanggan sebesar 15%',
    targetValue: 15,
    currentValue: 12,
    unit: '%',
    progress: 80,
    status: 'in-progress'
  },
  {
    id: '3',
    objectiveId: '2',
    title: 'Fitur Baru',
    description: 'Menambahkan 5 fitur utama baru ke platform',
    targetValue: 5,
    currentValue: 2,
    unit: 'Fitur',
    progress: 40,
    status: 'in-progress'
  },
  {
    id: '4',
    objectiveId: '2',
    title: 'Pengguna Aktif Bulanan',
    description: 'Meningkatkan pengguna aktif bulanan sebesar 30%',
    targetValue: 30,
    currentValue: 15,
    unit: '%',
    progress: 50,
    status: 'in-progress'
  },
  {
    id: '5',
    objectiveId: '3',
    title: 'Skor Survei Karyawan',
    description: 'Mencapai skor survei karyawan minimal 4.5/5',
    targetValue: 4.5,
    currentValue: 4.1,
    unit: 'Skor',
    progress: 90,
    status: 'in-progress'
  }
];

// Initialize local storage with sample data if empty
const initializeLocalStorage = () => {
  if (!localStorage.getItem(KPI_KEY)) {
    setLocalData(KPI_KEY, initialKPIs);
  }
  if (!localStorage.getItem(OKR_OBJECTIVES_KEY)) {
    setLocalData(OKR_OBJECTIVES_KEY, initialObjectives);
  }
  if (!localStorage.getItem(KEY_RESULTS_KEY)) {
    setLocalData(KEY_RESULTS_KEY, initialKeyResults);
  }
};

// KPI Services
export const getKPIs = (): KPI[] => {
  initializeLocalStorage();
  return getLocalData<KPI[]>(KPI_KEY, []);
};

export const getKPIById = (id: string): KPI | undefined => {
  const kpis = getKPIs();
  return kpis.find(kpi => kpi.id === id);
};

export const saveKPI = (kpi: Omit<KPI, 'id'>): KPI => {
  const newKPI = { ...kpi, id: uuidv4() };
  const kpis = getKPIs();
  setLocalData(KPI_KEY, [...kpis, newKPI]);
  return newKPI;
};

export const updateKPI = (kpi: KPI): void => {
  const kpis = getKPIs();
  const updatedKPIs = kpis.map(k => k.id === kpi.id ? kpi : k);
  setLocalData(KPI_KEY, updatedKPIs);
};

export const deleteKPI = (id: string): void => {
  const kpis = getKPIs();
  setLocalData(KPI_KEY, kpis.filter(kpi => kpi.id !== id));
};

// OKR Objectives Services
export const getObjectives = (): OKRObjective[] => {
  initializeLocalStorage();
  return getLocalData<OKRObjective[]>(OKR_OBJECTIVES_KEY, []);
};

export const getObjectiveById = (id: string): OKRObjective | undefined => {
  const objectives = getObjectives();
  return objectives.find(objective => objective.id === id);
};

export const saveObjective = (objective: Omit<OKRObjective, 'id'>): OKRObjective => {
  const newObjective = { ...objective, id: uuidv4() };
  const objectives = getObjectives();
  setLocalData(OKR_OBJECTIVES_KEY, [...objectives, newObjective]);
  return newObjective;
};

export const updateObjective = (objective: OKRObjective): void => {
  const objectives = getObjectives();
  const updatedObjectives = objectives.map(o => o.id === objective.id ? objective : o);
  setLocalData(OKR_OBJECTIVES_KEY, updatedObjectives);
};

export const deleteObjective = (id: string): void => {
  const objectives = getObjectives();
  setLocalData(OKR_OBJECTIVES_KEY, objectives.filter(objective => objective.id !== id));
  
  // Also delete associated key results
  const keyResults = getKeyResults();
  setLocalData(KEY_RESULTS_KEY, keyResults.filter(kr => kr.objectiveId !== id));
};

// Key Results Services
export const getKeyResults = (): KeyResult[] => {
  initializeLocalStorage();
  return getLocalData<KeyResult[]>(KEY_RESULTS_KEY, []);
};

export const getKeyResultsByObjectiveId = (objectiveId: string): KeyResult[] => {
  const keyResults = getKeyResults();
  return keyResults.filter(kr => kr.objectiveId === objectiveId);
};

export const saveKeyResult = (keyResult: Omit<KeyResult, 'id'>): KeyResult => {
  const newKeyResult = { ...keyResult, id: uuidv4() };
  const keyResults = getKeyResults();
  setLocalData(KEY_RESULTS_KEY, [...keyResults, newKeyResult]);
  return newKeyResult;
};

export const updateKeyResult = (keyResult: KeyResult): void => {
  const keyResults = getKeyResults();
  const updatedKeyResults = keyResults.map(kr => kr.id === keyResult.id ? keyResult : kr);
  setLocalData(KEY_RESULTS_KEY, updatedKeyResults);
  
  // Update the parent objective progress
  updateObjectiveProgress(keyResult.objectiveId);
};

export const deleteKeyResult = (id: string): void => {
  const keyResults = getKeyResults();
  const keyResult = keyResults.find(kr => kr.id === id);
  
  if (keyResult) {
    setLocalData(KEY_RESULTS_KEY, keyResults.filter(kr => kr.id !== id));
    // Update the parent objective progress
    updateObjectiveProgress(keyResult.objectiveId);
  }
};

// Helper function to update objective progress based on key results
const updateObjectiveProgress = (objectiveId: string): void => {
  const keyResults = getKeyResultsByObjectiveId(objectiveId);
  if (keyResults.length === 0) return;
  
  // Calculate the average progress of all key results
  const totalProgress = keyResults.reduce((sum, kr) => sum + kr.progress, 0);
  const averageProgress = Math.round(totalProgress / keyResults.length);
  
  const objective = getObjectiveById(objectiveId);
  if (objective) {
    const updatedObjective = { ...objective, progress: averageProgress };
    updateObjective(updatedObjective);
  }
};

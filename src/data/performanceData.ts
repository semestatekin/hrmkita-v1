
export const performanceData = [
  {
    id: 1,
    employee: "Budi Santoso",
    position: "Senior Developer",
    department: "Engineering",
    rating: 4.8,
    status: "excellent",
    reviewDate: "10 Juni 2023",
    projects: 5,
    goals: "92%",
    trend: "up",
  },
  {
    id: 2,
    employee: "Siti Nurhayati",
    position: "UI/UX Designer",
    department: "Design",
    rating: 4.5,
    status: "excellent",
    reviewDate: "12 Juni 2023",
    projects: 4,
    goals: "90%",
    trend: "up",
  },
  {
    id: 3,
    employee: "Andi Wijaya",
    position: "Project Manager",
    department: "Management",
    rating: 4.2,
    status: "good",
    reviewDate: "15 Juni 2023",
    projects: 3,
    goals: "85%",
    trend: "stable",
  },
  {
    id: 4,
    employee: "Dewi Sartika",
    position: "HR Specialist",
    department: "Human Resources",
    rating: 3.9,
    status: "good",
    reviewDate: "8 Juni 2023",
    projects: 2,
    goals: "80%",
    trend: "stable",
  },
  {
    id: 5,
    employee: "Rudi Hartono",
    position: "Sales Executive",
    department: "Sales",
    rating: 3.5,
    status: "average",
    reviewDate: "5 Juni 2023",
    projects: 4,
    goals: "75%",
    trend: "down",
  },
];

export const statusColors: Record<string, string> = {
  excellent: "bg-green-500",
  good: "bg-blue-500",
  average: "bg-yellow-500",
  poor: "bg-red-500",
};

export const statusLabels: Record<string, string> = {
  excellent: "Sangat Baik",
  good: "Baik",
  average: "Rata-rata",
  poor: "Kurang",
};

export const departmentPerformance = [
  {
    name: "Engineering",
    rating: 4.6,
  },
  {
    name: "Design",
    rating: 4.4,
  },
  {
    name: "Management",
    rating: 4.1,
  },
  {
    name: "HR",
    rating: 3.9,
  },
  {
    name: "Sales",
    rating: 3.7,
  },
  {
    name: "Finance",
    rating: 4.0,
  },
];

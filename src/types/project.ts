
export interface Project {
  id: number;
  name: string;
  client: string;
  startDate: string;
  deadline: string;
  status: "in-progress" | "completed" | "delayed" | "not-started";
  progress: number;
  team: number;
}

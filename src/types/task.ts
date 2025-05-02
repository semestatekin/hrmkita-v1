
export interface Task {
  id: number;
  title: string;
  description: string;
  project: string;
  assignee: string;
  dueDate: string;
  status: "in-progress" | "completed" | "not-started";
  priority: "high" | "medium" | "low";
}

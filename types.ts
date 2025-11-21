export enum TaskStatus {
  TODO = 'Todo',
  IN_PROGRESS = 'In Progress',
  REVIEW = 'Review',
  DONE = 'Done'
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string; // URL
  dailyCapacityHours: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId: string;
  startDate: string; // ISO Date
  dueDate: string;   // ISO Date
  estimatedTime: number; // Hours
  tags: string[];
  dependencies?: string[]; // IDs of tasks this task depends on
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  hours: number;
  date: string; // ISO Date
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'On Hold' | 'Completed';
  progress: number; // 0-100
}
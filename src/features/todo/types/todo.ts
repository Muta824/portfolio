export type Priority = 'high' | 'medium' | 'low';

export type ConcentrationLevel = 'am1' | 'am2' | 'am3' | 'pm1' | 'pm2' | 'pm3' | 'other1' | 'other2' | 'other3';

export interface Task {
  id: string;
  content: string;
  concentrationLevel: ConcentrationLevel;
  dueDate: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoList {
  date: Date;
  morningTasks: Task[];
  afternoonTasks: Task[];
  routineTasks: Task[];
}

export interface TaskFormData {
  title: string;
  description: string;
  concentrationLevel: ConcentrationLevel;
  dueDate: Date;
  tags: string[];
} 
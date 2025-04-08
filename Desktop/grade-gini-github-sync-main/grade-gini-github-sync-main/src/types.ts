
export type ViewType = 'month' | 'list' | 'week';

export interface Task {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  endTime?: string;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  systemId?: string;
  systemName?: string;
  subtasks?: SubTask[];
  productivityTechnique?: string;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export type TaskCategory = 'work' | 'personal' | 'study' | 'health' | 'errands' | 'finance' | 'other';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface LearningSystem {
  id: string | number;
  title: string;
  description: string;
  progress: number;
  deadline: string;
  status: string;
  totalWeeks?: number;
  totalTasks?: number;
  completedTasks?: number;
  timeSpent?: number;
  estimatedTime?: number;
  modules?: SystemModule[];
  tasks?: Task[]; // Added the tasks property
}

export interface SystemModule {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  tasks: Task[];
}

export interface WordCard {
  id: number;
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
  known?: boolean;
  studyLater?: boolean;
  synonyms: string[];
  antonyms?: string[];
}

export interface Template {
  id: string | number;
  title: string;
  description: string | null;
  estimatedDuration: string | null;
  difficulty: string | null;
  category: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface TemplateModule {
  id: string;
  title: string;
  description: string | null;
  order_number: number;
  template_id: string;
  tasks: TemplateTask[];
  created_at?: string;
  updated_at?: string;
}

export interface TemplateTask {
  id: string;
  title: string;
  description: string | null;
  estimated_time: number | null;
  order_number: number;
  module_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface CalendarViewProps {
  visibleSystems?: string[];
}

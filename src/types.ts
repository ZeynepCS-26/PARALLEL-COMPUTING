export interface UserProfile {
  id: string;
  name: string;
  isPublic: boolean;
  completedTasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  code: string;
  simulationResult: string;
  completedAt: string;
}

export type Language = 'en' | 'tr';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

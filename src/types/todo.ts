export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoExtended extends Todo {
  description?: string;
  categoryId?: string;
  priority?: 'high' | 'medium' | 'low';
  dueDate?: Date;
  tags?: string[];
}
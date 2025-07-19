import type { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground text-sm">
          まだToDoがありません
        </div>
        <div className="text-muted-foreground text-xs mt-1">
          上の「追加」ボタンから新しいToDoを作成してください
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  );
};
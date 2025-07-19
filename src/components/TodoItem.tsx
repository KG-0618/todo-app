import { Trash2 } from 'lucide-react';
import type { Todo } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <Card className="p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={onToggle}
          className="mt-0.5"
        />
        <div className="flex-1 min-w-0">
          <p className={`text-sm leading-relaxed ${
            todo.completed 
              ? 'line-through text-muted-foreground' 
              : 'text-foreground'
          }`}>
            {todo.title}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {todo.createdAt.toLocaleDateString('ja-JP')}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="shrink-0 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
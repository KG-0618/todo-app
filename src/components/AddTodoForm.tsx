import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface AddTodoFormProps {
  onAdd: (title: string) => void;
  onCancel: () => void;
}

export const AddTodoForm = ({ onAdd, onCancel }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onAdd(trimmedTitle);
      setTitle('');
      onCancel();
    }
  };

  const handleAddClick = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onAdd(trimmedTitle);
      setTitle('');
      onCancel();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddClick(e);
  };

  // モバイル環境でのフォーカス処理を改善
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">新しいToDo</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            ref={inputRef}
            type="text"
            placeholder="ToDoのタイトルを入力..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={100}
            className="text-base"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
          
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              キャンセル
            </Button>
            <Button
              ref={addButtonRef}
              type="button"
              onClick={handleAddClick}
              onTouchEnd={handleTouchEnd}
              disabled={!title.trim()}
              className="min-h-[44px] min-w-[44px] touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              追加
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
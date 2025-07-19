import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onAddClick: () => void;
}

export const Header = ({ onAddClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <h1 className="text-lg font-semibold">ToDoアプリ</h1>
        <Button
          onClick={onAddClick}
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          追加
        </Button>
      </div>
    </header>
  );
};
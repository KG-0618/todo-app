import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { Header } from '@/components/Header';
import { TodoList } from '@/components/TodoList';
import { AddTodoForm } from '@/components/AddTodoForm';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleAddTodo = (title: string) => {
    addTodo(title);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAddClick={() => setIsAddFormOpen(true)} />
      
      <main className="pb-4">
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </main>

      {isAddFormOpen && (
        <AddTodoForm
          onAdd={handleAddTodo}
          onCancel={() => setIsAddFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;

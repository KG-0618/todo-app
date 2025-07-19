import type { Todo } from '@/types/todo';
import { useLocalStorage } from './useLocalStorage';

export const useTodos = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const addTodo = (title: string) => {
    if (!title.trim()) return;
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, title: string) => {
    if (!title.trim()) return;
    
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, title: title.trim(), updatedAt: new Date() }
          : todo
      )
    );
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
  };
};
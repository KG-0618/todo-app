import { useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      
      const parsed = JSON.parse(item);
      
      if (key === 'todos' && Array.isArray(parsed)) {
        return parsed.map((todo: unknown) => ({
          ...(todo as Record<string, unknown>),
          createdAt: new Date((todo as { createdAt: string }).createdAt),
          updatedAt: new Date((todo as { updatedAt: string }).updatedAt),
        }));
      }
      
      return parsed;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
      
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        alert('ストレージ容量が不足しています。不要なデータを削除してください。');
      }
    }
  };

  return [storedValue, setValue] as const;
};
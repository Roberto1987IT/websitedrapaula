// src/hooks/use-toast.ts
import { useState, useCallback } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [nextId, setNextId] = useState(0);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = nextId;
    setNextId(nextId + 1);
    setToasts(prevToasts => [...prevToasts, { id, message, type }]);
    return id; // Return the id so you can manually remove it later if needed
  }, [nextId]);

  const removeToast = useCallback((id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
  };
};

export default useToast;
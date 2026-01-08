"use client";

// This is a simplified version. In a real app, you'd use something like sonner or react-hot-toast
import { useState } from "react";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    setToasts([...toasts, props]);
    
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, props.duration || 5000);
  };

  return { toast, toasts };
}
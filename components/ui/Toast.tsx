"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  return (
    <div
      role="alert"
      className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-lg"
    >
      <p className="text-sm text-stone-700">{message}</p>
    </div>
  );
}

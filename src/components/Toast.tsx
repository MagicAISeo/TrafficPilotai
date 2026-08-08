import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warn' | 'error';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-500 shrink-0" />,
    warn: <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />,
    error: <XCircle className="w-4 h-4 text-rose-500 shrink-0" />,
  };

  const borderColors = {
    success: 'border-emerald-500/30 bg-emerald-50/90 dark:bg-emerald-950/90',
    info: 'border-blue-500/30 bg-blue-50/90 dark:bg-blue-950/90',
    warn: 'border-amber-500/30 bg-amber-50/90 dark:bg-amber-950/90',
    error: 'border-rose-500/30 bg-rose-50/90 dark:bg-rose-950/90',
  };

  return (
    <div
      className={`pointer-events-auto flex items-center justify-between gap-3 p-3 rounded-xl border backdrop-blur-md shadow-lg text-xs font-medium text-slate-800 dark:text-slate-100 transition-all ${
        borderColors[toast.type]
      }`}
    >
      <div className="flex items-center gap-2.5">
        {icons[toast.type]}
        <span>{toast.message}</span>
      </div>
      <button
        id={`dismiss-toast-${toast.id}`}
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded hover:bg-slate-200/50 dark:hover:bg-slate-700/50 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

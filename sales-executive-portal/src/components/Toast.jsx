import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const bg = toast.type === 'error' ? 'bg-red-50 border-red-300 text-red-800' :
             toast.type === 'info' ? 'bg-blue-50 border-blue-300 text-blue-800' :
             'bg-emerald-50 border-emerald-300 text-emerald-800';

  const Icon = toast.type === 'error' ? AlertCircle :
               toast.type === 'info' ? Info : CheckCircle2;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${bg} max-w-md`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <div className="text-xs font-medium">{toast.message}</div>
        <button onClick={onClose} className="p-1 hover:opacity-75 transition-opacity ml-2">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

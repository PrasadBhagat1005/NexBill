import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={20} className="text-emerald-500" />;
      case 'error':
        return <AlertCircle size={20} className="text-rose-500" />;
      default:
        return <Info size={20} className="text-sky-500" />;
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast ${toast.type || 'info'}`}>
        {getIcon()}
        <span>{toast.message}</span>
        <button onClick={onClose} style={{ marginLeft: 'auto', background: 'transparent', color: '#94a3b8' }}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

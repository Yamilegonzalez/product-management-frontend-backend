import React from 'react';
import ReactDOM from 'react-dom';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  open,
  title = '¿Estás seguro?',
  message = 'Esta acción no se puede deshacer.',
  onCancel,
  onConfirm,
}: ConfirmDialogProps) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full space-y-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

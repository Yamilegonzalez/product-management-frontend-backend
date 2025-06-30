import { Category } from '@/app/api/models/category/Category';
import { useStore } from '@/stores/useStore';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface CategoryAddModalProps {
    open: boolean;
    onClose: () => void;
}

export const CategoryAddModal = ({ open, onClose }: CategoryAddModalProps) => {
    const [categoryName, setCategoryName] = useState('');
    const addCategory = useStore((state) => state.addCategory);

    if (!open) return null;

    const handleAdd = async () => {
        if (categoryName.trim() === '') return;
        await addCategory(new Category({ name: categoryName }));
        onClose();
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full space-y-4">
                <h2 className="text-lg font-bold text-gray-800">Agregar Categoría</h2>
                <input
                    type="text"
                    placeholder="Nombre de la categoría"
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => {
                            setCategoryName('');
                            onClose();
                        }}
                        className="px-4 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 transition"
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

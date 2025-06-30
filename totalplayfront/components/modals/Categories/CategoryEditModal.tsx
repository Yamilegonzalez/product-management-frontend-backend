import { Category } from '@/app/api/models/category/Category';
import { InputField } from '@/components/ui/InputField';
import { useStore } from '@/stores/useStore';
import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface CategoryAddModalProps {
    categoryId: number
    open: boolean;
    onClose: () => void;
}

export const CategoryEditModal = ({ categoryId, open, onClose }: CategoryAddModalProps) => {
    const [category, setCategory] = useState<Category>(new Category({}));
    const updateCategory = useStore((state) => state.updateCategory);
    const fetchCategory = useStore((state) => state.fetchCategory);
    const fetchProducts = useStore((state) => state.fetchProducts);

    const loadCategory = useCallback  (async()=>{
        const response = await fetchCategory(categoryId);
        setCategory(response);
    },[categoryId, fetchCategory])

    useEffect(() => {
        if (categoryId == 0 || !open) return
        loadCategory();
    }, [categoryId, open, loadCategory])


    if (!open) return null;

    const handleAdd = async () => {
        if (category.name.trim() === '') return;
        await updateCategory(category);
        await fetchProducts();
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (category) {
            const updatedProduct = new Category({
                ...category,
                [name]: value,
            })
            setCategory(updatedProduct)
        }
    }
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full space-y-4">
                <h2 className="text-lg font-bold text-gray-800">Agregar Categoría</h2>
                <InputField label="Nombre de la categoría" name="name" value={category.name} onChange={handleChange} type='text' />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => {
                            setCategory(new Category({}));
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
                        Guardar
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};


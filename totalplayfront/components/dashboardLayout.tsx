'use client'

import { useStore } from '@/stores/useStore';
import { useEffect, useState } from 'react'
import { CategoryRow } from './ui/CategoryRow';
import { CategoryAddModal } from './modals/Categories/CategoryAddModal';
import { CategoryEditModal } from './modals/Categories/CategoryEditModal';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const categories = useStore((state) => state.categories);
    const fetchCategories = useStore((state) => state.fetchCategories);
    const setCategoryFilter = useStore((state) => state.setCategoryFilterId);
    const [isAddCategory, setIsAddCategory] = useState(false);
    const [idCategorySel, setIdCategorySel] = useState(0);
    const [isEditCategory, setIsEditCategory] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const editCategory = (id: number) => {
        setIdCategorySel(id)
        setIsEditCategory(true);
    }

    return (
        <div className="min-h-screen flex">
            <CategoryAddModal
                open={isAddCategory}
                onClose={() => setIsAddCategory(false)}
            />
            <CategoryEditModal
                open={isEditCategory}
                categoryId={idCategorySel}
                onClose={() => setIsEditCategory(false)}
            />
            <aside className="h-fit min-h-[calc(100vh-100px)] w-70 bg-[#cccccc] text-black p-8 rounded-tr-3xl rounded-br-3xl shadow-lg mt-4 ml-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-10 tracking-wide">Categorías</h2>
                    <ul className="space-y-9 text-base">
                        {categories.length === 0 && (
                            <span>Cargando...</span>
                        )}
                        {categories.map((cat) => (
                            <li key={cat.id}>
                                <CategoryRow name={cat.name}
                                    id={cat.id}
                                    onEdit={() => editCategory(cat.id)}
                                    onSelect={() => setCategoryFilter(cat.id)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <CategoryRow
                    name={''}
                    addNew={() => setIsAddCategory(true)} id={0}                />

                <button
                    className="flex items-center gap-3 text-base font-semibold bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 active:scale-95 transition transform duration-200 shadow-lg shadow-red-400/40"
                    onClick={() => (window.location.href = '/login')}
                >
                    Cerrar sesión
                </button>

            </aside>

            <div className="flex-1 flex flex-col">
                <main className="p-6 pb-28">{children}</main>

                <footer className="fixed bottom-0 left-0 w-full bg-[#cccccc] text-black py-4 shadow z-50">
                    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                        <p>&copy; {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:underline">Términos</a>
                            <a href="#" className="hover:underline">Privacidad</a>
                            <a href="#" className="hover:underline">Contacto</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

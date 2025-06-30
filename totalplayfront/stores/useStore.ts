import { Category } from '@/app/api/models/category/Category'
import { Product } from '@/app/api/models/product/Product'
import { create } from 'zustand'

type Store = {
    products: Product[]
    categories: Category[]
    fetchProducts: () => Promise<void>
    addProduct: (p: Product) => Promise<void>
    fetchProduct: (id: number) => Promise<Product>
    updateProduct: (p: Product) => Promise<void>
    deleteProduct: (id: number) => Promise<void>
    fetchCategories: () => Promise<void>
    addCategory: (c: Category) => Promise<void>
    fetchCategory: (id: number) => Promise<Category>
    updateCategory: (c: Category) => Promise<void>
    categoryFilterId: number
    setCategoryFilterId: (id: number) => void
}

const baseURL = 'http://localhost:8080/api';

export const useStore = create<Store>((set) => ({
    products: [],
    categories: [],
    fetchProducts: async () => {
        const res = await fetch(`${baseURL}/products/`)
        const data = await res.json()

        const categories = useStore.getState().categories;

        const processedProducts = Array.isArray(data)
            ? data.map((product) => {
                const category = categories.find((c) => c.id === product.categoryId);
                return {
                    ...product,
                    category: category ? category.name : 'Sin categoría',
                };
            })
            : [];

        set({ products: processedProducts });
    },
    addProduct: async (product) => {
        await fetch(`${baseURL}/products/`, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' },
        })
        set((state) => ({ products: [...state.products, product] }))
    },
    fetchProduct: async (id: number) => {
        const res = await fetch(`${baseURL}/products/${id}`)
        const data = await res.json()
        return data;
    },
    updateProduct: async (product: Product) => {
        await fetch(`${baseURL}/products/${product.id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' },
        })
        set((state) => ({
            products: state.products.map((p) => (p.id === product.id ? product : p)),
        }))
    },
    deleteProduct: async (id: number) => {
        await fetch(`${baseURL}/products/${id}`, { method: 'DELETE' })
        set((state) => ({
            products: state.products.filter((p) => p.id !== id),
        }))
    },
    fetchCategories: async () => {
        const res = await fetch(`${baseURL}/categories/`)
        const data = await res.json()
        set({ categories: data })
    },
    addCategory: async (category) => {
        await fetch(`${baseURL}/categories/`, {
            method: 'POST',
            body: JSON.stringify(category),
            headers: { 'Content-Type': 'application/json' },
        })
        set((state) => ({ categories: [...state.categories, category] }))
    },
    fetchCategory: async (id: number) => {
        const res = await fetch(`${baseURL}/categories/${id}`)
        const data = await res.json()
        return data;
    },
    updateCategory: async (category: Category) => {
        await fetch(`${baseURL}/categories/${category.id}`, {
            method: 'PUT',
            body: JSON.stringify(category),
            headers: { 'Content-Type': 'application/json' },
        })
        set((state) => ({
            categories: state.categories.map((c) => (c.id === category.id ? category : c)),
        }))
    },
    categoryFilterId: 0,
    setCategoryFilterId: (id: number) => {
        set(() => ({
            categoryFilterId: id,
        }));
    },

}))

import { useCallback, useEffect, useState } from 'react'
import { Product } from '@/app/api/models/product/Product'
import { InputField } from '../../ui/InputField'
import { useStore } from '@/stores/useStore'
import { SelectField } from '../../ui/SelectField'
interface ProductEditModalProps {
    productId: number
    open: boolean
    onClose: (res: boolean) => void
}

export const ProductEditModal = ({
    productId,
    open,
    onClose,
}: ProductEditModalProps) => {
    const [product, setProduct] = useState<Product | null>(null)
    const categories = useStore((state) => state.categories);
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isUrlImgValid, setIsUrlImgValid] = useState(false)
    const fetchProduct = useStore((state) => state.fetchProduct);
    const updateProduct = useStore((state) => state.updateProduct);

    const loadProduct = useCallback(async () => {
        setLoading(true);
        const response = await fetchProduct(productId);
        setProduct(response);
        setLoading(false);
    }, [productId, fetchProduct]);

    useEffect(() => {
        if (productId == 0 || !open) return
        loadProduct();
    }, [productId, open, loadProduct])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (product) {
            const updatedProduct = new Product({
                ...product,
                [name]: value,
            })
            setProduct(updatedProduct)
        }
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (product) {
            const updatedProduct = new Product({ ...product, [name]: value });
            setProduct(updatedProduct);
        }
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isUrlImgValid) {
            setIsError(true);
            return;
        }
        setLoading(true)
        setIsError(false)
        updateProduct(product!).then(() => {
            onClose(true)
        })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose(false);
        };
        if (open) document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white text-black rounded-xl shadow-lg max-w-md w-full p-6 relative">
                <h2 className="text-xl font-bold mb-4">Editar Producto</h2>

                {loading ? (
                    <div className="flex items-center justify-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gray-800"></div>
                    </div>
                ) : product ? (
                    <form onSubmit={handleEdit} className="space-y-4">
                        {isError && (
                            <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
                                Hubo un error al guardar los cambios del producto.
                                Valide los campos y vuelva a intentar.
                            </div>
                        )}

                        <InputField label="Título" name="name" value={product.name} onChange={handleChange} type='text' />
                        <InputField label="URL de Imagen" name="imageUrl" value={product.imageUrl} onChange={handleChange} onValidityChange={setIsUrlImgValid} type='url' />
                        <InputField label="Precio" name="price" value={product.price} onChange={handleChange} type="number" />
                        <InputField label="Descripción" name="description" value={product.description} onChange={handleChange} type='text' />
                        
                        <SelectField label="Categoría"
                            name="categoryId"
                            value={product.categoryId}
                            onChange={handleSelectChange}
                            options={categories.map((cat) => ({ label: cat.name, value: cat.id }))} />

                        <div className="flex justify-center gap-4 pt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                onClick={() => onClose(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                ) : (
                    <p className="text-center">No se pudo cargar el producto.</p>
                )}
            </div>
        </div>
    );
}

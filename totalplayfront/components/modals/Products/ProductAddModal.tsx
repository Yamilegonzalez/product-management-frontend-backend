import { useEffect, useState } from 'react'
import { Product } from '@/app/api/models/product/Product'
import { InputField } from '../../ui/InputField'
import { useStore } from '@/stores/useStore'
import { SelectField } from '../../ui/SelectField'

interface ProductEditModalProps {
    open: boolean
    onClose: (success: boolean) => void
}
export const ProductAddModal = ({ open, onClose }: ProductEditModalProps) => {
    const addProduct = useStore((state) => state.addProduct);
    const categories = useStore((state) => state.categories);
    const [product, setProduct] = useState<Product>(new Product({}))
    const [isError, setIsError] = useState(false)
    const [isloading, setIsLoading] = useState(false)
    const [isUrlImgValid, setIsUrlImgValid] = useState(false)

    useEffect(() => {
        setProduct(new Product({}))
    }, [open])

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

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isUrlImgValid) {
            setIsError(true);
            return;
        }
        setIsLoading(true)
        await addProduct(product)
        onClose(true);
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>

                {isError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        Hubo un error al guardar el producto.
                        Valide los campos y vuelva a intentar.
                    </div>
                )}

                <form onSubmit={handleAdd} className="space-y-4">
                    <div>
                        <InputField label='Título del producto' name='name' value={product.name} onChange={handleChange} type='text' />
                    </div>

                    <div>
                        <InputField label='URL de Imagen' name='imageUrl' value={product.imageUrl} onChange={handleChange} type='url' onValidityChange={setIsUrlImgValid} />
                    </div>

                    <div>
                        <InputField label='Precio' name='price' value={product.price} onChange={handleChange} type='number' />
                    </div>

                    <div>
                        <InputField label='Descripción del producto' name='description' value={product.description} onChange={handleChange} type='text' />
                    </div>

                    <div>
                        <SelectField label="Categoría"
                            name="categoryId"
                            value={product.categoryId}
                            onChange={handleSelectChange}
                            options={categories.map((cat) => ({ label: cat.name, value: cat.id }))} />
                    </div>

                    <div className="flex justify-center gap-3 mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            disabled={isloading}
                        >
                            {isloading ? "Guardando..." : "Guardar"}
                        </button>
                        <button
                            type="button"
                            onClick={() => onClose(false)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

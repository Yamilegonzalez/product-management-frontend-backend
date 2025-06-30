import { useCallback, useEffect, useState } from 'react'
import { Product } from '@/app/api/models/product/Product'
import { useStore } from '@/stores/useStore'
import Image from 'next/image'


interface ProductDetailModalProps {
    productId: number
    open: boolean
    onClose: () => void
}

export const ProductDetailModal = ({
    productId,
    open,
    onClose,
}: ProductDetailModalProps) => {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(false)
    const fetchProduct = useStore((state) => state.fetchProduct);

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

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
                <h2 className="text-xl font-bold mb-4">Detalle del producto</h2>

                {loading ? (
                    <div className="flex items-center justify-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gray-800"></div>
                    </div>
                ) : product ? (
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>

                        <div className="flex justify-center">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={0}
                                height={0}
                                className="w-32 h-32 object-cover rounded-full border"
                            />
                        </div>

                        <p>
                            <strong>Precio:</strong> ${product.price}
                        </p>
                        <p>
                            <strong>Descripción:</strong> {product.description}
                        </p>
                        <p>
                            <strong>Categoría:</strong> {product.categoryId}
                        </p>
                    </div>
                ) : (
                    <p>No se pudo cargar el producto.</p>
                )}

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                    ×
                </button>
            </div>
        </div>
    )
}

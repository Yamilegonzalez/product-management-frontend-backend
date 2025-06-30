'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboardLayout'
import { ProductEditModal } from '@/components/modals/Products/ProductEditModal'
import { ProductDetailModal } from '@/components/modals/Products/ProductDetailModal'
import { ProductAddModal } from '@/components/modals/Products/ProductAddModal'
import { useStore } from '@/stores/useStore'
import { ConfirmDialog } from '@/components/modals/ConfirmDialog'
import { Product } from './api/models/product/Product'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const products = useStore((state) => state.products);
  const categoryIdFilter = useStore((state) => state.categoryFilterId);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const sendDeleteProduct = useStore((state) => state.deleteProduct);
  const setCategoryFilter = useStore((state) => state.setCategoryFilterId);
  const [productIdSelected, setProductIdSelected] = useState(0)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isDeleteModalProductOpen, setIsDeleteModalProductOpen] = useState(false)
  const [filtrados, setFiltrados] = useState<Product[]>([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      const nuevos = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltrados(nuevos);
    } else {
      setFiltrados([]);
    }
  }, [products, search]);


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  useEffect(() => {
    if (categoryIdFilter == 0) {
      setFiltrados(products);
      return;
    }
    const nuevosF = products.filter((p) => {
      return p.categoryId == String(categoryIdFilter)
    })
    setFiltrados(nuevosF);
  }, [categoryIdFilter, products])

  const loadData = async () => {
    fetchProducts();
  }

  const viewProduct = async (idProduct: number) => {
    setProductIdSelected(idProduct);
    setIsDetailModalOpen(true);
  }

  const editProduct = async (idProduct: number) => {
    setProductIdSelected(idProduct);
    setIsEditModalOpen(true);
  }

  const deleteProduct = async (idProduct: number) => {
    setProductIdSelected(idProduct);
    setIsDeleteModalProductOpen(true);
  }

  const addProduct = () => {
    setIsNewModalOpen(true);
  }

  const handleDeleteProduct = async () => {
    await sendDeleteProduct(productIdSelected);
    setIsDeleteModalProductOpen(false);
  }

  const closeAndRecharge = (reload: boolean, exec: () => void) => {
    if (reload) {
      loadData();
    }
    exec()
  }

  return (
    <DashboardLayout>
      <header className="bg-[#ff5722] text-white flex items-center justify-between p-4 px-6 rounded-lg shadow mb-6">
        <div className="flex items-center gap-3">
          <Image src="/Logo.jpeg" alt="Logo" width={50} height={50} className="rounded-full shadow-md" />
          <span className="text-4xl font-extrabold text-white tracking-wide">TecnoShop</span>
        </div>


        <div className="flex items-center gap-7">
          <span className="font-extrabold text-2xl text-white tracking-wide " >Hola Julia</span>
          <Image
            src="/profile.jpeg"
            alt="Foto"
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
      </header>

      <ProductEditModal
        productId={productIdSelected}
        open={isEditModalOpen}
        onClose={(res: boolean) => closeAndRecharge(res, () => setIsEditModalOpen(false))} />

      <ProductDetailModal
        productId={productIdSelected}
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <ProductAddModal
        open={isNewModalOpen}
        onClose={(res: boolean) => closeAndRecharge(res, () => setIsNewModalOpen(false))}
      />

      <ConfirmDialog
        open={isDeleteModalProductOpen}
        title='Eliminar producto'
        message='¿Estás seguro de que deseas eliminar este producto?'
        onCancel={() => setIsDeleteModalProductOpen(false)}
        onConfirm={handleDeleteProduct}
      />

      <div className="max-w-9xl mx-auto bg-white border-2 border-[#ff5722]/20 rounded-3xl p-10 shadow-xl space-y-8 mb-28">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800 tracking-wide ">Productos</h2>
          <div className="relative w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Buscar producto..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-base shadow-sm
                text-gray-800 placeholder:text-gray-600
                focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
              value={search}
              onChange={(e) => {
                setCategoryFilter(0);
                setSearch(e.target.value)
              }}
            />
          </div>
        </div>
        {categoryIdFilter != 0 && (
          <span className='' onClick={() => setCategoryFilter(0)}>{categoryIdFilter}</span>
        )}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <li
            key={-1}
            className="border p-50 rounded-xl shadow-md bg-white hover:shadow-lg transition cursor-pointer flex items-center justify-center"
            onClick={addProduct}
          >
            <h1 className="text-8xl font-extrabold text-gray-700">+</h1>
          </li>

          {filtrados.map((prod) => (
            <li
              key={prod.id}
              className="border p-5 rounded-xl shadow-md bg-white hover:shadow-lg transition space-y-2"
            >
              <h3 className="text-xl font-bold text-gray-900">{prod.name}</h3>
              <Image
                src={prod.imageUrl}
                alt={prod.name}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-48 object-cover object-cente"
              />
              <span className={`inline-block bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full`}>
                {prod.category}
              </span>
              <p className="text-lg font-semibold text-[#ff5722]">${prod.price}</p>
              <div className="flex gap-2 pt-4">
                <button
                  className="flex items-center gap-1 text-sm bg-[#ff5722] text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-all duration-200 shadow-sm cursor-pointer"
                  onClick={() => viewProduct(prod.id)}
                >
                  Ver
                </button>
                <button
                  className="flex items-center gap-1 text-sm bg-yellow-400 text-white px-4 py-2 rounded-full hover:bg-yellow-500 transition-all duration-200 shadow-sm cursor-pointer"
                  onClick={() => editProduct(prod.id)}
                >
                  Editar
                </button>
                <button
                  className="flex items-center gap-1 text-sm bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-200 shadow-sm cursor-pointer"
                  onClick={() => deleteProduct(prod.id)}
                >
                  Eliminar
                </button>
              </div>

            </li>
          ))}
        </ul>

        {filtrados.length === 0 && (
          <p className="text-center text-gray-500">No se encontraron productos</p>
        )}
      </div>
    </DashboardLayout>
  )
}


"use client";
import EditProduct from "@/components/dialog/EditProduct";
import Button from "@/components/ui/Button";
import ProductList from "@/components/ProductList";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  modifyProduct,
} from "@/lib/firebase.config";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  code: string;
  name: string;
  quantity: number;
  isActive?: boolean;
}

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const fetchedProducts = await getAllProducts();
    const activeProducts = fetchedProducts.filter(
      (product: Product) => product.isActive !== false
    );
    setProducts(activeProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (product: Product) => {
    if (editProduct) {
      console.log("modif produit", product);
      await modifyProduct(product.id, {
        code: product.code,
        name: product.name,
        quantity: product.quantity,
        isActive: true,
      });
    } else {
      console.log("Ajout nouvouea produit", { ...product, isActive: true });
      const newProduct = { ...product, isActive: true };
      const addedProduct = await addProduct(newProduct);
      setModalOpen(false);
      setEditProduct(null);

      console.log("Fetching products...");
      await fetchProducts();
    }

    const handleEdit = (product: Product) => {
      console.log(">> Editing product...", product);
      setEditProduct(product);
      setModalOpen(true);
    };

    const handleDelete = async (productId: string) => {
      await deleteProduct(productId);
      await fetchProducts();
    };

    return (
      <div>
        <main className="flex flex-1 w-screen h-screen flex-col">
          <h1 className="text-center font-bold text-3xl">GoPharma</h1>
          <div className="p-4 rounded-md border-solid border-1 bg-slate-100 m-4 flex flex-1 flex-col gap-4">
            <h2 className="text-lg font-semibold text-yellow-500">Bienvenue</h2>
            <Button
              title="Nouveau ➕"
              onClick={() => {
                setEditProduct(null);
                setModalOpen(true);
                console.log("Nouveau produit >> ", editProduct);
              }}
              type="primary"
            />
            <ProductList
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {isModalOpen && (
              <EditProduct
                action={editProduct ? "modifier" : "nouveau"}
                product={editProduct || undefined}
                onSave={(product: Product) => handleSave(product)}
                onClose={() => setModalOpen(false)}
              />
            )}
          </div>
        </main>
      </div>
    );
  };
}

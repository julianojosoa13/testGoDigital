"use client";
import React from "react";
import Button from "@/components/ui/Button";

export interface Product {
  id: string;
  code: string;
  name: string;
  quantity: number;
  isActive?: boolean;
}

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const getStatus = (quantity: number) => {
    if (quantity === 0) {
      return { label: "STOCK ÉPUISÉ", color: "text-red-500" };
    } else if (quantity < 5) {
      return { label: "STOCK EN BAISSE", color: "text-orange-500" };
    } else {
      return { label: "PLUSIEURS STOCK", color: "text-green-500" };
    }
  };

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2">Code</th>
          <th className="border border-gray-300 px-4 py-2">Nom</th>
          <th className="border border-gray-300 px-4 py-2">Quantité</th>
          <th className="border border-gray-300 px-4 py-2">Statut</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const status = getStatus(product.quantity);
          return (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {product.code}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.quantity}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${status.color}`}
              >
                {status.label}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center items-center">
                <Button
                  title="Modifier ✏️"
                  type="secondary"
                  onClick={() => onEdit(product)}
                />
                <Button
                  title="Supprimer 🗑️"
                  type="primary"
                  onClick={() => onDelete(product.id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductList;

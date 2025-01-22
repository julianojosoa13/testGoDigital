import React, { JSX, useState } from "react";
import Button from "@/components/ui/Button";

interface Product {
  id: string;
  code: string;
  name: string;
  quantity: number;
}

interface ModalProps {
  action: "nouveau" | "modifier";
  product?: Product;
  onClose: () => void;
  onSave: (data: Product) => Promise<JSX.Element>;
}

const EditProduct: React.FC<ModalProps> = ({
  action,
  product,
  onClose,
  onSave,
}) => {
  const [code, setCode] = useState(
    action === "modifier" ? product?.code || "" : ""
  );
  const [name, setName] = useState(
    action === "modifier" ? product?.name || "" : ""
  );
  const [quantity, setQuantity] = useState(
    action === "modifier" ? product?.quantity || 0 : 0
  );

  const isUnchanged =
    action === "modifier" &&
    product &&
    product.code === code &&
    product.name === name &&
    product.quantity === quantity;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(0, prev + delta));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (action === "nouveau" || (action === "modifier" && !isUnchanged)) {
      const newProduct = {
        code,
        name,
        quantity,
        id: product ? product.id : "",
      };
      console.log("Product Dialog :>> ", newProduct);
      onSave(newProduct);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {action === "nouveau"
            ? "Ajouter un nouveau Medicament"
            : "Modifier un Produit"}
        </h2>
        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={action === "modifier"}
                className={`w-full p-2 border rounded ${
                  action === "modifier" ? "bg-gray-100 text-gray-500" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Libelé du Produit
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantité</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0, +e.target.value))}
                  className="w-16 text-center border rounded"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <Button title="Annuler" type="secondary" onClick={onClose} />
            <Button
              title={action === "nouveau" ? "Ajouter" : "Enregistrer"}
              type="primary"
              onClick={handleSubmit}
              //  disabled={action === "modifier" && isUnchanged}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

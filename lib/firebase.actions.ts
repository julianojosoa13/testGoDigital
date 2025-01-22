import {
  doc,
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase.config";

interface Product {
  code: string;
  name: string;
  quantity: number;
  isActive?: boolean;
}

// Add a new product to the Medicament collection
export const addProduct = async (product: Omit<Product, "id">) => {
  const productsCollection = collection(db, "Medicament");
  const newDoc = doc(productsCollection); // Creates a document with a new unique ID
  await setDoc(newDoc, { ...product, id: newDoc.id });
  return newDoc.id; // Return the ID if needed
};

// Modify an existing product in the Medicament collection
export const modifyProduct = async (
  id: string,
  updatedData: Partial<Product>
): Promise<void> => {
  try {
    const productRef = doc(db, "Medicament", id);
    await updateDoc(productRef, updatedData);
    console.log("Product updated successfully!");
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

// Soft-delete a product by setting isActive to false
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const productRef = doc(db, "Medicament", id);
    await updateDoc(productRef, { isActive: false });
    console.log("Product soft-deleted successfully!");
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

export const getAllProducts = async () => {
  const products: any[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "Medicament"));
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

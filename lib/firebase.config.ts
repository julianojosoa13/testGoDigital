import { initializeApp } from "firebase/app";

import {
  doc,
  updateDoc,
  collection,
  setDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

interface Product {
  id: string;
  code: string;
  name: string;
  quantity: number;
  isActive?: boolean;
}

const firebaseConfig = {
  apiKey: "AIzaSyAM3FosOdo-yVaRU1jK12RbQQU3iaj4ekY",
  authDomain: "gopharma-230d7.firebaseapp.com",
  projectId: "gopharma-230d7",
  storageBucket: "gopharma-230d7.firebasestorage.app",
  messagingSenderId: "193172513145",
  appId: "1:193172513145:web:b26cc76a5f24177b644fa8",
  measurementId: "G-BLNT9V0BX3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const addProduct = async (product: Omit<Product, "id">) => {
  const productsCollection = collection(db, "Medicament");
  const newDoc = doc(productsCollection);
  console.log("enregistrement dans firestore");
  console.log("New Doc >> ", newDoc);
  await setDoc(newDoc, { ...product, id: newDoc.id });
  return newDoc.id;
};

export const modifyProduct = async (
  id: string,
  updatedData: Partial<Product>
): Promise<void> => {
  console.log("Modifications :>>> ", updatedData, id);
  try {
    const productRef = doc(db, "Medicament", id);
    console.log("Product Ref ", productRef);
    await updateDoc(productRef, updatedData);
    console.log("Product updated successfully!");
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

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

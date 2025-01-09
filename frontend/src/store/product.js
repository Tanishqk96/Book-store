import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    // Basic validation before making API request
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      // Check if the response is successful
      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      const data = await res.json();

      // Add the new product to the state if successful
      set((state) => ({
        products: [...state.products, data.data],
      }));

      return { success: true, message: "Product created successfully." };
    } catch (error) {
      console.error("Error creating product:", error.message); // Log error for debugging
      return { success: false, message: "Server error. Please try again." };
    }
  },
}));

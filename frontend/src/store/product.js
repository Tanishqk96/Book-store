import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [], // Store is initialized with an empty array
  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        set({ products: data.data }); // Update state with fetched products
      } else {
        set({ products: [] }); // Handle case where fetch is not successful
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
      set({ products: [] }); // Handle error state
    }
  },
  

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Please fill in all fields.' };
    }
  
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
  
      if (!res.ok) {
        throw new Error('Failed to create product');
      }
  
      const data = await res.json();
      console.log('New product added:', data.data); // Log newly added product
  
      set((state) => ({
        products: [...state.products, data.data], // Add new product to the state
      }));
  
      return { success: true, message: 'Product created successfully.' };
    } catch (error) {
      console.error('Error creating product:', error.message);
      return { success: false, message: 'Server error. Please try again.' };
    }
  },
  
  
  

  deleteProduct: async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  },
}));

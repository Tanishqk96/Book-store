import React, { useState } from "react";
import { useProductStore } from "../store/product";

const Createpage = () => {
  const [newproduct, setnewproduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [productList, setProductList] = useState([]); // Array to hold the products

  const { createProduct } = useProductStore();

  // Function to handle the form submission
  const handleaddproduct = async (e) => {
    e.preventDefault();

    // Convert price to a number before submitting
    const updatedProduct = {
      ...newproduct,
      price: parseFloat(newproduct.price),
    };

    // Log the product to ensure it's being sent correctly
    console.log("Product being sent:", updatedProduct);

    try {
      const { success, message } = await createProduct(updatedProduct);

      if (success) {
        // Update the product list
        const updatedList = [...productList, updatedProduct];
        setProductList(updatedList);

        // Clear the form
        setnewproduct({
          name: "",
          price: "",
          image: "",
        });

        console.log("Updated Product List:", updatedList);
      } else {
        console.error("Failed to create product:", message);
      }
    } catch (error) {
      console.error("Error occurred while creating product:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-600">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleaddproduct}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create New Product
        </h2>

        {/* Input for Product Name */}
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            placeholder="Enter product name"
            value={newproduct.name}
            onChange={(e) =>
              setnewproduct({ ...newproduct, name: e.target.value })
            }
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Input for Product Link */}
        <div className="mb-4">
          <label
            htmlFor="productLink"
            className="block text-sm font-medium text-gray-700"
          >
            Product Link
          </label>
          <input
            id="productLink"
            type="text"
            placeholder="Enter product link"
            value={newproduct.image}
            onChange={(e) =>
              setnewproduct({ ...newproduct, image: e.target.value })
            }
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Input for Product Price */}
        <div className="mb-6">
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Product Price
          </label>
          <input
            id="productPrice"
            type="number"
            placeholder="Enter product price"
            value={newproduct.price}
            onChange={(e) =>
              setnewproduct({ ...newproduct, price: e.target.value })
            }
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default Createpage;

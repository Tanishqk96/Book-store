import React, { useState, useCallback } from "react";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { createProduct } = useProductStore();
  const [product, setProduct] = useState({ name: "", image: "", price: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProduct(product);
      if (response.success) {
        setMessage("Product created successfully!");
        setTimeout(() => {
          setProduct({ name: "", image: "", price: "" }); // Clear form
          navigate("/");  // Navigate back to the homepage after a short delay
        }, 2000);  // Delay for 2 seconds
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage("An error occurred while creating the product.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl mb-4">Create Product</h2>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 mb-4 rounded bg-gray-600 text-black"
          required
        />
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 mb-4 rounded bg-gray-600 text-black"
          required
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Product Price"
          className="w-full p-2 mb-4 rounded bg-gray-600 text-black"
          required
        />
        {message && <p className="text-sm mb-4">{message}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

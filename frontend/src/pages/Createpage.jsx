import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const Createpage = () => {
  const [newproduct, setnewproduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const { createProduct } = useProductStore();

  const handleaddproduct = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...newproduct,
      price: parseFloat(newproduct.price),
    };

    try {
      const { success } = await createProduct(updatedProduct);
      if (success) {
        setnewproduct({
          name: '',
          price: '',
          image: '',
        });
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-600 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <form
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleaddproduct}
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          Create New Product
        </h2>

        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            value={newproduct.name}
            onChange={(e) =>
              setnewproduct({ ...newproduct, name: e.target.value })
            }
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-900"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="productLink"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Product Link
          </label>
          <input
            id="productLink"
            type="text"
            value={newproduct.image}
            onChange={(e) =>
              setnewproduct({ ...newproduct, image: e.target.value })
            }
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-900"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Product Price
          </label>
          <input
            id="productPrice"
            type="number"
            value={newproduct.price}
            onChange={(e) =>
              setnewproduct({ ...newproduct, price: e.target.value })
            }
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default Createpage;

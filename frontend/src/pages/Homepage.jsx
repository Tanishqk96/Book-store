import React, { useEffect } from 'react';
import { useProductStore } from '../store/product';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const { products, fetchProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    fetchProducts(); // Fetch products when the component is mounted
  }, [fetchProducts]);

  useEffect(() => {
    console.log('Products:', products); // Debug log to ensure products are updated
  }, [products]);

  const handleDelete = (productId) => {
    const confirmation = window.confirm('Are you sure you want to delete this product?');
    if (confirmation) {
      deleteProduct(productId);
    }
  };

  // Fallback image for missing or invalid image URLs
  const fallbackImageUrl = 'https://via.placeholder.com/400x400?text=Image+Not+Available';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-600 dark:bg-gray-900 text-white dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Available Products.</h1>
      {products.length > 0 ? (
        <div className="w-4/5 max-w-screen-xl mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center"
                style={{ minWidth: '250px', maxWidth: '350px', height: '420px' }}
              >
                {/* Product Image */}
                <img
                  src={product.image || fallbackImageUrl} // Use fallback if no image URL provided
                  alt={product.name}
                  className="w-full h-[250px] object-cover rounded-lg mb-4"
                  onError={(e) => (e.target.src = fallbackImageUrl)} // Fallback if the image fails to load
                />
                <h3 className="text-lg font-semibold mb-2 text-center text-gray-900 dark:text-gray-200">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">${product.price}</p>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-lg font-medium mb-6">No products found.</p>
          <Link
            to="/create"
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Add Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Homepage;

import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios"

export function PosCards({ addToCart }) {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/product`, {
        headers: {
          Authorization: authHeader
        }
      });
      setProduct(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const totalItems = product.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the range of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = product.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };


const handleProductClick = async (productId) => {
  const selectedProduct = product.find((p) => p.id === productId);

  if (selectedProduct) {
    const quantity = 1; // You can set the initial quantity to any value
    const subtotal = selectedProduct.price * quantity;

    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: quantity,
      subtotal: subtotal
    });

    try {
      // Make an API request to update the product quantity in the backend
      await axios.patch(`${process.env.REACT_APP_URL}/reduce/${productId}`);

      // Now refresh the product data after the stock reduction
      getProduct();
    } catch (error) {
      console.error("Error reducing stock:", error);
      // Handle the error as needed
    }
  }
};
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-6">
        {product.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="relative flex items-end overflow-hidden rounded-xl">
              <img src={product.url} alt='images' />
            </div>

            <div className="mt-1 p-2">
              <h6 className="text-black">Product: {product.name}</h6>
              <p className="mt-1 text-sm text-black">
                Quantity {product.stock_available}
              </p>

              <div className="mt-3 flex items-end justify-between">
                <p>
                  <span className="text-lg font-bold text-orange-500">
                    Price: {product.price}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Stack
        spacing={2}
        mt={4}
        justifyContent="center"
        className="flex justify-center items-center text-red-300"
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={{ color: "red" }}
        />
      </Stack>
    </>
  );
}

export default PosCards;

// Cart.js
import React from "react";

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen bg-white overflow-scroll shadow-md overflow-hidden sm:rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left bg-blue-gray-50 border-b border-blue-gray-100">
                <span className="font-medium text-blue-gray-900">Product</span>
              </th>
              <th className="py-3 px-6 text-left bg-blue-gray-50 border-b border-blue-gray-100">
                <span className="font-medium text-blue-gray-900">Price</span>
              </th>
              <th className="py-3 px-6 text-left bg-blue-gray-50 border-b border-blue-gray-100">
                <span className="font-medium text-blue-gray-900">Quantity</span>
              </th>
              <th className="py-3 px-6 text-left bg-blue-gray-50 border-b border-blue-gray-100">
                <span className="font-medium text-blue-gray-900">
                  Sub Total
                </span>
              </th>
              <th className="py-3 px-6 text-left bg-blue-gray-50 border-b border-blue-gray-100">
                <span className="font-medium text-blue-gray-900">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "even:bg-blue-gray-50/50 text-sm"
                    : "text-sm"
                }
              >
                <td className="py-3 px-6 border-b border-blue-gray-100">
                  <span className="font-normal text-blue-gray-900">
                    {item.name}
                  </span>
                </td>
                <td className="py-3 px-6 border-b border-blue-gray-100">
                  <span className="font-normal text-blue-gray-900">
                    {item.price}
                  </span>
                </td>
                <td className="py-3 px-6 border-b border-blue-gray-100">
                  <span className="font-normal text-blue-gray-900">
                    {item.quantity}
                  </span>
                </td>
                <td className="py-3 px-6 border-b border-blue-gray-100">
                  <span className="font-normal text-blue-gray-900">
                    {item.subtotal}
                  </span>
                </td>
                <td className="py-3 px-6 border-b border-blue-gray-100">
                  <button onClick={() => removeFromCart(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;

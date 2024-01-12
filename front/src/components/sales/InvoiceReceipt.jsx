import React from "react";

const InvoiceReceipt = ({ cartItems, tax, discount, shipping, groundTotal,customer_name,customer_phone }) => {
    
  return (
    <div className="invoice-receipt">
      <div className="invoice-header">
        <h2>Invoice Receipt</h2>
        {/* Add other header information if needed */}
      </div>
      <div className="mb-4 grid grid-cols-2 ">
        <span className="font-bold">Invoice Number:</span>
        <span>{customer_name}</span>
        <span className="font-bold">Cashier:</span>
        <span>{customer_phone}</span>
      </div>
      <div className="cart-items">
        <h3>Cart Items</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="invoice-summary">
        <h3>Order Summary</h3>
        <div className="summary-item">
          <p>Order Tax</p>
          <p>{tax}%</p>
        </div>
        <div className="summary-item">
          <p>Discount</p>
          <p>{discount}%</p>
        </div>
        <div className="summary-item">
          <p>Shipping</p>
          <p>{shipping}</p>
        </div>
        <div className="summary-item">
          <p>Grand Total</p>
          <p>{groundTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceReceipt;
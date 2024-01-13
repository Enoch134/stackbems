import React, { useState, useEffect } from "react";
import { PosCards } from './PosCards';
import Cart from './Cart';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Invoice from "./Invoice";


export function CreateSales() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [selected_items, setSelected_items] = useState("");
  const [charges_description, setCharges_description] = useState("");
  const [sub_total, setSub_total] = useState("");
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [ground_total, setGround_total] = useState(0);
  const [payment_status, setPayment_status] = useState("");
  const [payment_method, setPayment_method] = useState("");
  const [customer_phone, setCustomer_phone] = useState("");
  const [customer_name, setCustomer_name] = useState("");
  const [payment_receive, setPayment_receive] = useState(0);
  const [balance, setBalance] = useState("");
  const [businessId, setBusinessId] = useState("");


  const [customer, setCustomer] = useState([]);
  const [allBusiness, setAllBusiness] = useState([]);

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [saleData, setSaleData] = useState(null);
 
  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/customer`, {
        headers: {
          Authorization: authHeader
        }
      });
      setCustomer(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

useEffect(() => {
  // Convert shipping to a number or default to 0 if not present
  const numericShipping = parseFloat(shipping) || 0;

  // Calculate totalSubtotal
  const totalSubtotal = cartItems.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  // Calculate the total before tax and discount
  const totalBeforeTaxAndDiscount = totalSubtotal;

  // Calculate the discount amount based on the percentage
  const discountAmount = (totalBeforeTaxAndDiscount * discount) / 100;

  // Calculate the total after discount
  const totalAfterDiscount = totalBeforeTaxAndDiscount - discountAmount;

  // Calculate the tax amount based on the percentage of totalAfterDiscount
  const taxAmount = (totalAfterDiscount * tax) / 100;

  // Subtract the tax amount from the total after discount
  const totalAfterTax = totalAfterDiscount - taxAmount;

  // Include shipping in the final ground total
  const finalGroundTotal = totalAfterTax + numericShipping;

  // Update the state variables with the calculated values
  setSub_total(totalSubtotal);
  setGround_total(finalGroundTotal);
}, [cartItems, shipping, discount, tax]);

  
useEffect(() => {
  // Check if payment_receive has a value before calculating the balance
  if (payment_receive !== null && payment_receive !== undefined) {
    // Calculate the balance whenever payment_receive or ground_total changes
    const newBalance = ground_total - payment_receive;
    setBalance(newBalance);
  }
}, [ground_total, payment_receive]);

  

  const saveInventory = async (e) => {
    e.preventDefault();

    // Calculate subTotal
    const subTotal = cartItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    // Calculate the total before tax and discount
    const totalBeforeTaxAndDiscount = subTotal + shipping;

    // Calculate the discount amount based on the percentage
    const discountAmount = (totalBeforeTaxAndDiscount * discount) / 100;

    // Calculate the total after discount
    const totalAfterDiscount = totalBeforeTaxAndDiscount - discountAmount;

    // Calculate the tax amount based on the percentage
    const taxAmount = (totalAfterDiscount * tax) / 100;

    // Calculate the final ground total including tax
    const finalGroundTotal = totalAfterDiscount + taxAmount;

    // Update the state variable with the calculated ground total
    setGround_total(finalGroundTotal);

    // Calculate the balance only if payment_status is "unpaid" or "partial"
    const newBalance =
      payment_status === "unpaid" || payment_status === "partial"
        ? finalGroundTotal - payment_receive
        : 0;
    setBalance(newBalance);

     const itemsArray = selected_items.split(",").map((item) => item.trim());

    try {
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;

      await axios.post(
        `${process.env.REACT_APP_URL}/sale`,
        {
          selected_items: itemsArray,
          sub_total: subTotal,
          tax: taxAmount,
          discount: discountAmount,
          charges_description: charges_description,
          shipping: shipping,
          ground_total: finalGroundTotal,
          payment_status: payment_status,
          payment_method: payment_method,
          customer_phone: customer_phone,
          customer_name: customer_name,
          payment_receive: payment_receive,
          balance: balance,
          businessId: businessId
        },
        {
          headers: {
            Authorization: authHeader
          }
        }
      );

      navigate("/sales");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const addToCart = (product) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Product already exists in the cart, update quantity and subtotal
      const updatedCart = [...cartItems];
      const existingProduct = updatedCart[existingProductIndex];
      existingProduct.quantity += product.quantity;
      existingProduct.subtotal += product.quantity * product.price;

      setCartItems(updatedCart);
    } else {
      // Product is not in the cart, add it with calculated subtotal
      const newProduct = {
        ...product,
        subtotal: product.quantity * product.price
      };

      setCartItems([...cartItems, newProduct]);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const handlePaymentStatusChange = (e) => {
    const selectedPaymentStatus = e.target.value;
    setPayment_status(selectedPaymentStatus);

    // Reset balance and payment receive when payment status changes
    setBalance(0);
    setPayment_receive(0);
  };

 useEffect(() => {
   getAllBusiness();
 }, []);

 const getAllBusiness = async () => {
   const token = localStorage.getItem("token");
   const authHeader = `Bearer ${token}`;

   try {
     const response = await axios.get(`${process.env.REACT_APP_URL}/business`, {
       headers: {
         Authorization: authHeader
       }
     });
     setAllBusiness(response.data);
     console.log(response);
   } catch (error) {
     console.error("Error:", error);
   }
  };
  
  
 

  const logourl = "/img/cjlogo.png";
  return (
    <div className="flex flex-wrap ">
      <section class="w-full lg:w-1/2 py-1 bg-move-900">
        <div class="w-full lg:w-12/12 px-4 mx-auto mt-10">
          <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded-lg bg-gray-100 border-0">
            <div class="rounded-t bg-sky-400 mb-0 px-1 py-1">
              <div class="text-center flex justify-between">
                <h6 class="text-gray-700  font-bold">Create Sale</h6>
              </div>
            </div>
            <div class="flex-auto px-4 lg:px-10 py-10 pt-2">
              <form onSubmit={saveInventory}>
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Items
                      </label>
                      <input
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="choose date"
                        value={selected_items}
                        onChange={(e) => setSelected_items(e.target.value)}
                      />
                    </div>
                    {/* {cartItems.map((item, index) => (
                      <div key={index}>
                         <span className="font-normal text-blue-gray-900 pt-30">
                          {item.name}
                        </span> 
                        <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlfor="grid-password"
                        >
                          Items
                        </label>

                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder={item.name}
                          value={selected_items[item.name] || ""}
                          onChange={(e) => {
                            setSelected_items({
                              ...selected_items,
                              [item.name]: e.target.value
                            });
                          }}
                        />
                      </div>
                    ))}  */}
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="customerDropdown"
                      >
                        Customer Name
                      </label>
                      <select
                        value={customer_name}
                        onChange={(e) => setCustomer_name(e.target.value)}
                        id="customerDropdown"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option value="">Customer Name</option>
                        {customer.map((customer) => (
                          <option key={customer.id} value={customer.name}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="customerDropdown"
                      >
                        Business Name
                      </label>
                      <select
                        value={businessId}
                        onChange={(e) => setBusinessId(e.target.value)}
                        id="customerDropdown"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option value="">Business Name</option>
                        {allBusiness.map((allBusiness) => (
                          <option key={allBusiness.id} value={allBusiness.id}>
                            {allBusiness.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="customerDropdown"
                      >
                        Customer Phone
                      </label>
                      <select
                        value={customer_phone}
                        onChange={(e) => setCustomer_phone(e.target.value)}
                        id="customerDropdown"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option value="">Customer Phone</option>
                        {customer.map((customer) => (
                          <option key={customer.id} value={customer.phone}>
                            {customer.phone}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 
                <section className="w-full lg:w-1/2 py-1 bg-white"> */}
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
                {/* </section> */}

                <hr class="border-b-1 border-white" />
                <div className="w-full flex flex-col justify-end items-end pb-4 pt-4 ">
                  <div className="w-full flex gap-5 items-center bg-white p-3">
                    <p className="text-sm">Order Tax</p>
                    <p className="text-sm">{tax}%</p>
                  </div>
                  <div className="w-full flex gap-2 items-end bg-white p-3">
                    <p className="text-sm">Discount</p>
                    <p className="text-sm">{discount}%</p>
                  </div>
                  <div className="w-full flex gap-5 items-center bg-white p-3">
                    <p className="text-sm">Shipping</p>
                    <p className="text-sm">{shipping}</p>
                  </div>
                  <div className="w-full flex gap-5 items-center bg-white p-3">
                    <p className="text-sm">Grand Total</p>
                    <p className="text-sm">{ground_total}</p>
                  </div>
                </div>

                <div class="flex flex-wrap">
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Tax
                      </label>
                      <input
                        value={tax}
                        onChange={(e) => setTax(e.target.value)}
                        type="number"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="tax"
                      />
                    </div>
                  </div>

                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Discount
                      </label>
                      <input
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Discount"
                      />
                    </div>
                  </div>

                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Shipping
                      </label>
                      <input
                        value={shipping}
                        onChange={(e) => setShipping(e.target.value)}
                        type="number"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Shipping"
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Sub Total
                      </label>
                      <input
                        value={sub_total}
                        onChange={(e) => setSub_total(e.target.value)}
                        type="number"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="sub total"
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Total
                      </label>
                      <input
                        value={ground_total}
                        onChange={(e) => setGround_total(e.target.value)}
                        type="number"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="sub total"
                      />
                    </div>
                  </div>

                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="customerDropdown"
                      >
                        Payment Status
                      </label>
                      <select
                        value={payment_status}
                        onChange={handlePaymentStatusChange}
                        id="customerDropdown"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option value="#">Payment Status</option>
                        <option value="paid">paid</option>
                        <option value="partial">partial</option>
                        <option value="unpaid">unpaid</option>
                      </select>
                    </div>
                  </div>

                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="customerDropdown"
                      >
                        Payment choice
                      </label>
                      <select
                        value={payment_method}
                        onChange={(e) => setPayment_method(e.target.value)}
                        id="customerDropdown"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option value="unitedStates">Payment choice</option>
                        <option value="card">card</option>
                        <option value="cash">cash</option>
                        <option value="others">others</option>
                      </select>
                    </div>
                  </div>

                  {(payment_status === "partial" ||
                    payment_status === "unpaid") && (
                    <>
                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-received-amount"
                          >
                            Received Amount
                          </label>
                          <input
                            type="number"
                            value={payment_receive}
                            onChange={(e) => setPayment_receive(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Received Amount"
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-balance"
                          >
                            Balance
                          </label>
                          <input
                            type="number"
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Balance"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-12/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Note
                      </label>
                      <textarea
                        value={charges_description}
                        onChange={(e) => setCharges_description(e.target.value)}
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        rows="3"
                      >
                        {" "}
                      </textarea>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                >
                  Create Sale
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full lg:w-1/2 py-1 bg-white">
        <PosCards addToCart={addToCart} />
      </section>

      {saleData && (
        <Invoice
          isOpen={isInvoiceOpen}
          setIsOpen={setIsInvoiceOpen}
          invoiceInfo={saleData}
          cartItems={cartItems} // Pass your cart items here
          onAddNextInvoice={() => {
            console.log("Handling next invoice");
            // Implement logic for the next invoice if needed
          }}
        />
      )}
    </div>
  );
}

export default CreateSales;

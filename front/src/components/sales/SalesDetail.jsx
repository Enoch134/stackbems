import React, { useEffect, useState } from "react";
import axios from "axios";
export const SalesDetail = ({ id }) => {
  const [msg, setMsg] = useState("");
  const [selected_items, setSelected_items] = useState([]);
  const [sub_total, setSub_total] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [charges_description, setCharges_description] = useState([]);
  const [ground_total, setGround_total] = useState([]);
  const [payment_status, setPayment_status] = useState([]);
  const [payment_method, setPayment_method] = useState([]);
  const [customer_phone, setCustomer_phone] = useState([]);
  const [customer_name, setCustomer_name] = useState([]);
  const [payment_receive, setPayment_receive] = useState([]);
  const [tax, setTax] = useState([]);
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    const getCustomerById = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(
          `http://localhost:2024/sale/${id}`,
          config
        );

        console.log("Fetched data:", response.data);
        const customerData = response.data;

        setSelected_items(customerData.selected_items);
        setSub_total(customerData.sub_total);
        setShipping(customerData.shipping);
        setDiscount(customerData.discount);
        setCharges_description(customerData.charges_description);
        setGround_total(customerData.ground_total);
        setPayment_status(customerData.payment_status);
        setPayment_method(customerData.payment_method);
        setCustomer_name(customerData.customer_name);
        setCustomer_phone(customerData.customer_phone);
        setTax(customerData.tax);
        setPayment_receive(customerData.payment_receive);
        setBalance(customerData.balance);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    getCustomerById();
  }, [id]);
  
  const logourl = "/img/cjlogo.png";
  return (
    <div fullWidth maxWidth="md" className="max-w-sm mx-auto bg-white p-6">
      <h1 className="text-center text-lg font-bold text-gray-900">
        Sale Detail
      </h1>
      <div className="mt-6  ">
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex w-full justify-between border-t border-black/10 pt-2">
            <span className="font-bold text-gray-600">Items:</span>
            <span className="text-gray-600">{selected_items}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-600">Sub Total:</span>
            <span className="text-gray-600">{sub_total}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-600">Shipping:</span>
            <span className="text-gray-600">{shipping}</span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold text-gray-600">Discount:</span>
            <span className="font-bold text-gray-600">{discount}</span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold text-gray-600">Description:</span>
            <span className="font-bold text-gray-600">
              {charges_description}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold text-gray-600">Total:</span>
            <span className="font-bold text-gray-600">{ground_total}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex w-full justify-between border-t border-black/10 pt-2">
            <span className="font-bold text-gray-600">Status:</span>
            <span className="text-gray-600">{payment_status}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-600">Method:</span>
            <span className="text-gray-600">{payment_method}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-600">Name:</span>
            <span className="text-gray-600">{customer_name}</span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold text-gray-600">Phone:</span>
            <span className="font-bold text-gray-600">{customer_phone}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex w-full justify-between border-t border-black/10 pt-2">
            <span className="font-bold text-gray-600">Tax:</span>
            <span className="text-gray-600">{tax}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-600">Payment Receive:</span>
            <span className="text-gray-600">{payment_receive}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-600">Balance:</span>
            <span className="text-gray-600">{balance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDetail;

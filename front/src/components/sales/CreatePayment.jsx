import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function CreatePayment({ id }) {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const [charges_description, setCharges_description] = useState("");
  const [payment_status, setPayment_status] = useState("");
  const [payment_method, setPayment_method] = useState("");
  const [payment_receive, setPayment_receive] = useState("");
  const [balance, setBalance] = useState("");

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

         setCharges_description(customerData.charges_description);
         setPayment_status(customerData.payment_status);
         setPayment_method(customerData.payment_method);
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

    
  const saveInventory = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;

      await axios.patch(
        `http://localhost:2024/sales/${id}`,
        {
          charges_description: charges_description,
          payment_status: payment_status,
          payment_method: payment_method,
          payment_receive: payment_receive,
          balance: balance,
        },
        {
          headers: {
            Authorization: authHeader
          }
        }
      );

      navigate("/product");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };


  const logourl = "/assets/cjlogo.png";
  return (
    <>
      <div class="min-h-screen p-6 bg-grey-100  flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto ">
          <div>
            <div class="bg-white rounded shadow-2xl p-4 px-4 md:p-8 mb-6 -mt-20">
              <form onSubmit={saveInventory}>
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div class="text-gray-900">
                    <img
                      src={logourl}
                      alt="CJBEM Logo"
                      className="mt-4 mb-2"
                      style={{ maxWidth: "40%", height: "auto" }}
                    />
                    <p class="font-medium text-lg pl-4">Due Payment</p>
                    <p className="pl-4">Please fill out all the fields.</p>
                  </div>

                  <div class="lg:col-span-2">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-2">
                        <label htmlFor="sellingType">Payment Method</label>
                        <select
                          id="sellingType"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 text-gray-600"
                          value={payment_method}
                          onChange={(e) => setPayment_method(e.target.value)}
                        >
                          <option value="">Payment Method</option>
                          <option value="cash">Cash</option>
                          <option value="card">Card</option>
                          <option value="others">Wholesale</option>
                        </select>
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="sellingType">Payment Status</label>
                        <select
                          id="sellingType"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 text-gray-600"
                          value={payment_status}
                          onChange={(e) => setPayment_status(e.target.value)}
                        >
                          <option value="">Payment Status</option>
                          <option value="paid">Paid</option>
                          <option value="unpaid">Unpaid</option>
                          <option value="partial">Partial</option>
                        </select>
                      </div>

                      <div class="md:col-span-5">
                        <label for="email">Payment Receive</label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={payment_receive}
                          onChange={(e) => setPayment_receive(e.target.value)}
                          placeholder="nle 00000"
                        />
                      </div>

                      <div class="md:col-span-3">
                        <label for="address">Balance</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={balance}
                          onChange={(e) => setBalance(e.target.value)}
                          placeholder="enter balance"
                        />
                      </div>
                      <div class="md:col-span-5">
                        <label for="address">Payment Description</label>
                        <textarea
                          type="text"
                          name="address"
                          id="address"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          rows={2}
                          value={charges_description}
                          onChange={(e) => setCharges_description(e.target.value)}
                          placeholder="enter balance"
                        />
                      </div>

                      <div class="md:col-span-5 text-right">
                        <div class="inline-flex items-end">
                          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePayment;

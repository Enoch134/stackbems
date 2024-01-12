import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { Input, Button, Typography } from "@material-tailwind/react";

export function EditBusiness({ id }) {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState("");
    const [userId, setUserId] = useState("");
    const [business_type, setBusiness_type] = useState("");
    const [users, setUsers] = useState([]);
   
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
         `http://localhost:2024/business/${id}`,
         config
       );

       console.log("Fetched data:", response.data);
       const customerData = response.data;

       setName(customerData.name);
       setPhone(customerData.phone);
       setEmail(customerData.email);
       setCountry(customerData.country);
       setDescription(customerData.description);
       setCurrency(customerData.currency);
       setBusiness_type(customerData.business_type);
     } catch (error) {
       if (error.response) {
         setMsg(error.response.data.msg);
       }
     }
   };

   getCustomerById();
 }, [id]);

  
  const updateBusiness = async (e) => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:2024/businesses/${id}`,
        {
          name: name,
          phone: phone,
          email: email,
          country: country,
          currency: currency,
          description: description,
          userId: userId,
          business_type: business_type,
        },
        {
          headers: {
            Authorization: authHeader
          }
        }
      );
      navigate("/allCustomer");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

      useEffect(() => {
        getUsers();
      }, []);

      const getUsers = async () => {
        const token = localStorage.getItem("token");
        const authHeader = `Bearer ${token}`;

        try {
          const response = await axios.get("http://localhost:2024/users", {
            headers: {
              Authorization: authHeader
            }
          });
          setUsers(response.data);
          console.log(response);
        } catch (error) {
          console.error("Error:", error);
        }
      }; 
  const logourl = "/assets/cjlogo.png";
  return (
    <>
      <div class="p-6 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto overflow-y-auto ">
          <div>
            <div class="bg-white brightness-15 rounded shadow-2xl p-4 px-4 md:p-8 mb-6 mt-10">
              <form onSubmit={updateBusiness}>
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <div class="text-gray-900">
                    <img
                      src={logourl}
                      alt="CJBEM Logo"
                      className="mt-4 mb-2"
                      style={{ maxWidth: "40%", height: "auto" }}
                    />
                    <p class="font-medium text-lg pl-4">Update Business</p>
                    <p className="pl-4">Please fill out all the fields.</p>
                    <p className="text-red-600">{msg}</p>
                  </div>

                  <div class="lg:col-span-2">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div class="md:col-span-3 text-gray-900">
                        <label for="full_name"> Name</label>
                        <input
                          type="text"
                          required
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 placeholder-text-gray-900"
                          placeholder="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div class="md:col-span-2 text-gray-900">
                        <label for="full_name">Phone</label>
                        <input
                          type="text"
                          required
                          name="full_name"
                          id="full_name"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 placeholder-text-gray-900"
                          placeholder="232000000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 text-gray-900 ">
                        <label htmlFor="sellingType">Business Type</label>
                        <select
                          id="sellingType"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={business_type}
                          onChange={(e) => setBusiness_type(e.target.value)}
                        >
                          <option value="">Business Type</option>
                          <option value="retailer">Online</option>
                          <option value="wholesale">Wholesale</option>
                        </select>
                      </div>

                      <div class="md:col-span-3 text-gray-900">
                        <label for="city">Business Email</label>
                        <input
                          required
                          type="email"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 placeholder-text-gray-900"
                          placeholder="sample@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div class="md:col-span-2 text-gray-900">
                        <label for="email">Country </label>
                        <input
                          type="text"
                          name="text"
                          id="text"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 placeholder-text-gray-900"
                          placeholder="country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>
                      <div class="md:col-span-3 text-gray-900">
                        <label for="email">Currency </label>
                        <input
                          type="text"
                          name="text"
                          id="text"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 placeholder-text-gray-900"
                          placeholder="SLL"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="sellingType">User</label>
                        <select
                          id="sellingType"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 text-gray-600"
                          value={userId}
                          onChange={(e) => setUserId(e.target.value)}
                        >
                          <option value="">user</option>
                          {users.map((users) => (
                            <option key={users.id} value={users.id}>
                              {users.first_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div class="md:col-span-5 text-gray-900">
                        <label for="city">Description</label>
                        <textarea
                          type="text"
                          name="text"
                          id="text"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 placeholder-text-gray-900"
                          placeholder="description of your business"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div class="md:col-span-5 text-gray-900">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Update Business
                        </button>
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

export default EditBusiness;

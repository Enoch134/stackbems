import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  Input,
  Button,
  Typography
} from "@material-tailwind/react";


export function EditCustomer() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const {id} = useParams()

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [allBusiness, setAllBusiness] = useState([]);


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
        `${process.env.REACT_APP_URL}/customer/${id}`,
        config
      );

      console.log("Fetched data:", response.data);
      const customerData = response.data;

      setName(customerData.name);
      setPhone(customerData.phone);
      setEmail(customerData.email);
      setCountry(customerData.country);
      setAddress(customerData.address);
      setCity(customerData.city);
      setGender(customerData.gender);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  getCustomerById(); 
}, [id]);


   useEffect(() => {
     getAllBusiness();
   }, []);

   const getAllBusiness = async () => {
     const token = localStorage.getItem("token");
     const authHeader = `Bearer ${token}`;

     try {
       const response = await axios.get(
         `${process.env.REACT_APP_URL}/business`,
         {
           headers: {
             Authorization: authHeader
           }
         }
       );
       setAllBusiness(response.data);
       console.log(response);
     } catch (error) {
       console.error("Error:", error);
     }
   };


  const updateCustomer = async (e) => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    e.preventDefault();
    try {
      await axios.patch(
        `${process.env.REACT_APP_URL}/customers/${id}`,
        {
          name: name,
          phone: phone,
          email: email,
          country: country,
          city: city,
          address: address,
          gender: gender,
          businessId:businessId
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

  const logourl = "/assets/cjlogo.png";
  return (
    <>
       <section className="flex items-center justify-center h-screen bg-cover bg-center bg-opacity-100">
        <form onSubmit={updateCustomer}>
          <div class="min-h-screen py-6 flex flex-col justify-center sm:py-11">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
              <div class="relative px-4 py-2 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                <div class="max-w-md mx-auto">
                  <div className="text-center">
                    <img
                      src={logourl}
                      alt="CJBEM Logo"
                      className="mx-auto"
                      style={{ maxWidth: "30%", height: "auto" }}
                    />
                    <Typography variant="h5" className="font-bold  text-black">
                      Create Customer
                    </Typography>
                    <p className="text-red-600">{msg}</p>
                  </div>
                  <div class="divide-y divide-gray-200">
                    <div class="flex items-center space-x-2">
                      <div class="flex flex-col">
                        <label class="leading-loose">Full Name</label>
                        <div class="relative focus-within:text-gray-600 text-gray-400">
                          <input
                            type="text"
                            class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            placeholder="full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="flex flex-col">
                        <label class="leading-loose">Country</label>
                        <div class="relative focus-within:text-gray-600 text-gray-400">
                          <input
                            type="text"
                            class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            placeholder="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="py-2 text-base leading-2 space-y-2 text-gray-700 sm:text-sm sm:leading-7">
                      <div class="flex flex-col">
                        <label class="leading-loose">Email</label>
                        <input
                          type="email"
                          class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="sample@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div class="flex flex-col">
                        <label class="leading-loose">Phone</label>
                        <input
                          type="text"
                          class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="+2320000000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div class="flex items-center space-x-4">
                        <div class="flex flex-col">
                          <label class="leading-loose">Password</label>
                          <div class="relative focus-within:text-gray-600 text-gray-400">
                            <input
                              type="text"
                              class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="city"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <label className="leading-loose">Gender</label>
                          <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          >
                            <option value="" disabled>
                              gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          
                          </select>
                        </div>
                      </div>
                      <div class="flex flex-col">
                        <label class="leading-loose">Address</label>
                        <input
                          type="text"
                          class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>

                      <div className="flex flex-col">
                          <label className="leading-loose">Gender</label>
                          <select
                           value={businessId}
                            onChange={(e) => setBusinessId(e.target.value)}
                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          >
                            <option value="">business</option>
                              {allBusiness.map((allBusiness) => (
                             <option
                               key={allBusiness.id}
                               value={allBusiness.id}
                              >
                              {allBusiness.name}
                               </option>
                               ))}
                          </select>
                        </div>
                    
                    <div class="pt-4 flex items-center space-x-2">
                      <button
                        type="submit"
                        class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditCustomer;

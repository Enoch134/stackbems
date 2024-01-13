import React, { useState, useEffect } from "react";
import axios from "axios";

export const Detail = ({ id }) => {
  const [msg, setMsg] = useState("");

const [name, setName] = useState([]);
const [phone, setPhone] = useState([]);
const [email, setEmail] = useState([]);
const [country, setCountry] = useState([]);
const [description, setDescription] = useState([]);
const [currency, setCurrency] = useState([]);
const [business_type, setBusiness_type] = useState([]);


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
          `${process.env.REACT_APP_URL}/business/${id}`,
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

  const logourl = "/img/cjlogo.png";
  return (
    <div fullWidth maxWidth="md" className="max-w-sm mx-auto bg-white p-6">
      <img
        src={logourl}
        alt="CJBEM Logo"
        className="mx-auto mt-8 mb-2"
        style={{ maxWidth: "20%", height: "auto" }}
      />
      <h1 className="text-center text-lg font-bold text-gray-900">
        Business Detail
      </h1>
      <div className="mt-6  ">
        <div className="mt-6 flex flex-col items-center space-y-2">
          <div className="flex w-full justify-between border-t border-black/10 pt-2">
            <span className="font-bold text-gray-900">Name:</span>
            <span className="text-gray-900">{name}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-900">Phone:</span>
            <span className="text-gray-900">{phone}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-900">Email:</span>
            <span className="text-gray-900">{email}</span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold text-gray-900">Country:</span>
            <span className="font-bold text-gray-900">{country}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex w-full justify-between border-t border-black/10 pt-2">
            <span className="font-bold text-gray-900">Description:</span>
            <span className="text-gray-900">{description}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-900">Currency Type:</span>
            <span className="text-gray-900">{currency}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-900">Bussiness Type:</span>
            <span className="text-gray-900">{business_type}</span>
          </div>
          {/* <div className="flex w-full justify-between">
            <span className="font-bold text-gray-900">Timezone:</span>
            <span className="text-gray-900">{timezone}</span>
          </div> */}
          {/* <div className="flex w-full justify-between">
            <span className="font-bold text-gray-900">Image:</span>
            <span className="text-gray-900">{image}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Detail;

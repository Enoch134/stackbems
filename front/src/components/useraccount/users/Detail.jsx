import React, { useState, useEffect } from "react";
import axios from "axios";

export const Detail = ({ id }) => {
  const [msg, setMsg] = useState("");

  const [first_name, setFirst_name] = useState([]);
  const [last_name, setLast_name] = useState([]);
  const [phone, setPhone] = useState([]);
  const [email, setEmail] = useState([]);
  const [CreatedBy, setCreatedBy] = useState([]);


  useEffect(() => {
    const getUserById = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(
          `http://localhost:2024/user/${id}`,
          config
        );

        console.log("Fetched data:", response.data);
        const customerData = response.data;

        setFirst_name(customerData.first_name);
        setLast_name(customerData.last_name);
        setEmail(customerData.email);
        setPhone(customerData.phone);
        setCreatedBy(customerData.CreatedBy);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    getUserById();
  }, [id]);

  const logourl = "/assets/cjlogo.png";
  return (
    <div fullWidth maxWidth="md" className="max-w-sm mx-auto bg-white p-6">
      <img
        src={logourl}
        alt="CJBEM Logo"
        className="mx-auto mt-8 mb-2"
        style={{ maxWidth: "20%", height: "auto" }}
      />
      <h1 className="text-center text-lg font-bold text-gray-900">
        User Detail
      </h1>
      <div className="mt-6  ">
        <div className="mt-6 flex flex-col items-center space-y-2">
          <div className="flex w-full justify-between border-t border-black/10 pt-2">
            <span className="font-bold text-gray-900">First Name:</span>
            <span className="text-gray-900">{first_name}</span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 pt-2">
            <span className="font-bold text-gray-900">Last Name:</span>
            <span className="text-gray-900">{last_name}</span>
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
            <span className="font-bold text-gray-900">Created By:</span>
            <span className="font-bold text-gray-900">{CreatedBy}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

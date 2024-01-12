import React, { useState, useEffect } from "react";
import axios from "axios";

export const RoleDetail = ({ id }) => {
  const [msg, setMsg] = useState("");

  const [name, setName] = useState([]);
  const [userId, setUserId] = useState([]);
 
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
          `http://localhost:2024/role/${id}`,
          config
        );

        console.log("Fetched data:", response.data);
        const customerData = response.data;

        setName(customerData.name);
        setUserId(customerData.first_name);
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
        Staff Detail
      </h1>
      <div className="mt-6  ">
        <div className="mt-6 flex flex-col items-center space-y-2">
          <div className="flex w-full justify-between border-t border-black/10 pt-2">
            <span className="font-bold text-gray-900"> Name:</span>
            <span className="text-gray-900">{name}</span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 pt-2">
            <span className="font-bold text-gray-900">Last Name:</span>
            <span className="text-gray-900">{userId}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDetail;

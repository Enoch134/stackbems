import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {Typography } from "@material-tailwind/react";


export function EditRoleForm() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);
  const {id} = useParams()

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
   const [users, setUsers] = useState([]);

  const saveUser = async (e) => {
    e.preventDefault();
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/roles/${id}`,
        {
          name: name,
          userId: userId
        },
        {
          headers: {
            Authorization: authHeader
          }
        }
      );
      navigate("/");
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
       const response = await axios.get(`${process.env.REACT_APP_URL}/users`, {
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
           `${process.env.REACT_APP_URL}/role/${id}`,
           config
         );

         console.log("Fetched data:", response.data);
         const customerData = response.data;

         setName(customerData.name);
       } catch (error) {
         if (error.response) {
           setMsg(error.response.data.msg);
         }
       }
     };

     getUserById();
   }, [id]);
  
  
  const logourl = "/img/cjlogo.png";
  return (
    <>
      <section className="flex items-center justify-center h-screen bg-cover bg-center bg-opacity-100">
        <form onSubmit={saveUser}>
          <div class="min-h-screen py-6 flex flex-col justify-center sm:py-11">
            <div class="relative py-3 sm:max-w-2xl sm:mx-auto">
              <div class="relative px-4 py-2 bg-white mx-12 md:mx-0 shadow rounded-3xl sm:p-10">
                <div class="max-w-md mx-auto">
                  <div className="text-center">
                    <img
                      src={logourl}
                      alt="CJBEM Logo"
                      className="mx-auto"
                      style={{ maxWidth: "30%", height: "auto" }}
                    />
                    <Typography variant="h5" className="font-bold  text-black">
                      Create User
                    </Typography>
                    <p className="text-red-600">{msg}</p>
                  </div>
                  <div class="divide-y divide-gray-200">
                    <div class="flex flex-col">
                      <label class="leading-loose">Name</label>
                      <div class="relative focus-within:text-gray-600 text-gray-400">
                        <input
                          type="text"
                          class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="first name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">Gender</label>
                      <select
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      >
                        <option value="">Select a user</option>
                        {users.map((users) => (
                          <option key={users.id} value={users.id}>
                            {users.first_name}
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

export default EditRoleForm;

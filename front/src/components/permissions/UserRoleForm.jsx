import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Input, Button, Typography, Select } from "@material-tailwind/react";
import { getMe } from "../../features/authSlice";

export function UserRoleForm() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([])
 

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
 

  const saveUser = async (e) => {
     const token = localStorage.getItem("token");
     const authHeader = `Bearer ${token}`;
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/role`,
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

  const logourl = "/assets/cjlogo.png";
  return (
    <>
      {/* <section className="flex items-center justify-center h-screen bg-cover bg-center bg-opacity-100">
        <div className="w-full lg:w-3/6 bg-white shadow-2xl -mt-15">
          <form
            onSubmit={saveUser}
            className="mt-8 mb-4 mx-auto w-100 max-w-screen-lg lg:w-2/3  "
          >
            <div className="text-center">
              <img
                src={logourl}
                alt="CJBEM Logo"
                className="mx-auto mt-4 mb-2"
                style={{ maxWidth: "30%", height: "auto" }}
              />
              <p>{user.first_name}</p>
              <Typography
                variant="h5"
                className="font-bold pb-2 pt-2 text-gray-600"
              >
                Create User
              </Typography>
            </div>
            <p className="text-red-600 text-center">{msg}</p>

            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium "
            >
              Role Name
            </Typography>
            <Input
              size="sm"
              type="text"
              required
              autoComplete="name"
              placeholder="first name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none"
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="md:col-span-2">
              <label htmlFor="sellingType">Category</label>
              <select
                id="sellingType"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 text-gray-600"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              >
                <option value="">UserRole</option>
                {users.map((users) => (
                  <option key={users.id} value={users.id}>
                    {users.name}
                  </option>
                ))}
              </select>
            </div>
      

            <Button className="mt-6 bg-blue-800 mb-8" fullWidth type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </section> */}
      <section className="flex items-center justify-center h-screen bg-cover bg-center bg-opacity-100">
        <form onSubmit={saveUser}>
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
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.first_name}
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

export default UserRoleForm;

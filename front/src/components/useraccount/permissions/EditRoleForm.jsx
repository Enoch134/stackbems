import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Input, Button, Typography } from "@material-tailwind/react";
import { getMe } from "../features/authSlice";

export function UserRoleForm() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  const saveUser = async (e) => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/user",
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
      navigate("/allUsers");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const logourl = "/img/cjlogo.png";
  return (
    <>
      <section className="flex items-center justify-center h-screen bg-cover bg-center bg-opacity-100">
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
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              User Name
            </Typography>
            <Input
              size="sm"
              type="text"
              required
              autoComplete="name"
              placeholder="last name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none"
              }}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />

            <Button className="mt-6 bg-blue-800 mb-8" fullWidth type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default UserRoleForm;

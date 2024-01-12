import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Input, Button, Typography } from "@material-tailwind/react";
// import { getMe } from "../features/authSlice";
import { Link } from "react-router-dom";

export function SignUp() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);
  // const createdBy = user && user.first_name;

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [business_name, setBusiness_name] = useState("");
   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const saveUser = async (e) => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:2024/user",
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone: phone,
          password: password,
          confPassword: confPassword,
          business_name: business_name
        },
        {
          headers: {
            Authorization: authHeader
          }
        }
      );
       setShowSuccessMessage(true); 
       setTimeout(() => {
         setShowSuccessMessage(false); 
         navigate("/");
       }, 60000); 
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  // useEffect(() => {
  //   dispatch(getMe());
  // }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  const backgroundImageUrl = "/assets/login.jpg";
  const logourl = "/assets/cjlogo.png";
  return (
    <>
      <section
        className="flex items-center justify-center h-screen bg-cover bg-center bg-opacity-100"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover"
        }}
      >
        <form onSubmit={saveUser}>
          <div class="min-h-screen py-6 flex flex-col justify-center sm:py-11">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
              <div class="relative px-4 py-2 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                <div class="max-w-md mx-auto">
                  <div className="text-center">
                    {showSuccessMessage && (
                      <div className="text-green-500 text-center mt-4">
                        Your registration is successful! Please wait for a while
                        as your account is on review.We'll get back to you soon.
                      </div>
                    )}
                    <img
                      src={logourl}
                      alt="CJBEM Logo"
                      className="mx-auto"
                      style={{ maxWidth: "30%", height: "auto" }}
                    />
                    <Typography variant="h5" className="font-bold  text-black">
                      Sign In
                    </Typography>
                  </div>
                  <div class="divide-y divide-gray-200">
                    <div class="flex items-center space-x-2">
                      <div class="flex flex-col">
                        <label class="leading-loose">First Name</label>
                        <div class="relative focus-within:text-gray-600 text-gray-400">
                          <input
                            type="text"
                            class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            placeholder="first name"
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="flex flex-col">
                        <label class="leading-loose">Last Name</label>
                        <div class="relative focus-within:text-gray-600 text-gray-400">
                          <input
                            type="text"
                            class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            placeholder="last name"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
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
                              type="password"
                              class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="**********"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <div class="flex flex-col">
                          <label class="leading-loose">Confirm Password</label>
                          <div class="relative focus-within:text-gray-600 text-gray-400">
                            <input
                              type="password"
                              class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="**********"
                              value={confPassword}
                              onChange={(e) => setConfPassword(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col">
                        <label class="leading-loose">Business Name</label>
                        <input
                          type="text"
                          class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="unique business name"
                          value={business_name}
                          onChange={(e) => setBusiness_name(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="pt-4 flex items-center space-x-2">
                      <button
                        type="submit"
                        class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                      >
                        Create
                      </button>
                    </div>

                    <Typography
                      variant="paragraph"
                      className="text-center text-blue-gray-500 font-medium mt-4 mb-4 "
                    >
                      Have an Account?
                      <Link to="/" className="text-blue-800 ml-1">
                        Signin
                      </Link>
                    </Typography>
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

export default SignUp;

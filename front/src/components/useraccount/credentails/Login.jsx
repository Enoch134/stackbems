import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LoginUser, reset } from "../../../features/authSlice";
import { Typography } from "@material-tailwind/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = async (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

    const backgroundImageUrl = "/assets/login.jpg";
    const logourl = "/assets/cjlogo.png";

  return (
    <>
      <section
        className="flex gap-4 items-center justify-center h-screen bg-cover bg-center bg-opacity-100  "
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover"
        }}
      >
        <form onSubmit={Auth}>
          <div class="min-h-screen py-6 flex flex-col justify-center sm:py-8">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
              <div class="relative px-4 py-2 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                <div class="max-w-md mx-auto">
                  <div className="text-center">
                    <img
                      src={logourl}
                      alt="CJBEM Logo"
                      className="mx-auto  mb-2"
                      style={{ maxWidth: "30%", height: "auto" }}
                    />
                    <Typography
                      variant="h5"
                      className="font-bold  text-black"
                    >
                      Sign In
                    </Typography>
                    <p className="text-red-600">{message}</p>
                  </div>
                  <div class="divide-y divide-gray-200">
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
                        <label class="leading-loose">Password</label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="*********"
                        />
                      </div>
                    </div>
                    <div class="pt-4 flex items-center space-x-2">
                      <button
                        type="submit"
                        class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                      >
                        Login
                      </button>
                    </div>

                    <Typography
                      variant="paragraph"
                      className="text-center text-blue-gray-500 font-medium mt-4 mb-4 "
                    >
                      No Account?
                      <Link to="/signup" className="text-blue-800 ml-1">
                        create account
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
};

export default Login;

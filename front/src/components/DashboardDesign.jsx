import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import axios from "axios";
import { CRow, CCol, CWidgetStatsA, CCard } from "@coreui/react";
import { MdOutlineInventory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import chart from "../assets/Group 870.png";
import chart2 from "../assets/group2.png";

const DashboardDesign = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

 
  const [allBusiness, setAllBusiness] = useState([]);
  const [sale, setSale] = useState([]);
  const [product, setProduct] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

   
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


  useEffect(() => {
    getAllBusiness();
  }, []);

  const getAllBusiness = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/business", {
        headers: {
          Authorization: authHeader
        }
      });
      setAllBusiness(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getSale();
  }, []);

  const getSale = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/sale", {
        headers: {
          Authorization: authHeader
        }
      });
      setSale(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/product", {
        headers: {
          Authorization: authHeader
        }
      });
      setProduct(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/customer", {
        headers: {
          Authorization: authHeader
        }
      });
      setCustomer(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [expiryProduct, setExpiryProduct] = useState([]);
  useEffect(() => {
    getExpiryProduct();
  }, []);

  const getExpiryProduct = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/expiryProduct", {
        headers: {
          Authorization: authHeader
        }
      });
      setExpiryProduct(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [lowProduct, setLowProduct] = useState([]);
  useEffect(() => {
    getLowProduct();
  }, []);

  const getLowProduct = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/lowProduct", {
        headers: {
          Authorization: authHeader
        }
      });
      setLowProduct(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [dueCustomer, setDueCustomer] = useState([]);
  useEffect(() => {
    getDueCustomer();
  }, []);

  const getDueCustomer = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/dueCustomer", {
        headers: {
          Authorization: authHeader
        }
      });
      setDueCustomer(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [salesPerDay, setSalesPerDay] = useState([]);
  useEffect(() => {
    getSalesPerDay();
  }, []);

  const getSalesPerDay = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/salesPerDay", {
        headers: {
          Authorization: authHeader
        }
      });
      setSalesPerDay(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  // getting the month and the year in the dashboard
  var date = new Date();
  const formatter = new Intl.DateTimeFormat("en", { month: "long" });
  const month1 = formatter.format(new Date());
  const value = date.getFullYear();
  const dateTime = month1 + " " + value;

  return (
    <CCard className="p-4 m-4">
      {/* Total VOICE for Distrubution */}
      <p style={{ fontWeight: "bold" }}>Month: {dateTime}</p>
      <CRow>
        <div>
          <h1 className="text-2xl text-black mb-5 ">Overview</h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
            <div className="relative  rounded-lg shadow-lg">
              <div className="absolute bg-white bg-opacity-50 blur w-full h-fit rounded-lg inset-0"></div>
              <div className="relative z-10 px-2 py-2">
                <div className="cards flex justify-center gap-4 items-center py-5">
                  <MdOutlineInventory size={30} color="green" />
                  <div className="text-center">
                    <p className="text-black">Users</p>
                    <span className="text-l md:text-xl font-bold">
                      {users.length}
                    </span>
                  </div>
                  <img src={chart} alt="" />
                </div>
              </div>
            </div>

            <div className="relative  rounded-lg shadow-lg">
              <div className="absolute bg-white bg-opacity-50 blur w-full h-fit rounded-lg inset-0"></div>
              <div className="relative z-10 px-2 py-2">
                <div className="cards flex justify-center gap-4 items-center py-5">
                  <MdOutlineAdminPanelSettings size={30} color="orange" />
                  <div className="text-center">
                    <p className="text-black">Business</p>
                    <span className="text-l md:text-xl font-bold">
                      {allBusiness.length}
                    </span>
                  </div>
                  <img src={chart2} alt="" />
                </div>
              </div>
            </div>

            <div className="relative  rounded-lg shadow-lg">
              <div className="absolute bg-white bg-opacity-50 blur w-full h-fit rounded-lg inset-0"></div>
              <div className="relative z-10 px-2 py-2">
                <div className="cards flex justify-center gap-4 items-center py-5">
                  <FaUsers size={30} color="blue" />
                  <div className="text-center">
                    <p className="text-black">Customers</p>
                    <span className="text-l md:text-xl font-bold">
                      {customer.length}
                    </span>
                  </div>
                  <img src={chart} alt="" />
                </div>
              </div>
            </div>

            <div className="relative  rounded-lg shadow-lg">
              <div className="absolute bg-white bg-opacity-50 blur w-full h-fit rounded-lg inset-0"></div>
              <div className="relative z-10 px-2 py-2">
                <div className="cards flex justify-center gap-4 items-center py-5">
                  <HiOutlineShoppingCart size={30} color="red" />
                  <div className="text-center">
                    <p className="text-black">Product</p>
                    <span className="text-l md:text-xl font-bold">
                      {product.length}
                    </span>
                  </div>
                  <img src={chart2} alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mt-5">
            <div className="relative  rounded-lg shadow-lg">
              <div className="absolute bg-white bg-opacity-50 blur w-full h-fit rounded-lg inset-0"></div>
              <div className="relative z-10 px-2 py-2">
                <div className="cards flex justify-center gap-4 items-center py-5">
                  <MdOutlineInventory size={30} color="green" />
                  <div className="text-center">
                    <p className="text-black">Sales</p>
                    <span className="text-l md:text-xl font-bold">
                      {sale.length}
                    </span>
                  </div>
                  <img src={chart} alt="" />
                </div>
              </div>
            </div>

            {/* expense cards */}
            <div className="relative  rounded-lg shadow-lg">
              <div className="absolute bg-white bg-opacity-50 blur w-full h-fit rounded-lg inset-0"></div>
              <div className="relative z-10 px-2 py-2">
                <div className="cards flex justify-center gap-4 items-center py-5">
                  <MdOutlineAdminPanelSettings size={30} color="orange" />
                  <div className="text-center">
                    <p className="text-black">Expiry Product</p>
                    <span className="text-l md:text-xl font-bold">
                      {expiryProduct.length}
                    </span>
                  </div>
                  <img src={chart2} alt="" />
                </div>
              </div>
            </div>

            <div className="relative  rounded-lg shadow-lg">
              <div className="absolute bg-white bg-opacity-50 blur w-full h-fit rounded-lg inset-0"></div>
              <div className="relative z-10 px-2 py-2">
                <div className="cards flex justify-center gap-4 items-center py-5">
                  <FaUsers size={30} color="blue" />
                  <div className="text-center">
                    <p className="text-black">Low Product</p>
                    <span className="text-l md:text-xl font-bold">
                      {lowProduct.length}
                    </span>
                  </div>
                  <img src={chart} alt="" />
                </div>
              </div>
            </div>
            <div className="relative rounded-lg shadow-lg">
              <div className="absolute bg-white bg-opacity-50 blur w-full h-24 rounded-lg inset-0"></div>
              <div className="relative z-10 px-2 py-2">
                <div className="cards flex justify-center gap-4 items-center py-2">
                  <FaUsers size={30} color="blue" />
                  <div className="text-center">
                    <p className="text-black">Due Customers</p>
                    <span className="text-l md:text-xl font-bold">
                      {dueCustomer.length}
                    </span>
                  </div>
                  <img src={chart} alt="" />
                </div>
              </div>
            </div>

            <div className="relative rounded-lg shadow-lg mt-5">
              <div className="absolute bg-white bg-opacity-50 blur w-full h-24 rounded-lg inset-0"></div>
              <div className="relative z-10 px-2 py-2">
                <div className="cards flex justify-center gap-4 items-center py-2">
                  <FaUsers size={30} color="blue" />
                  <div className="text-center">
                    <p className="text-black">Sale per day</p>
                    {salesPerDay.map((item, index) => (
                      <div key={index}>
                        <span className="text-l md:text-xl font-bold">
                          {item.totalAmount}
                        </span>
                      </div>
                    ))}
                  </div>
                  <img src={chart} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CRow>
    </CCard>
  );
};

export default DashboardDesign;

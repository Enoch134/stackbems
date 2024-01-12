import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import logo from "../orange_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { FaBars } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import "./Nav.css";
import { MdOutlinePassword, MdSupervisorAccount } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = ({ onSidebarToggle, isSidebarOpen }) => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

    useEffect(() => {
      fetchUserData();
    }, []);

   const fetchUserData = async () => {
     try {
       const token = localStorage.getItem("token");
       const response = await fetch("http://localhost:2024/verify-privileges", {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
         }
       });

       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }

       const result = await response.json();
       setUser(result.user);
       console.log("this is a test", result);
     } catch (error) {
       console.error("User data fetch error:", error);
       // Handle error, e.g., redirect to login page
     }
   };


  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "orange",
        zIndex: 1,
        transition: "height 0.3s",
      }}
    >
      <nav
        className={`navbar is-fixed-top ${isSidebarOpen ? "" : "short-navbar"}`}
        role="navigation"
        aria-label="main navigation"
        style={{ background: "#192655" }}
      >
        <div
          className="navbar-item"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button
            onClick={onSidebarToggle}
            className="button is-light"
            style={{ marginLeft: "250px" }}
          >
            <FaBars />
          </button>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button
                  onClick={logout}
                  className="button is-info"
                  style={{ height: "5vh" }}
                >
                 <span className="text-orange-400">{user && user.first_name + ' ' + user.last_name}</span>

                  <span className="text-danger" style={{ fontSize: "20px", marginLeft:"15px" }}>
                    <AiOutlineLogout  />
                  </span>
                </button>
              </div>
            
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { IoPerson,} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
// import orange from "../Orange_TM_logo.png";
import axios from "axios";
import moment from "moment";
import { TbReportSearch } from "react-icons/tb";
import { FcApprove,FcDepartment } from "react-icons/fc";
import {
  MdRecordVoiceOver,
  Md4GPlusMobiledata,
  MdOutlineLtePlusMobiledata,
  MdPeopleAlt,
  MdOutlineCall,
  MdOutlinePassword,
  MdOutlineLogin,
  MdDashboardCustomize
} from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { SiLevelsdotfyi } from "react-icons/si";
import { AiOutlineMail } from "react-icons/ai";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { TbBusinessplan } from "react-icons/tb";
import { FcSalesPerformance } from "react-icons/fc";
import { TbReportMoney } from "react-icons/tb";
import { AiOutlineStock } from "react-icons/ai";
import { FcExpired } from "react-icons/fc";
import { TbCategoryPlus } from "react-icons/tb";
import { FaFileUpload } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";



const Sidebar = () => {
  const[user, setUser] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [anchorEl3, setAnchorEl3] = useState(null);
    const [anchorEl4, setAnchorEl4] = useState(null);
    const [anchorEl5, setAnchorEl5] = useState(null);
    const [anchorEl6, setAnchorEl6] = useState(null);
    const [anchorEl7, setAnchorEl7] = useState(null);

    const handleClick1 = (event) => {
      setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
      setAnchorEl1(null);
    };

    const handleClick2 = (event) => {
      setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
      setAnchorEl2(null);
    };
  
    const handleClick3 = (event) => {
      setAnchorEl3(event.currentTarget);
    };

    const handleClose3 = () => {
      setAnchorEl3(null);
    };
  
    const handleClick4 = (event) => {
      setAnchorEl4(event.currentTarget);
    };

    const handleClose4 = () => {
      setAnchorEl4(null);
    };
  
    const handleClick5 = (event) => {
      setAnchorEl5(event.currentTarget);
    };

    const handleClose5 = () => {
      setAnchorEl5(null);
    };
  
    const handleClick6 = (event) => {
      setAnchorEl6(event.currentTarget);
    };

    const handleClose6 = () => {
      setAnchorEl6(null);
  };
    const handleClick7 = (event) => {
      setAnchorEl7(event.currentTarget);
    };

    const handleClose7 = () => {
      setAnchorEl7(null);
  };
  
    const handleProfileClick2 = () => {
      navigate("/business");
      handleClose1();
    };
  
    const handleProfileClick1 = () => {
      navigate("/alluser");
      handleClose2();
    };

    const handleProfileClick3 = () => {
      navigate("/allCutomers");
      handleClose3();
    };

   
     const fetchUserData = async () => {
       try {
         const token = localStorage.getItem("token");
         const response = await fetch(
           "https://stackbems.vercel.app/verify-privileges",
           {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
             }
           }
         );

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

     const isAdmin = user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "help" || "custom");
     const hasUserListPrivilege =
       user && user.privileges && user.privileges.flat().includes("dashboards");
  
     const isAdmins = user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
     const hasUserListPrivileges =
       user && user.privileges && user.privileges.flat().includes("users");

  
     const isAuths = user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
     const hasUserList =
       user && user.privileges && user.privileges.flat().includes("permission");

     const issales = user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
     const hasUserListSales =
       user && user.privileges && user.privileges.flat().includes("sales");

     const isInventory = user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
     const hasUserListInventory =
       user && user.privileges && user.privileges.flat().includes("inventory");

     const isreport = user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
     const hasUserListreport =
    user && user.privileges && user.privileges.flat().includes("report");
  
     const iscustomer = user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
     const hasUserListcustomer=
    user && user.privileges && user.privileges.flat().includes("customer");
  
     const isbusiness= user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
     const hasUserListbusiness =
       user && user.privileges && user.privileges.flat().includes("business");


    useEffect(() => {
      fetchUserData();
    }, []);


  const logourl = "/assets/cjlogo.png";
  return (
    <div>
      <aside
        className="menu pl-2 has-shadow"
        style={{
          position: "fixed",
          top: 0,
          left: isSidebarOpen ? 0 : "-180px",
          width: isSidebarOpen ? "200px" : "60px",
          height: "100vh",
          background: "#192655",
          zIndex: 1,
          transition: "left 0.3s, width 0.3s"
        }}
      >
        <div>
          <div style={{ marginTop: "10px", marginLeft:"-28px", paddingLeft:"-20px" }}>
            <p
              to="#"
              className="navbar-item"
              style={{ textDecoration: "none", }}
            >
              <img
                src={logourl}
                alt="CJBEM Logo"
                className="mx-auto  mb-2"
                style={{ maxWidth: "30%", height: "auto" }}
              />
              <p
                style={{
                  paddingLeft: "-10px",
                  // color: "sky",
                  paddingTop: "8px",
                  fontSize: "15px",
                  fontWeight: "bold"
                }}
                className="text-sky-400"
              >
                CJBEMS
              </p>
            </p>
          </div>
          <hr style={{ color: "white", height: "5px" }} />
          {isAdmin && hasUserListPrivilege && (
            <div className="flex items-center">
              <ul className="menu">
                <NavLink
                  to="/dashboard"
                  className="text-move-500 text-sm no-underline flex items-between"
                >
                  <span className="text-yellow-500 text-lg -ml-3 ">
                    <MdDashboardCustomize />
                  </span>
                  <span className="-pt-10 pl-2">Dashboard</span>
                </NavLink>
              </ul>
            </div>
          )}

          {/* users */}
          <div>
            {isAdmins && hasUserListPrivileges && (
              <>
                <Button
                  id="fade-button1"
                  aria-controls={anchorEl1 ? "fade-menu1" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick1}
                  style={{ fontSize: "12px", paddingTop: "2px" }}
                >
                  <span className="text-sky-500 text-lg p-2 -pt-2">
                    <IoPerson />
                  </span>
                  Users Account
                </Button>
                <Menu
                  id="fade-menu1"
                  MenuListProps={{
                    "aria-labelledby": "fade-button1"
                  }}
                  anchorEl={anchorEl1}
                  open={Boolean(anchorEl1)}
                  onClose={handleClose1}
                  TransitionComponent={Fade}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                >
                  <MenuItem onClick={handleProfileClick1}>
                    {" "}
                    <span className="text-sky-500 text-lg p-2">
                      <IoPerson />
                    </span>
                    Users
                  </MenuItem>
                </Menu>
              </>
            )}

            {/* business */}
            {isbusiness && hasUserListbusiness && (
              <>
                <Button
                  id="fade-button2"
                  aria-controls={anchorEl2 ? "fade-menu2" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick2}
                  style={{ fontSize: "12px", padding: "2px" }}
                >
                  <span className="text-sky-500 text-2xl p-2 -pt-2">
                    <TbBusinessplan />
                  </span>
                  Business
                </Button>
                <Menu
                  id="fade-menu2"
                  MenuListProps={{
                    "aria-labelledby": "fade-button2"
                  }}
                  anchorEl={anchorEl2}
                  open={Boolean(anchorEl2)}
                  onClose={handleClose2}
                  TransitionComponent={Fade}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                >
                  <MenuItem onClick={handleProfileClick2}>
                    <span className="text-orange-500 text-lg p-2 ">
                      <TbBusinessplan />
                    </span>
                    All Business
                  </MenuItem>
                </Menu>
              </>
            )}

            {/* customer */}
            {iscustomer && hasUserListcustomer && (
              <>
                <Button
                  id="fade-button3"
                  aria-controls={anchorEl3 ? "fade-menu3" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick3}
                  style={{ fontSize: "12px", padding: "2px" }}
                >
                  <span className="text-green-500 text-2xl p-2 -pt-2">
                    <MdPeopleAlt />
                  </span>
                  Customer
                </Button>
                <Menu
                  id="fade-menu3"
                  MenuListProps={{
                    "aria-labelledby": "fade-button3"
                  }}
                  anchorEl={anchorEl3}
                  open={Boolean(anchorEl3)}
                  onClose={handleClose3}
                  TransitionComponent={Fade}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                >
                  <MenuItem onClick={handleProfileClick3}>
                    <span className="text-yellow-500 text-lg p-2 ">
                      <MdPeopleAlt />
                    </span>
                    All Customer
                  </MenuItem>
                </Menu>
              </>
            )}

            <br />

            {/* sale */}
            {issales && hasUserListSales && (
              <>
                <Button
                  id="fade-button4"
                  aria-controls={anchorEl4 ? "fade-menu4" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick4}
                  style={{ fontSize: "12px", padding: "2px" }}
                >
                  <span className="text-orange-500 text-2xl p-2 -pt-2">
                    <FcSalesPerformance />
                  </span>
                  Sale
                </Button>
                <Menu
                  id="fade-menu4"
                  MenuListProps={{
                    "aria-labelledby": "fade-button4"
                  }}
                  anchorEl={anchorEl4}
                  open={Boolean(anchorEl4)}
                  onClose={handleClose4}
                  TransitionComponent={Fade}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                >
                  <MenuItem onClick={handleClose4}>
                    <NavLink
                      to="/sales"
                      className="text-sky-500 text-sm no-underline flex items-between"
                      activeClassName="active"
                    >
                      <span className="text-sky-500 text-lg ">
                        <AiOutlineStock />
                      </span>
                      <span className="-pt-10 pl-2"> All Sale</span>
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose4}>
                    <NavLink
                      to="/dueCustomers"
                      className="text-sky-500 text-sm no-underline flex items-between"
                      activeClassName="active"
                    >
                      <span className="text-sky-500 text-lg ">
                        <TbBusinessplan />
                      </span>
                      <span className="-pt-10 pl-2">Due Customers</span>
                    </NavLink>
                  </MenuItem>
                </Menu>
              </>
            )}

            {/* authentication */}

            {isAuths && hasUserList && (
              <>
                <Button
                  id="fade-button7"
                  aria-controls={anchorEl7 ? "fade-menu7" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick7}
                  style={{ fontSize: "12px", padding: "2px" }}
                >
                  <span className="text-orange-500 text-2xl p-2 -pt-2">
                    <IoPersonAddSharp />
                  </span>
                  Authentication
                </Button>
                <Menu
                  id="fade-menu7"
                  MenuListProps={{
                    "aria-labelledby": "fade-button4"
                  }}
                  anchorEl={anchorEl7}
                  open={Boolean(anchorEl7)}
                  onClose={handleClose7}
                  TransitionComponent={Fade}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                >
                  <MenuItem onClick={handleClose7}>
                    <NavLink
                      to="/role"
                      className="text-sky-500 text-sm no-underline flex items-between"
                      activeClassName="active"
                    >
                      <span className="text-sky-500 text-lg ">
                        <AiOutlineStock />
                      </span>
                      <span className="-pt-10 pl-2"> Role</span>
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose7}>
                    <NavLink
                      to="/privilege"
                      className="text-sky-500 text-sm no-underline flex items-between"
                      activeClassName="active"
                    >
                      <span className="text-sky-500 text-lg ">
                        <TbBusinessplan />
                      </span>
                      <span className="-pt-10 pl-2">Privilege</span>
                    </NavLink>
                  </MenuItem>
                </Menu>
              </>
            )}

            <br />

            {/* inventory */}
            {isInventory && hasUserListInventory && (
              <>
                <Button
                  id="fade-button5"
                  aria-controls={anchorEl5 ? "fade-menu5" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick5}
                  style={{ fontSize: "12px", padding: "2px" }}
                >
                  <span className="text-sky-500 text-2xl p-2 -pt-2">
                    <TbBusinessplan />
                  </span>
                  Inventory
                </Button>
                <Menu
                  id="fade-menu5"
                  MenuListProps={{
                    "aria-labelledby": "fade-button5"
                  }}
                  anchorEl={anchorEl5}
                  open={Boolean(anchorEl5)}
                  onClose={handleClose5}
                  TransitionComponent={Fade}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                >
                  <MenuItem onClick={handleClose5}>
                    <NavLink
                      to="/products"
                      className="text-sky-500 text-sm no-underline flex items-between"
                      activeClassName="active"
                    >
                      <span className="text-sky-500 text-lg ">
                        <TbBusinessplan />
                      </span>
                      <span className="-pt-10 pl-2">All Product</span>
                    </NavLink>
                  </MenuItem>

                  <MenuItem onClick={handleClose5}>
                    <NavLink
                      to="/lowStock"
                      className="text-sky-500 text-sm no-underline flex items-between"
                      activeClassName="active"
                    >
                      <span className="text-orange-900 text-lg ">
                        <AiOutlineStock />
                      </span>
                      <span className="-pt-10 pl-2">Low Stock</span>
                    </NavLink>
                  </MenuItem>

                  <MenuItem onClick={handleClose5}>
                    <NavLink
                      to="/expiryProduct"
                      className="text-sky-500 text-sm no-underline flex items-between"
                      activeClassName="active"
                    >
                      <span className="text-yellow-500 text-lg ">
                        <FcExpired />
                      </span>
                      <span className="-pt-10 pl-2">Expiry Product</span>
                    </NavLink>
                  </MenuItem>

                  <MenuItem onClick={handleClose5}>
                    <NavLink
                      to="/categories"
                      className=" text-sm no-underline flex items-between"
                      activeClassName="active"
                    >
                      <span className="text-blue-900 text-lg ">
                        <TbCategoryPlus />
                      </span>
                      <span className="-pt-10 pl-2">Category List</span>
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose5}>
                    <NavLink
                      to="/bulk"
                      className=" text-sm no-underline flex items-between"
                      activeClassName="active"
                    >
                      <span className="text-green-900 text-lg ">
                        <FaFileUpload />
                      </span>
                      <span className="-pt-10 pl-2">Bulk Upload</span>
                    </NavLink>
                  </MenuItem>
                </Menu>
              </>
            )}

            <br />

            {/* reports */}
            {isreport && hasUserListreport && (
              <>
                <Button
                  id="fade-button6"
                  aria-controls={anchorEl6 ? "fade-menu6" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick6}
                  style={{ fontSize: "12px", padding: "2px" }}
                >
                  <span className="text-orange-900 text-2xl p-2 -pt-2">
                    <TbReportSearch />
                  </span>
                  Reports
                </Button>
                <Menu
                  id="fade-menu6"
                  MenuListProps={{
                    "aria-labelledby": "fade-button6"
                  }}
                  anchorEl={anchorEl6}
                  open={Boolean(anchorEl6)}
                  onClose={handleClose6}
                  TransitionComponent={Fade}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                >
                  <MenuItem onClick={handleClose6}>
                    <NavLink
                      to="/productReport"
                      className="text-sky-500 text-sm no-underline flex items-between"
                      activeClassName="active"
                    >
                      <span className="text-green-500 text-lg ">
                        <TbReportSearch />
                      </span>
                      <span className="-pt-10 pl-2"> Product Report</span>
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose6}>
                    <NavLink
                      to="/saleReport"
                      className="text-sky-500 text-sm no-underline flex items-between"
                      activeClassName="active"
                    >
                      <span className="text-green-900 text-lg ">
                        <TbReportMoney />
                      </span>
                      <span className="-pt-10 pl-2">Sales Report</span>
                    </NavLink>
                  </MenuItem>
                </Menu>
              </>
            )}

            <div className="flex items-center -ml-6">
              <ul className="menu">
                <Button
                  onClick={logout}
                  className="text-move-500 text-sm no-underline flex items-between "
                >
                  <span className="text-red-900 text-lg ">
                    <AiOutlineLogout />
                  </span>
                  <span className="-pt-10 pl-2">Logout</span>
                </Button>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

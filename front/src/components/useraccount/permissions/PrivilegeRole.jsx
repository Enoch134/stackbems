import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Input, Button, Typography, Select } from "@material-tailwind/react";
import { getMe } from "../features/authSlice";

export function PrivilegeRole() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);
  const [role, setRole] = useState([]);

    const [name, setName] = useState({
      dashboard: false,
      userList: false,
      createUser: false,
      editUser: false,
      viewUser: false,
      deleteUser: false,
      allBusiness: false,
      createBusiness: false,
      editBusiness: false,
      viewBusiness:false,
      deleteBusiness: false
    });
    const [roleId, setRoleId] = useState("");
    
      const handleCheckboxChange = (name) => {
        setName((prevName) => ({
          ...prevName,
          [name]: !prevName[name]
        }));
      };

  const saveUser = async (e) => {
      e.preventDefault();
      const privilegeNames = Object.entries(name)
        .filter(([key, value]) => value)
        .map(([key]) => key);

    try {
      await axios.post("http://localhost:2024/privilege", {
        name: privilegeNames,
        roleId: roleId
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

     useEffect(() => {
       getAllRole();
     }, []);

     const getAllRole = async () => {
       try {
         const response = await axios.get("http://localhost:2024/role");
         setRole(response.data);
         console.log(response.data);
       } catch (error) {
         console.error("Error:", error);
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



  const logourl = "/assets/cjlogo.png";
  return (
    <>
      <section className="flex items-center justify-center  bg-cover bg-center bg-opacity-100">
        <div className="w-full lg:w-3/6 bg-gray-300 shadow-2xl -mt-15">
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

            <div className="md:col-span-2">
              <label htmlFor="sellingType">Category</label>
              <select
                id="sellingType"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 text-gray-600"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
              >
                <option value="">UserRole</option>
                {role.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/* This section contains the RECEIPT Managment */}
            <section className="flex flex-col items-start mt-4  w-full">
              <h3 className="text-xl text-gray-600 mb-5">Dashboard</h3>

              <section className="grid grid-cols-4 gap-4 w-full justify-items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.dashboard}
                    id="dashboard"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("dashboard")}
                  />{" "}
                  <label htmlFor="userList" className="text-gray-600 ">
                    Dashboard
                  </label>
                </div>
              </section>
            </section>
            <section className="flex flex-col items-start mt-4  w-full">
              <h3 className="text-xl text-gray-600 mb-5">Users</h3>

              <section className="grid grid-cols-4 gap-4 w-full justify-items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.userList}
                    id="userList"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("userList")}
                  />{" "}
                  <label htmlFor="userList" className="text-gray-600 ">
                    Detail
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.createUser}
                    id="createUser"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("createUser")}
                  />{" "}
                  <label htmlFor="createUser" className="text-gray-600">
                    Create User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.editUser}
                    id="editUser"
                    className=""
                    onChange={() => handleCheckboxChange("editUser")}
                  />{" "}
                  <label htmlFor="editUser" className="text-gray-600">
                    Edit User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.viewUser}
                    id="viewUser"
                    className=""
                    onChange={() => handleCheckboxChange("viewUser")}
                  />{" "}
                  <label htmlFor="viewUser" className="text-gray-600">
                    View User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.deleteUser}
                    id="deleteUser"
                    className=""
                    onChange={() => handleCheckboxChange("deleteUser")}
                  />{" "}
                  <label htmlFor="CreateReceipt" className="text-gray-600">
                    Delete User
                  </label>
                </div>
              </section>
            </section>

            {/* the section below contains the Sales and Counter Permission */}
            <section className="flex flex-col items-start mt-4  text-gray-600 w-full p-3 rounded">
              <h3 className="text-xl">Business</h3>

              <section className="grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="allBusiness"
                  className=" py-2 px-2 flex gap-2 items-center rounded-sm w-44"
                >
                  <input
                    type="checkbox"
                    checked={name.allBusiness}
                    id="allBusiness"
                    onChange={() => handleCheckboxChange("allBusiness")}
                  />{" "}
                  Business List
                </label>

                <label
                  htmlFor="createBusiness"
                  className=" py-2 px-8 flex gap-2 items-center rounded-sm"
                >
                  <input
                    type="checkbox"
                    checked={name.createBusiness}
                    id="createBusiness"
                    onChange={() => handleCheckboxChange("createBusiness")}
                  />{" "}
                  Create
                </label>

                <label
                  htmlFor="editBusiness"
                  className=" py-2 px-8 flex gap-2 items-center rounded-sm"
                >
                  <input
                    type="checkbox"
                    checked={name.editBusiness}
                    id="editBusiness"
                    onChange={() => handleCheckboxChange("editBusiness")}
                  />{" "}
                  Edit
                </label>

                <label
                  htmlFor="viewBusiness"
                  className=" py-2 px-8 flex gap-2 items-center rounded-sm"
                >
                  <input
                    type="checkbox"
                    checked={name.viewBusiness}
                    id="viewBusiness"
                    onChange={() => handleCheckboxChange("viewBusiness")}
                  />{" "}
                  View
                </label>

                <label
                  htmlFor="deleteBusiness"
                  className=" py-2 px-8 flex gap-2 items-center rounded-sm"
                >
                  <input
                    type="checkbox"
                    checked={name.deleteBusiness}
                    id="deleteBusiness"
                    onChange={() => handleCheckboxChange("deleteBusiness")}
                  />{" "}
                  Delete
                </label>
              </section>
            </section>

            <section className="flex flex-col items-start mt-4  w-full">
              <h3 className="text-xl text-gray-600 mb-5">Sales</h3>

              <section className="grid grid-cols-4 gap-4 w-full justify-items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.userList}
                    id="userList"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("userList")}
                  />{" "}
                  <label htmlFor="userList" className="text-gray-600 ">
                    User List
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.createUser}
                    id="createUser"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("createUser")}
                  />{" "}
                  <label htmlFor="createUser" className="text-gray-600">
                    Create User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.editUser}
                    id="editUser"
                    className=""
                    onChange={() => handleCheckboxChange("editUser")}
                  />{" "}
                  <label htmlFor="editUser" className="text-gray-600">
                    Edit User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.viewUser}
                    id="viewUser"
                    className=""
                    onChange={() => handleCheckboxChange("viewUser")}
                  />{" "}
                  <label htmlFor="viewUser" className="text-gray-600">
                    View User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.deleteUser}
                    id="deleteUser"
                    className=""
                    onChange={() => handleCheckboxChange("deleteUser")}
                  />{" "}
                  <label htmlFor="CreateReceipt" className="text-gray-600">
                    Delete User
                  </label>
                </div>
              </section>
            </section>

            <section className="flex flex-col items-start mt-4  w-full">
              <h3 className="text-xl text-gray-600 mb-5">Customers</h3>

              <section className="grid grid-cols-4 gap-4 w-full justify-items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.userList}
                    id="userList"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("userList")}
                  />{" "}
                  <label htmlFor="userList" className="text-gray-600 ">
                    User List
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.createUser}
                    id="createUser"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("createUser")}
                  />{" "}
                  <label htmlFor="createUser" className="text-gray-600">
                    Create User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.editUser}
                    id="editUser"
                    className=""
                    onChange={() => handleCheckboxChange("editUser")}
                  />{" "}
                  <label htmlFor="editUser" className="text-gray-600">
                    Edit User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.viewUser}
                    id="viewUser"
                    className=""
                    onChange={() => handleCheckboxChange("viewUser")}
                  />{" "}
                  <label htmlFor="viewUser" className="text-gray-600">
                    View User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.deleteUser}
                    id="deleteUser"
                    className=""
                    onChange={() => handleCheckboxChange("deleteUser")}
                  />{" "}
                  <label htmlFor="CreateReceipt" className="text-gray-600">
                    Delete User
                  </label>
                </div>
              </section>
            </section>

            <section className="flex flex-col items-start mt-4  w-full">
              <h3 className="text-xl text-gray-600 mb-5">Inventory</h3>

              <section className="grid grid-cols-4 gap-4 w-full justify-items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.userList}
                    id="userList"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("userList")}
                  />{" "}
                  <label htmlFor="userList" className="text-gray-600 ">
                    User List
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.createUser}
                    id="createUser"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("createUser")}
                  />{" "}
                  <label htmlFor="createUser" className="text-gray-600">
                    Create User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.editUser}
                    id="editUser"
                    className=""
                    onChange={() => handleCheckboxChange("editUser")}
                  />{" "}
                  <label htmlFor="editUser" className="text-gray-600">
                    Edit User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.viewUser}
                    id="viewUser"
                    className=""
                    onChange={() => handleCheckboxChange("viewUser")}
                  />{" "}
                  <label htmlFor="viewUser" className="text-gray-600">
                    View User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.deleteUser}
                    id="deleteUser"
                    className=""
                    onChange={() => handleCheckboxChange("deleteUser")}
                  />{" "}
                  <label htmlFor="CreateReceipt" className="text-gray-600">
                    Delete User
                  </label>
                </div>
              </section>
            </section>

            <section className="flex flex-col items-start mt-4  w-full">
              <h3 className="text-xl text-gray-600 mb-5">Report</h3>

              <section className="grid grid-cols-4 gap-4 w-full justify-items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.userList}
                    id="userList"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("userList")}
                  />{" "}
                  <label htmlFor="userList" className="text-gray-600 ">
                    User List
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.createUser}
                    id="createUser"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("createUser")}
                  />{" "}
                  <label htmlFor="createUser" className="text-gray-600">
                    Create User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.editUser}
                    id="editUser"
                    className=""
                    onChange={() => handleCheckboxChange("editUser")}
                  />{" "}
                  <label htmlFor="editUser" className="text-gray-600">
                    Edit User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.viewUser}
                    id="viewUser"
                    className=""
                    onChange={() => handleCheckboxChange("viewUser")}
                  />{" "}
                  <label htmlFor="viewUser" className="text-gray-600">
                    View User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.deleteUser}
                    id="deleteUser"
                    className=""
                    onChange={() => handleCheckboxChange("deleteUser")}
                  />{" "}
                  <label htmlFor="CreateReceipt" className="text-gray-600">
                    Delete User
                  </label>
                </div>
              </section>
            </section>

            <Button className="mt-6 bg-blue-800 mb-8" fullWidth type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default PrivilegeRole;

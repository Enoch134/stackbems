import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Input, Button, Typography, Select } from "@material-tailwind/react";

export function EditPrivilege() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);
  const [role, setRole] = useState([]);
  const {id} = useParams()

 
    const [name, setName] = useState({
      dashboard: false,
      viewCard: false,
      // user
      detailUser: false,
      addUser: false,
      editUser: false,
      delUser: false,

      // business
      createBusiness: false,
      editBusiness: false,
      DetailBusiness: false,
      delBusiness: false,

      // inventory
      createInvent: false,
      editInvent: false,
      detailInvent: false,
      delInvent: false,

      // customer
      createCustomer: false,
      editCustomer: false,
      detailCustomer: false,
      delCustomer: false,

      // sale
      delSale: false,
      detailSale: false,
      paymentSale: false,
      editSale: false,
      createSale: false,

      // sidebar
      dashboards: false,
      users: false,
      permission: false,
      sales: false,
      inventory: false,
      report: false,
      customer: false,
      business: false
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
    
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;

    try {
      await axios.patch(`${process.env.REACT_APP_URL}/privilege/${id}`, {
        name: privilegeNames,
        roleId: roleId
      }, {
        headers: {
          Authorization:authHeader
        }
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
      const response = await axios.get(`${process.env.REACT_APP_URL}/role`);
      setRole(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

 useEffect(() => {
   const getPrivilegeById = async () => {
     try {
       const token = localStorage.getItem("token");
       const config = {
         headers: {
           Authorization: `Bearer ${token}`
         }
       };

       const response = await axios.get(
         `${process.env.REACT_APP_URL}/privilege/${id}`,
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

   getPrivilegeById();
 }, [id]);

  return (
    <>
      <section className="flex items-center justify-center  bg-cover bg-center bg-opacity-100">
        <div className="w-full lg:w-3/5 bg-white shadow-2xl mt-40">
          <form onSubmit={saveUser} className=" mb-4 mx-auto lg:w-2/3  ">
            <div className="text-center">
              <Typography
                variant="h5"
                className="font-bold pb-2 pt-2 text-gray-600"
              >
                Create Permission
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
            <hr />

            {/* This section contains the dashboard */}
            <section className="flex flex-col items-start mt-1  w-full">
              <h3 className="text-xl text-gray-600 mb-1">Dashboard</h3>
              <hr />

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

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.viewCard}
                    id="viewCard"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("viewCard")}
                  />{" "}
                  <label htmlFor="viewCard" className="text-gray-600 ">
                    View Dashboard
                  </label>
                </div>
              </section>
            </section>

            {/* users */}
            <hr />
            <section className="flex flex-col items-start mt-1  w-full">
              <h3 className="text-xl text-gray-600 mb-1">Users</h3>

              <section className="grid grid-cols-4 gap-4 w-full justify-items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.addUser}
                    id="addUser"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("addUser")}
                  />{" "}
                  <label htmlFor="addUser" className="text-gray-600 ">
                    Create
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.editUser}
                    id="editUser"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("editUser")}
                  />{" "}
                  <label htmlFor="editUser" className="text-gray-600">
                    Edit
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.detailUser}
                    id="detailUser"
                    className=""
                    onChange={() => handleCheckboxChange("detailUser")}
                  />{" "}
                  <label htmlFor="detailUser" className="text-gray-600">
                    Detail
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.delUser}
                    id="delUser"
                    className=""
                    onChange={() => handleCheckboxChange("delUser")}
                  />{" "}
                  <label htmlFor="delUser" className="text-gray-600">
                    Delete
                  </label>
                </div>
              </section>
            </section>
            <hr />

            {/* business */}
            <hr />
            <section className="flex flex-col items-start mt-1  w-full">
              <h3 className="text-xl text-gray-600 mb-1">Business</h3>
              <hr />
              <section className="grid grid-cols-4 gap-4 w-full justify-items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.createBusiness}
                    id="createBusiness"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("createBusiness")}
                  />{" "}
                  <label htmlFor="createBusiness" className="text-gray-600 ">
                    Create
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.editBusiness}
                    id="editBusiness"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("editBusiness")}
                  />{" "}
                  <label htmlFor="editBusiness" className="text-gray-600">
                    Edit
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.DetailBusiness}
                    id="DetailBusiness"
                    className=""
                    onChange={() => handleCheckboxChange("DetailBusiness")}
                  />{" "}
                  <label htmlFor="DetailBusiness" className="text-gray-600">
                    Detail
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.delBusiness}
                    id="delBusiness"
                    className=""
                    onChange={() => handleCheckboxChange("delBusiness")}
                  />{" "}
                  <label htmlFor="delBusiness" className="text-gray-600">
                    Delete
                  </label>
                </div>
              </section>
            </section>

            {/* sales */}
            <hr />
            <section className="flex flex-col items-start mt-1  w-full">
              <h3 className="text-xl text-gray-600 mb-1">Sale</h3>
              <hr />
              <section className="grid grid-cols-4 gap-4 w-full justify-items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.createSale}
                    id="createSale"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("createSale")}
                  />{" "}
                  <label htmlFor="createSale" className="text-gray-600 ">
                    Create
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.editSale}
                    id="editSale"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("editSale")}
                  />{" "}
                  <label htmlFor="editSale" className="text-gray-600">
                    Edit
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.detailSale}
                    id="detailSale"
                    className=""
                    onChange={() => handleCheckboxChange("detailSale")}
                  />{" "}
                  <label htmlFor="detailSale" className="text-gray-600">
                    Detail
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.paymentSale}
                    id="paymentSale"
                    className=""
                    onChange={() => handleCheckboxChange("paymentSale")}
                  />{" "}
                  <label htmlFor="paymentSale" className="text-gray-600">
                    Due
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.delSale}
                    id="delSale"
                    className=""
                    onChange={() => handleCheckboxChange("delSale")}
                  />{" "}
                  <label htmlFor="delSale" className="text-gray-600">
                    Delete
                  </label>
                </div>
              </section>
            </section>

            {/* customer */}
            <hr />
            <section className="flex flex-col items-start mt-1  w-full">
              <h3 className="text-xl text-gray-600 mb-1">Customer</h3>
              <hr />
              <section className="grid grid-cols-4 gap-4 w-full justify-items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.createCustomer}
                    id="createCustomer"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("createCustomer")}
                  />{" "}
                  <label htmlFor="createCustomer" className="text-gray-600 ">
                    Create
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.editCustomer}
                    id="editCustomer"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("editCustomer")}
                  />{" "}
                  <label htmlFor="editCustomer" className="text-gray-600">
                    Edit
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.detailCustomer}
                    id="detailCustomer"
                    className=""
                    onChange={() => handleCheckboxChange("detailCustomer")}
                  />{" "}
                  <label htmlFor="detailCustomer" className="text-gray-600">
                    Detail
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.delCustomer}
                    id="delCustomer"
                    className=""
                    onChange={() => handleCheckboxChange("delCustomer")}
                  />{" "}
                  <label htmlFor="delCustomer" className="text-gray-600">
                    Delete
                  </label>
                </div>
              </section>
            </section>

            {/* inventory */}
            <hr />
            <section className="flex flex-col items-start mt-1  w-full">
              <h3 className="text-xl text-gray-600 mb-1">Inventory</h3>
              <hr />
              <section className="grid grid-cols-4 gap-4 w-full justify-items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.createInvent}
                    id="createInvent"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("createInvent")}
                  />{" "}
                  <label htmlFor="createInvent" className="text-gray-600 ">
                    Create
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.editInvent}
                    id="editInvent"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("editInvent")}
                  />{" "}
                  <label htmlFor="editInvent" className="text-gray-600">
                    Edit
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.detailInvent}
                    id="detailInvent"
                    className=""
                    onChange={() => handleCheckboxChange("detailInvent")}
                  />{" "}
                  <label htmlFor="detailInvent" className="text-gray-600">
                    Detail
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.delInvent}
                    id="delInvent"
                    className=""
                    onChange={() => handleCheckboxChange("delInvent")}
                  />{" "}
                  <label htmlFor="delInvent" className="text-gray-600">
                    Delete
                  </label>
                </div>
              </section>
            </section>

            {/* sidebar permission */}
            <hr />
            <section className="flex flex-col items-start mt-1  w-full">
              <h3 className="text-xl text-gray-600 mb-1">SideBar Permission</h3>
              <hr />
              <section className="grid grid-cols-4 gap-4 w-full justify-items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.dashboards}
                    id="dashboards"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("dashboards")}
                  />{" "}
                  <label htmlFor="dashboards" className="text-gray-600 ">
                    dashboard
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.users}
                    id="users"
                    className="text-gray-600"
                    onChange={() => handleCheckboxChange("users")}
                  />{" "}
                  <label htmlFor="users" className="text-gray-600">
                    User
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.permission}
                    id="permission"
                    className=""
                    onChange={() => handleCheckboxChange("permission")}
                  />{" "}
                  <label htmlFor="permission" className="text-gray-600">
                    Permission
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.sales}
                    id="sales"
                    className=""
                    onChange={() => handleCheckboxChange("sales")}
                  />{" "}
                  <label htmlFor="sales" className="text-gray-600">
                    Sale
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.inventory}
                    id="inventory"
                    className=""
                    onChange={() => handleCheckboxChange("inventory")}
                  />{" "}
                  <label htmlFor="inventory" className="text-gray-600">
                    Inventory
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.report}
                    id="report"
                    className=""
                    onChange={() => handleCheckboxChange("report")}
                  />{" "}
                  <label htmlFor="report" className="text-gray-600">
                    Reports
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.customer}
                    id="customer"
                    className=""
                    onChange={() => handleCheckboxChange("customer")}
                  />{" "}
                  <label htmlFor="customer" className="text-gray-600">
                    Customer
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={name.business}
                    id="business"
                    className=""
                    onChange={() => handleCheckboxChange("business")}
                  />{" "}
                  <label htmlFor="business" className="text-gray-600">
                    Business
                  </label>
                </div>
              </section>
            </section>

            <hr />
            <Button className="mt-6 bg-blue-800 mb-8" fullWidth type="submit">
              Create Permission
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default EditPrivilege;

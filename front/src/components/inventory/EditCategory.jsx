import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function EditCategory({id}) {

   const [name, setName] = useState("");
   const [code, setCode] = useState("");
   const [businessId, setBusinessId] = useState("");
   const [allBusiness, setAllBusiness] = useState([]);
   const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  
  
useEffect(() => {
  const getCustomerById = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get(
        `${process.env.REACT_APP_URL}/category/${id}`,
        config
      );

      console.log("Fetched data:", response.data);
      const customerData = response.data;

      setName(customerData.name);
      setCode(customerData.code);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  getCustomerById();
}, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;

      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/category`,
        {
          name: name,
          code: code,
          businessId: businessId
        },
        {
          headers: {
            Authorization: authHeader
          }
        }
      );

      if (response.status === 201) {
        navigate("/categories");
      }
    } catch (error) {
      console.error("Error creating category:", error.response.data);
      setMsg("Error creating category. Please try again.");
    }
  };

  useEffect(() => {
    getAllBusiness();
  }, []);

  const getAllBusiness = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/business`, {
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
  const logourl = "/img/cjlogo.png";
  return (
    <>
      <section className="flex items-center justify-center h-screen bg-cover bg-center bg-opacity-100">
        <div className="w-full lg:w-3/6 bg-white shadow-2xl -mt-15">
          <form
            onSubmit={handleSubmit}
            className="mt-8 mb-4 mx-auto w-100 max-w-screen-lg lg:w-2/3  "
          >
            <div className="text-center">
              <Typography variant="h5" className="font-bold pb-2 pt-2">
                Create Staff
              </Typography>
            </div>
            <p className="text-red-500 text-center">{msg}</p>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium "
            >
              Name
            </Typography>
            <Input
              size="sm"
              required
              type="text"
              autoComplete="name"
              placeholder="name"
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
              className="mb-2 font-medium "
            >
              Code
            </Typography>
            <Input
              size="sm"
              required
              type="text"
              autoComplete="name"
              placeholder="name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none"
              }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div className="md:col-span-2">
              <label htmlFor="sellingType">Business</label>
              <select
                id="sellingType"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 text-gray-600"
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
              >
                <option value="">business</option>
                {allBusiness.map((allBusiness) => (
                  <option key={allBusiness.id} value={allBusiness.id}>
                    {allBusiness.name}
                  </option>
                ))}
              </select>
            </div>

            <Button className="mt-6 bg-blue-800 mb-8" fullWidth type="submit">
              Create Category
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default EditCategory;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export function EditInventory() {
  const logourl = "/assets/cjlogo.png";
  const {id} = useParams()
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [cost_price, setCost_price] = useState(0);
  const marginPercentage = ((price - cost_price) / cost_price) * 100;

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setMargin(((e.target.value - cost_price) / cost_price) * 100);
  };

  const handleCostPriceChange = (e) => {
    setCost_price(e.target.value);
    setMargin(((price - e.target.value) / e.target.value) * 100);
  };
  const [name, setName] = useState("");
  const [sell_method, setSell_method] = useState("");
  const [margin, setMargin] = useState(0);

  const [new_stock, setNew_stock] = useState(0);
  const [stock_available, setStock_available] = useState("");
  const [tag, setTag] = useState("");
  const [expiry_date, setExpiry_date] = useState("");
  const [batch_no, setBatch_no] = useState("");
  const [tax, setTax] = useState("");
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [variant_name, setVariant_name] = useState("");
  const [low_stock_alert, setLow_stock_alert] = useState("");
  const [expiry_date_alert, setExpiry_date_alert] = useState("");
  const [preview, setPreview] = useState(null);
  const [cateId, setCateId] = useState("");
  const [businessId, setBusinessId] = useState("");

  const [productCategory, setProductCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [allBusiness, setAllBusiness] = useState([]);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
    setUrl(image);
  };

  const saveInventory = async (e) => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("sell_method", sell_method);
    formData.append("margin", marginPercentage);
    formData.append("price", price);
    formData.append("cost_price", cost_price);
    formData.append("new_stock", new_stock);
    formData.append("stock_available", stock_available);
    formData.append("tag", tag);
    formData.append("expiry_date", expiry_date);
    formData.append("batch_no", batch_no);
    formData.append("tax", tax);
    formData.append("variant_name", variant_name);
    formData.append("low_stock_alert", low_stock_alert);
    formData.append("expiry_date_alert", expiry_date_alert);
    formData.append("cateId", cateId);
    formData.append("businessId", businessId);
    formData.append("url", file);

    try {
      await axios.post(`http://localhost:2024/products/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: authHeader
        }
      });

      navigate("/product");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
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
      const response = await axios.get("http://localhost:2024/category", {
        headers: {
          Authorization: authHeader
        }
      });
      setProductCategory(response.data);
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
    const getCustomerById = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        console.log("ID before conversion:", id);
        const response = await axios.get(
          `http://localhost:2024/product/${id}`,
          config
        );

        console.log("Fetched data:", response.data);
        const productData = response.data;

        setName(productData.name);
        setSell_method(productData.sell_method);
        setMargin(productData.margin);
        setCost_price(productData.cost_price);
        setPrice(productData.price);
        setNew_stock(productData.new_stock);
        setStock_available(productData.stock_available);
        setExpiry_date(productData.expiry_date);
        setExpiry_date_alert(productData.expiry_date_alert);
        setBatch_no(productData.batch_no);
        setTax(productData.tax);
        setTag(productData.tag);
        setUrl(productData.url);
        setVariant_name(productData.variant_name);
        setLow_stock_alert(productData.low_stock_alert);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    getCustomerById();
  }, [id]);

  return (
    <>
      <div class="p-6 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto overflow-y-auto ">
          <div>
            <div class="bg-white brightness-15 rounded shadow-2xl p-4 px-4 md:p-8 mb-6 mt-10">
              <form onSubmit={saveInventory}>
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <div class="text-gray-900">
                    <img
                      src={logourl}
                      alt="CJBEM Logo"
                      className="mt-4 mb-2"
                      style={{ maxWidth: "40%", height: "auto" }}
                    />
                    <p class="font-medium text-lg pl-4">Update Product</p>
                    <p className="pl-4">Please fill out all the fields.</p>
                    <p className="text-red-600">{msg}</p>
                  </div>

                  <div class="lg:col-span-2">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div class="md:col-span-3">
                        <label for="full_name" className="text-gray-600">
                          Item Name
                        </label>
                        <input
                          type="text"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-100 placeholder-bg-gray-600"
                          placeholder="item name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="sellingType">Category</label>
                        <select
                          id="sellingType"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 text-gray-600"
                          value={cateId}
                          onChange={(e) => setCateId(e.target.value)}
                        >
                          <option value="">category</option>
                          {productCategory.map((productCategory) => (
                            <option
                              key={productCategory.id}
                              value={productCategory.id.toString()}
                            >
                              {productCategory.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="sellingType">Selling Type</label>
                        <select
                          id="sellingType"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 text-gray-600"
                          value={sell_method}
                          onChange={(e) => setSell_method(e.target.value)}
                        >
                          <option value="">Select Selling Type</option>
                          <option value="retailer">Retailer</option>
                          <option value="wholesale">Wholesale</option>
                        </select>
                      </div>

                      <div class="md:col-span-3">
                        <label for="city">variant Name</label>
                        <input
                          type="text"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-200 placeholder-bg-gray-600"
                          placeholder="variant name"
                          value={variant_name}
                          onChange={(e) => setVariant_name(e.target.value)}
                        />
                      </div>
                      <div class="md:col-span-2">
                        <label for="email">Cost Price </label>
                        <input
                          type="number"
                          name="number"
                          id="email"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-200 placeholder-bg-gray-600"
                          placeholder="enter selling price"
                          value={cost_price}
                          onChange={handleCostPriceChange}
                        />
                      </div>

                      <div class="md:col-span-2">
                        <label for="email">Selling Price </label>
                        <input
                          type="umber"
                          name="number"
                          id="number"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-200 placeholder-bg-gray-600"
                          placeholder="enter purchase price"
                          value={price}
                          onChange={handlePriceChange}
                        />
                      </div>
                      <div class="md:col-span-1">
                        <label for="email">Marign %</label>
                        <input
                          type="number"
                          name="number"
                          id="email"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-200 placeholder-bg-gray-600"
                          placeholder="00%"
                          value={margin}
                          onChange={(e) => setMargin(e.target.value)}
                        />
                      </div>

                      <div class="md:col-span-3">
                        <label for="address">Stock Available</label>
                        <input
                          type="number"
                          name="number"
                          id="number"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-200 placeholder-bg-gray-600"
                          placeholder="total stock"
                          value={stock_available}
                          onChange={(e) => setStock_available(e.target.value)}
                        />
                      </div>
                      <div class="md:col-span-2">
                        <label for="city">New Stock</label>
                        <input
                          type="number"
                          name="number"
                          id="number"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-200 placeholder-bg-gray-600"
                          placeholder="enter the quantity stock"
                          value={new_stock}
                          onChange={(e) => setNew_stock(e.target.value)}
                        />
                      </div>

                      <div class="md:col-span-2">
                        <label for="address" className="text-gray-600">
                          Low Stock alert
                        </label>
                        <input
                          type="number"
                          name="number"
                          id="number"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-200 placeholder-bg-gray-400 text-gray-600"
                          placeholder="low stock"
                          value={low_stock_alert}
                          onChange={(e) => setLow_stock_alert(e.target.value)}
                        />
                      </div>

                      <div class="md:col-span-3">
                        <label for="city" className="text-gray-600">
                          Expiery Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-200 placeholder-bg-gray-400 text-gray-600"
                          placeholder="expiery date"
                          value={expiry_date}
                          onChange={(e) => setExpiry_date(e.target.value)}
                        />
                      </div>

                      <div class="md:col-span-3">
                        <label for="country" className="text-gray-600">
                          Expiery alert
                        </label>
                        <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            type="date"
                            name="date"
                            id="date"
                            value={expiry_date_alert}
                            onChange={(e) =>
                              setExpiry_date_alert(e.target.value)
                            }
                            placeholder="expiery  alert"
                            class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent bg-gray-200 placeholder-bg-gray-600"
                          />
                        </div>
                      </div>

                      <div class="md:col-span-2">
                        <label for="state" className="text-gray-600">
                          Batch No
                        </label>
                        <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            type="number"
                            name="number"
                            id="number"
                            value={batch_no}
                            onChange={(e) => setBatch_no(e.target.value)}
                            placeholder="batch no"
                            class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent bg-gray-200 placeholder-bg-gray-600"
                          />
                        </div>
                      </div>
                      <div class="md:col-span-2">
                        <label for="country" className="text-gray-600">
                          tax
                        </label>
                        <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 ">
                          <input
                            type="number"
                            name="number"
                            id="number"
                            placeholder="tax"
                            value={tax}
                            onChange={(e) => setTax(e.target.value)}
                            class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent bg-gray-200 placeholder-bg-gray-600"
                          />
                        </div>
                      </div>

                      <div class="md:col-span-3">
                        <label for="state" className="text-gray-600">
                          Image
                        </label>
                        <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            type="file"
                            name="url"
                            id="file"
                            accept="image/*"
                            onChange={loadImage}
                            class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent bg-gray-200 placeholder-bg-gray-600"
                          />
                        </div>
                      </div>

                      <div class="md:col-span-2">
                        <label for="text" className="text-gray-600">
                          Tag
                        </label>
                        <input
                          type="text"
                          name="text"
                          id="text"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-200 placeholder-bg-gray-400 text-gray-600"
                          placeholder="tag"
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="sellingType">Category</label>
                        <select
                          id="sellingType"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 text-gray-600"
                          value={businessId}
                          onChange={(e) => setBusinessId(e.target.value)}
                        >
                          <option value="">category</option>
                          {allBusiness.map((allBusiness) => (
                            <option key={allBusiness.id} value={allBusiness.id}>
                              {allBusiness.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div class="md:col-span-5 text-right">
                        <div class="inline-flex items-end">
                          <button
                            type="submit"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditInventory;

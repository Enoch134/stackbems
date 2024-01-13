import React,{useEffect,useState} from "react";
import axios from "axios"
export const Detail = ({id}) => {
 const [msg, setMsg] = useState("");
 const [name, setName] = useState([])
 const [sell_method, setSell_method] = useState([]);
 const [margin, setMargin] = useState([]);
 const [price, setPrice] = useState([]);
 const [cost_price, setCost_price] = useState([]);
 const [new_stock, setNew_stock] = useState([]);
 const [stock_available, setStock_available] = useState([]);
 const [tag, setTag] = useState([]);
 const [expiry_date, setExpiry_date] = useState([]);
 const [expiry_date_alert, setExpiry_date_alert] = useState([]);
 const [batch_no, setBatch_no] = useState([]);
 const [tax, setTax] = useState([]);
 const [url, setUrl] = useState([]);
 const [variant_name, setVariant_name] = useState([]);
 const [low_stock_alert, setLow_stock_alert] = useState([]);
  


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
      `${process.env.REACT_APP_URL}/product/${id}`,
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


     const logourl = "/img/cjlogo.png";
  return (
    <div fullWidth maxWidth="md" className="max-w-sm mx-auto bg-white p-6">
      <h1 className="text-center text-lg font-bold text-gray-900">
        Product Detail
      </h1>
      <div className="mt-6  ">
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex w-full justify-between border-t border-black/10 pt-2">
            <span className="font-bold text-gray-600">Name:</span>
            <span className="text-gray-600">{name}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-600">Method:</span>
            <span className="text-gray-600">{sell_method}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-600">Margin:</span>
            <span className="text-gray-600">{margin}</span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold text-gray-600">Cost Price:</span>
            <span className="font-bold text-gray-600">{cost_price}</span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold text-gray-600">Purchase Price:</span>
            <span className="font-bold text-gray-600">{price}</span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold text-gray-600">New Stock Added:</span>
            <span className="font-bold text-gray-600">{new_stock}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex w-full justify-between border-t border-black/10 pt-2">
            <span className="font-bold text-gray-600">Total Stock:</span>
            <span className="text-gray-600">{stock_available}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-600">Expiry Date:</span>
            <span className="text-gray-600">{expiry_date}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-600">Expiry Date Alert:</span>
            <span className="text-gray-600">{expiry_date_alert}</span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold text-gray-600">Batch:</span>
            <span className="font-bold text-gray-600">{batch_no}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex w-full justify-between border-t border-black/10 pt-2">
            <span className="font-bold text-gray-600">Tax:</span>
            <span className="text-gray-600">{tax}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-600">Tag:</span>
            <span className="text-gray-600">{tag}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-gray-600">Image:</span>
            <span className="text-gray-600 justify-end items-end">
              {" "}
              {url && (
                <img
                  src={url}
                  alt="Product"
                  style={{ maxWidth: "50%", height: "50%", marginLeft:"230px" }}
                />
              )}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold text-gray-600">Variant Name:</span>
            <span className="font-bold text-gray-600">{variant_name}</span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold text-gray-600">Low Stock:</span>
            <span className="font-bold text-gray-600">{low_stock_alert}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

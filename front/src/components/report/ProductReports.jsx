import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons/js/buttons.flash.min.js";
import * as jzip from "jszip";
import "pdfmake";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
window.JSZip = jzip;

export function ProductReports() {
  const [name, setName] = useState("");
 

  const [product, setProduct] = useState([]);
  const [productHistory, setProductHistory] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
 const [user, setUser] = useState(null)

   useEffect(() => {
     getProduct();
     fetchUserData()
   }, []);

   const getProduct = async () => {
     const token = localStorage.getItem("token");
     const authHeader = `Bearer ${token}`;

     try {
       const response = await axios.get(
         `${process.env.REACT_APP_URL}/product`,
         {
           headers: {
             Authorization: authHeader
           }
         }
       );
       setProduct(response.data);
       console.log(response);
     } catch (error) {
       console.error("Error:", error);
     }
  }; 
  
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${process.env.REACT_APP_URL}/verify-privileges`,
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

      const isAdmin = user && user.roles && user.roles.includes("admin");
      const hasUserListPrivilege =
        user && user.privileges && user.privileges.flat().includes("userList");


    

  const saveInventory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;

      const response = await axios.post(
        `${process.env.REACT_APP_URL}/productHistory`,
        {
          name: name
        },
        {
          headers: {
            Authorization: authHeader
          }
        }
      );
      if (response.data) {
        setProductHistory(response.data);
      } else {
        console.error("Response data is empty.");
      }

      $("#stsTokenDisplay").DataTable().destroy();
      $(document).ready(function () {
        $("#stsTokenDisplay").DataTable({
          pagingType: "full_numbers",
          pageLength: 5,
          destroy: true,
          processing: true,
          dom: "Bfrtip",
          buttons: [
            {
              extend: "copy",
              className: "btn-blue"
            },
            {
              extend: "csv",
              className: "btn-green"
            },
            {
              extend: "excel",
              className: "btn-yellow"
            },
            {
              extend: "pdf",
              className: "btn-red"
            },
            {
              extend: "print",
              className: "btn-purple"
            }
          ],
          initComplete: function () {
            // Manually apply Tailwind CSS classes after DataTable initialization is complete
            $(".btn-blue").addClass(
              "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-4 ml-4"
            );
            $(".btn-green").addClass(
              "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            );
            $(".btn-yellow").addClass(
              "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            );
            $(".btn-red").addClass(
              "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            );
            $(".btn-purple").addClass(
              "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            );
          }
        });
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const logourl = "/assets/cjlogo.png";

  return (
    <div>
      <div class="min-h-screen p-6 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto  ">
          <div>
            <div
              class="bg-white rounded shadow-2xl p-4 px-4 md:p-8 mb-6 "
              style={{ marginTop: "-20%" }}
            >
              <form onSubmit={saveInventory}>
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 ">
                  <div class="text-gray-900">
                    <img
                      src={logourl}
                      alt="CJBEM Logo"
                      className="mt-4 mb-2"
                      style={{ maxWidth: "40%", height: "auto" }}
                    />
                    <p class="font-medium text-lg pl-4">Product Report</p>
                    <p className="pl-4">Please fill out all the fields.</p>
                  </div>

                  <div class="lg:col-span-2">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label
                          htmlFor="paymentStatus"
                          className="text-gray-700"
                        >
                          Product Name
                        </label>
                        <select
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          name="paymentStatus"
                          id="paymentStatus"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 text-gray-600"
                        >
                          <option value="">Product Name</option>
                          {product.map((product) => (
                            <option key={product.id} value={product.name}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div class="md:col-span-1">
                        <button
                          type="text"
                          name="city"
                          id="city"
                          class="h-10 border mt-6 rounded px-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* table for report */}
      <div className="shadow-2xl -mt-80">
        <TableContainer component={Paper} >
          <Table
            sx={{ minWidth: 300 }}
            size="small"
            aria-label="a dense table"
            id="stsTokenDisplay"
            className="m-4"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right">No</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Method</TableCell>
                <TableCell align="right">Profit</TableCell>
                <TableCell align="right">Cost Price</TableCell>
                <TableCell align="right">Purchase</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Tax</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Tag</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productHistory.map((productHistory, index) => (
                <TableRow
                  key={productHistory.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{productHistory.name}</TableCell>
                  <TableCell align="left">
                    {productHistory.sell_method}
                  </TableCell>
                  <TableCell align="left">{productHistory.margin}</TableCell>
                  <TableCell align="left">
                    {productHistory.cost_price}
                  </TableCell>
                  <TableCell align="left">{productHistory.price}</TableCell>
                  <TableCell align="left">
                    {productHistory.stock_available}
                  </TableCell>
                  <TableCell align="left">{productHistory.tax}</TableCell>
                  <TableCell align="left">
                    <img
                      src={productHistory.url}
                      alt={productHistory.name}
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                    />
                  </TableCell>
                  <TableCell align="left">{productHistory.tag}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ProductReports;

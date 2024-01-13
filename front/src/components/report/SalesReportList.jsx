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


export function SalesReportList() {
    const [selected_items, setSelected_items] = useState("");
    const [payment_status, setPayment_status] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
  
    const [sale, setSale] = useState([]);
  const [saleReport, setSaleReport] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState()



   useEffect(() => {
     getSale();
     fetchUserData()
   }, []);

   const getSale = async () => {
     const token = localStorage.getItem("token");
     const authHeader = `Bearer ${token}`;

     try {
       const response = await axios.get(`${process.env.REACT_APP_URL}/sale`, {
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

     const itemsArray = selected_items.split(",").map((item) => item.trim());

     try {
       const token = localStorage.getItem("token");
       const authHeader = `Bearer ${token}`;

      const response = await axios.post(
        `${process.env.REACT_APP_URL}/saleReport`,
        {
          selected_items: itemsArray,
          payment_status: payment_status,
          startDate: startDate,
          endDate: endDate
        },
        {
          headers: {
            Authorization: authHeader
          }
        }
      );
      if (response.data) {
          setSaleReport(response.data);
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
                    <p class="font-medium text-lg pl-4">Sales Report</p>
                    <p className="pl-4">Please fill out all the fields.</p>
                  </div>

                  <div class="lg:col-span-2">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label
                          htmlFor="paymentStatus"
                          className="text-gray-700"
                        >
                          Payment Status
                        </label>
                        <select
                          value={selected_items}
                          onChange={(e) => setSelected_items(e.target.value)}
                          name="paymentStatus"
                          id="paymentStatus"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 text-gray-600"
                        >
                          <option value="">Customer Name</option>
                          {sale.map((sale) => (
                            <option key={sale.id} value={sale.selected_items}>
                              {sale.selected_items}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-5">
                        <label
                          htmlFor="paymentStatus"
                          className="text-gray-700"
                        >
                          Payment Status
                        </label>
                        <select
                          value={payment_status}
                          onChange={(e) => setPayment_status(e.target.value)}
                          name="paymentStatus"
                          id="paymentStatus"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 text-gray-600"
                        >
                          <option value="">Status</option>
                          <option value="paid">Paid</option>
                          <option value="unpaid">Unpaid</option>
                          <option value="partial">Partial</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>

                      <div class="md:col-span-2">
                        <label for="address" className="text-gray-700">
                          Start Date
                        </label>
                        <input
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          type="date"
                          name="date"
                          id="address"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-200 text-gray-600"
                        />
                      </div>

                      <div class="md:col-span-2">
                        <label for="city" className="text-gray-700">
                          End Date
                        </label>
                        <input
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          type="date"
                          name="date"
                          id="city"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-200 text-gray-600"
                        />
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
      <Paper elevation={10} className="shadow-2xl bg-white -mt-80 ">
        <TableContainer component={Paper} >
          <Table
            sx={{ minWidth: 800 }}
            size="small"
            aria-label="a dense table"
            id="stsTokenDisplay"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right">No</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Items</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Method</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Payment Receive</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {saleReport.map((saleReport, index) => (
                <TableRow
                  key={saleReport.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {new Date(saleReport.DateCreated).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">
                    {saleReport.selected_items}
                  </TableCell>
                  <TableCell align="left">{saleReport.ground_total}</TableCell>
                  <TableCell align="left">
                    {saleReport.payment_status}
                  </TableCell>
                  <TableCell align="left">
                    {saleReport.payment_method}
                  </TableCell>
                  <TableCell align="left">
                    {saleReport.customer_phone}
                  </TableCell>
                  <TableCell align="left">{saleReport.customer_name}</TableCell>
                  <TableCell align="left">
                    {saleReport.payment_receive}
                  </TableCell>
                  <TableCell align="left">{saleReport.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default SalesReportList;

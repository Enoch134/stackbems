import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from "@mui/material";
import axios from "axios";
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

export const DueCustomers = () => {
const [dueCustomer, setdueCustomer] = useState([]);

   useEffect(() => {
     getdueCustomer();
   }, []);

   const getdueCustomer = async () => {
     const token = localStorage.getItem("token");
     const authHeader = `Bearer ${token}`;

     try {
       const response = await axios.get(
         `${process.env.REACT_APP_URL}/dueCustomer`,
         {
           headers: {
             Authorization: authHeader
           }
         }
       );
       setdueCustomer(response.data);
       console.log(response);
     } catch (error) {
       console.error("Error:", error);
     }
   }; 
  
    
    
     $("#stsTokenDisplay").DataTable().destroy();
     $(document).ready(function () {
       $("#stsTokenDisplay").DataTable({
         pagingType: "full_numbers",
         pageLength: 10,
         destroy: true,
         processing: true,
          // dom: "Bfrtip",
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

  return (
    <div
      className="h-screen bg-move-900 p-5"
    >
      <div
        className="shadow-2xl bg-blue-400"
        // gridColumn="span 8"
        // gridRow="span 2"
        // // backgroundColor={colors.primary[400]}
        // overflow="auto"
      >
        <TableContainer component={Paper}>
          <p
            className="text-center  p-2 text-xl font-bold mb-4"
            variant="h6"
            fontWeight="400"
          >
            Due Customers
          </p>
          <Table id="stsTokenDisplay">
            <TableHead>
              <TableRow>
                <TableCell className="text-blue-950">No</TableCell>
                <TableCell className="text-blue-950">Name</TableCell>
                <TableCell className="text-blue-950">Total</TableCell>
                <TableCell className="text-blue-950">Balance</TableCell>
                <TableCell className="text-blue-950">Customer Name</TableCell>
                <TableCell className="text-blue-950">Customer Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dueCustomer.map((dueCustomer, index) => (
                <TableRow key={dueCustomer.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{dueCustomer.selected_items}</TableCell>
                  <TableCell>{dueCustomer.sub_total}</TableCell>
                  <TableCell>{dueCustomer.balance}</TableCell>
                  <TableCell>{dueCustomer.customer_name}</TableCell>
                  <TableCell>{dueCustomer.customer_phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DueCustomers;

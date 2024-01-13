import React, { useState, useEffect } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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

export const ExpieryDate = () => {
  const [expiryProduct, setExpiryProduct] = useState([])

   useEffect(() => {
     getLowProduct();
   }, []);

     $("#stsTokenDisplays").DataTable().destroy();
     $(document).ready(function () {
       $("#stsTokenDisplays").DataTable({
         pagingType: "full_numbers",
         pageLength: 10,
         destroy: true,
         processing: true
       });
     });
  
   const getLowProduct = async () => {
     const token = localStorage.getItem("token");
     const authHeader = `Bearer ${token}`;

     try {
       const response = await axios.get(
         `${process.env.REACT_APP_URL}/expiryProduct`,
         {
           headers: {
             Authorization: authHeader
           }
         }
       );
       setExpiryProduct(response.data);
       console.log(response);
     } catch (error) {
       console.error("Error:", error);
     }
   }; 

  return (
    <div className="h-screen bg-move-900 p-5">
      <div className="shadow-2xl">
        <TableContainer component={Paper}>
          <p className="text-center text-blue-900 p-2 text-xl font-bold ">
            Exp Product
          </p>
          <Table id="stsTokenDisplays">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Tag</TableCell>
                <TableCell>Expiery Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expiryProduct.map((expiryProduct, index) => (
                <TableRow key={expiryProduct.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{expiryProduct.name}</TableCell>
                  <TableCell>{expiryProduct.tag}</TableCell>
                  <TableCell>{expiryProduct.expiry_date}</TableCell>
                  <TableCell>{expiryProduct.remaining_days}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ExpieryDate;

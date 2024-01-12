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


export const LowStockAlert = () => {
  const [lowProduct, setLowProduct] = useState([])

    useEffect(() => {
      getLowProduct();
    }, []);

    const getLowProduct = async () => {
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;

      try {
        const response = await axios.get(
          "http://localhost:2024/lowProduct",
          {
            headers: {
              Authorization: authHeader
            }
          }
        );
        setLowProduct(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
  }; 
  
      $("#stsTokenDisplays").DataTable().destroy();
      $(document).ready(function () {
        $("#stsTokenDisplays").DataTable({
          pagingType: "full_numbers",
          pageLength: 10,
          destroy: true,
          processing: true
        });
      });

  return (
    <div className="h-screen bg-move-900 p-5">
      <div className="shadow-2xl bg-move-900">
        <TableContainer component={Paper}>
          <p className="text-center text-blue-900 p-2 text-xl font-bold p-2">
            Low Stock
          </p>
          <Table id="stsTokenDisplays">
            <TableHead>
              <TableRow>
                <TableCell className="text-blue-950">No</TableCell>
                <TableCell className="text-blue-950">Name</TableCell>
                <TableCell className="text-blue-950">Quantity</TableCell>
                <TableCell className="text-blue-950">Low Alert</TableCell>
                <TableCell className="text-blue-950">Tag</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lowProduct.map((lowProduct, index) => (
                <TableRow key={lowProduct.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{lowProduct.name}</TableCell>
                  <TableCell>{lowProduct.stock_available}</TableCell>
                  <TableCell>{lowProduct.low_stock_alert}</TableCell>
                  <TableCell>{lowProduct.tag}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default LowStockAlert;

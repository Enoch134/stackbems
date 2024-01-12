import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import StatBox from "./StatBox";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import LowStockAlert from "../components/inventory/LowStockAlert";
import SaleChart from "../components/sales/SaleChart";
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

const Analysis = ({ id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [allBusiness, setAllBusiness] = useState([]);
  const [sale, setSale] = useState([]);
  const [product, setProduct] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    getSale();
  }, []);

  const getSale = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/sale", {
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
      const response = await axios.get("http://localhost:2024/customer", {
        headers: {
          Authorization: authHeader
        }
      });
      setCustomer(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [expiryProduct, setExpiryProduct] = useState([]);
  useEffect(() => {
    getExpiryProduct();
  }, []);

  const getExpiryProduct = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/expiryProduct", {
        headers: {
          Authorization: authHeader
        }
      });
      setExpiryProduct(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [lowProduct, setLowProduct] = useState([]);
  useEffect(() => {
    getLowProduct();
  }, []);

  const getLowProduct = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/lowProduct", {
        headers: {
          Authorization: authHeader
        }
      });
      setLowProduct(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [dueCustomer, setDueCustomer] = useState([]);
  useEffect(() => {
    getDueCustomer();
  }, []);

  const getDueCustomer = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/dueCustomer", {
        headers: {
          Authorization: authHeader
        }
      });
      setDueCustomer(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [salesPerDay, setSalesPerDay] = useState([]);
  useEffect(() => {
    getSalesPerDay();
  }, []);

  const getSalesPerDay = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2024/salesPerDay", {
        headers: {
          Authorization: authHeader
        }
      });
      setSalesPerDay(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };




  const [topSale, setTopSale] = useState([]);
  useEffect(() => {
    getTopSalesPerWeek();
  }, []);

  const getTopSalesPerWeek = async () => {
    try {
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;
      const response = await axios.get("http://localhost:2024/topSale", {
        headers: {
          Authorization: authHeader
        }
      });
      setTopSale(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [topSaleYearly, settopSaleYearly] = useState([]);
  useEffect(() => {
    gettopSaleYearly();
  }, []);

  const gettopSaleYearly = async () => {
    try {
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;
      const response = await axios.get("http://localhost:2024/topSaleYearly", {
        headers: {
          Authorization: authHeader
        }
      });
      settopSaleYearly(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [topSalePerDay, settopSalePerDay] = useState([]);
  useEffect(() => {
    gettopSalePerDay();
  }, []);

  const gettopSalePerDay = async () => {
    try {
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;
      const response = await axios.get("http://localhost:2024/topSalePerDay", {
        headers: {
          Authorization: authHeader
        }
      });
      settopSalePerDay(response.data);
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
      processing: true
    });
  });

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      ></Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={allBusiness.length}
            subtitle="Business Total"
            progress="0.75"
            // increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={sale.length}
            subtitle="Sale Total"
            progress="0.75"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            backgroundColor={colors.primary[400]}
            title={product.length}
            subtitle="Product Total"
            progress="0.50"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={customer.length}
            subtitle="Customer Total"
            progress="0.50"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={lowProduct.length}
            subtitle="Low Stock"
            progress="0.50"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={expiryProduct.length}
            subtitle="Expiry Product"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dueCustomer.length}
            subtitle="Due Customer"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {salesPerDay.map((item, index) => (
            <StatBox
              key={index}
              title={item.totalAmount}
              subtitle="Total Sale Per Day"
              progress="0.50"
              increase="+21%"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          ))}
        </Box> */}

        {/* ROW 2 */}

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          // backgroundColor={colors.primary[400]}
          overflow="auto"
          className="bg-sky-100"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Today Top Sale
            </Typography>
          </Box>
          {topSalePerDay.map((sale, i) => (
            <Box
              key={`${sale.day}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {sale.selected_items}{" "}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {new Date(sale.day).toLocaleDateString()}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>NLE{sale.totalAmount}</Box>
            </Box>
          ))}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          // backgroundColor={colors.primary[400]}
          className="bg-sky-100"
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Weekly Top Sale
            </Typography>
          </Box>
          {topSale.map((sale, i) => (
            <Box
              key={`${sale.week}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {sale.selected_items}{" "}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {new Date(sale.week).toLocaleDateString()}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>NLE{sale.totalAmount}</Box>
            </Box>
          ))}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          // backgroundColor={colors.primary[400]}
          className="bg-sky-100"
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Yearly Top Sale
            </Typography>
          </Box>
          {topSaleYearly.map((sale, i) => (
            <Box
              key={`${sale.year}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {sale.selected_items}{" "}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {new Date(sale.year).toLocaleDateString()}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>NLE{sale.totalAmount}</Box>
            </Box>
          ))}
        </Box>

        <Box gridColumn="span 6" gridRow="span 2" overflow="auto">
          <div
            className="shadow-2xl"
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <TableContainer>
              <p
                className="text-center  p-2 text-xl font-bold mb-4"
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Due Customer
              </p>
              <Table id="stsTokenDisplay">
                <TableHead>
                  <TableRow>
                    {/* <TableCell className="text-blue-950">No</TableCell> */}
                    <TableCell className="text-blue-950">Name</TableCell>
                    <TableCell className="text-blue-950">Total</TableCell>
                    <TableCell className="text-blue-950">Balance</TableCell>
                    <TableCell className="text-blue-950">
                      Customer Name
                    </TableCell>
                    <TableCell className="text-blue-950">
                      Customer Phone
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dueCustomer.map((dueCustomer, index) => (
                    <TableRow key={dueCustomer.id}>
                      {/* <TableCell>{index + 1}</TableCell> */}
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
        </Box>

        <Box gridColumn="span 6" gridRow="span 2" overflow="auto">
          <div
            className="shadow-2xl"
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <LowStockAlert />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Analysis;

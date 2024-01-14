import express from "express";
import {
  getSale,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
  SalesReport,
  getTopSalesPerItemSelectedItemsPerDay,
  getTotalSalesPerDay,
  getTopSalesPerItemSelectedItemsPerWeek,
  getTopSalesPerItemSelectedItemsPerYear,
  getTotalSalesPerMonth,
  getSalesWithPositiveBalance
} from "../controller/Sale.js";
import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();

router.get("/sale",verifyToken, getSale);
router.get("/sale/:id",verifyToken, getSaleById);
router.post("/sale", verifyToken, createSale);
router.post("/saleReport", verifyToken, SalesReport);
router.patch("/sales/:id",verifyToken, updateSale);
router.patch("/sale/:id", verifyToken, deleteSale);

router.get("/topSalePerDay", verifyToken, getTopSalesPerItemSelectedItemsPerDay);
router.get("/salesPerDay", verifyToken, getTotalSalesPerDay);
router.get("/topSale", verifyToken, getTopSalesPerItemSelectedItemsPerWeek);
router.get("/topSaleYearly", verifyToken, getTopSalesPerItemSelectedItemsPerYear);
router.get("/totalSaleYearly", verifyToken, getTotalSalesPerMonth);
router.get("/dueCustomer", verifyToken, getSalesWithPositiveBalance);


export default router;

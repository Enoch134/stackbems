import express from "express";
import {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getStockAvailable,
  getExpiringProducts,
  getLowStockProducts,
  reduceProducts,
  getendSockAvailable,
  getProductHistory,
  
} from "../controller/Product.js";
import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();





router.get("/product",verifyToken, getProduct);
router.get("/expiryProduct", verifyToken, getExpiringProducts);
router.get("/lowProduct", verifyToken, getLowStockProducts);
router.get("/products", verifyToken, getAllProducts);
router.get("/stock", verifyToken, getStockAvailable);
router.get("/stockavailable", getendSockAvailable);
router.get("/product/:id", verifyToken, getProductById);
router.post("/product", verifyToken, createProduct);
router.patch("/products/:id", verifyToken, updateProduct);
router.patch("/reduce/:id",reduceProducts);
router.patch("/product/:id", verifyToken, deleteProduct);

router.post("/productHistory", verifyToken, getProductHistory);

export default router;

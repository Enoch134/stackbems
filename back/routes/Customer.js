import express from "express";
import {
  getCustomer,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from "../controller/Customer.js";
import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();

router.get("/customer", verifyToken, getCustomer);
router.get("/customer/:id", verifyToken, getCustomerById);
router.post("/customer", verifyToken, createCustomer);
router.patch("/customers/:id", verifyToken, updateCustomer);
router.patch("/customer/:id", verifyToken, deleteCustomer);

export default router;

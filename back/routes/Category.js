import express from "express";
import {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controller/Category.js";
import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();

router.get("/category", verifyToken, getCategory);
router.get("/category/:id", verifyToken, getCategoryById);
router.post("/category", verifyToken,createCategory);
router.patch("/categories/:id", verifyToken,updateCategory);
router.patch("/category/:id", verifyToken, deleteCategory);

export default router;

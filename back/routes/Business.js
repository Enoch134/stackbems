import express from "express";
import {
  getBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getBusiness
} from "../controller/Business.js";

import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();

router.get("/business", verifyToken, getBusinesses);
router.get("/businesses/:userId", verifyToken, getBusiness);
router.get("/business/:id", verifyToken, getBusinessById);
router.post("/business", verifyToken, createBusiness);
router.patch("/businesses/:id",verifyToken, updateBusiness);
router.patch("/business/:id", verifyToken,deleteBusiness);

export default router;

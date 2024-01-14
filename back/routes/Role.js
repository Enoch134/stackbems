import express from "express";
import {
  getRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} from "../controller/Role.js";

import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();

router.get("/role", verifyToken, getRole);
router.get("/role/:id", verifyToken, getRoleById);
router.post("/role", verifyToken, createRole);
router.patch("/roles/:id", verifyToken, updateRole);
router.patch("/role/:id", verifyToken, deleteRole);

export default router;

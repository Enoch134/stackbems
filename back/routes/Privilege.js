import express from "express";
import {
  getPrivilege,
  getPrivilegeById,
  createPrivilege,
  updatePrivilege,
  deletePrivilege
} from "../controller/Privilege.js";

import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();


router.get("/privilege", verifyToken, getPrivilege);
router.get("/privilege/:id", verifyToken, getPrivilegeById);
router.post("/privilege", verifyToken, createPrivilege);
router.patch("/privilege/:id", verifyToken, updatePrivilege);
router.patch("/privileges/:id", verifyToken, deletePrivilege);

export default router;

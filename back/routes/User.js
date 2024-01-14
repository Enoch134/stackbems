import express from "express";
import {
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}  from "../controller/User.js";

import { verifyToken, verifyTokenAndPrivileges } from "../middleware/Auth.js";

const router = express.Router()

router.get("/users", verifyToken,getUsers);
router.get("/user", verifyToken,verifyTokenAndPrivileges, getUser);
router.get("/user/:id", verifyToken, verifyTokenAndPrivileges,getUserById);
router.post("/user",createUser);
router.patch("/user/:id", verifyToken,verifyTokenAndPrivileges, updateUser);
router.patch("/users/:id", verifyToken, verifyTokenAndPrivileges,deleteUser);


export default router
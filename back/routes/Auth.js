import Express from "express";
import { Login, logoutUser, Me, UserAccess } from "../controller/Auth.js";
import { verifyToken } from "../middleware/Auth.js";

const router = Express.Router();

router.post("/login", Login);
router.get("/me",  Me);
router.delete("/logout",  logoutUser);
router.get("/verify-privileges", UserAccess);

export default router;

import express from "express";
import {
  deleteUser,
  signOut,
  test,
  updateUser,
} from "../controller/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/sign-out", signOut);

export default router;

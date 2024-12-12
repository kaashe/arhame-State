import express from "express";
import { test } from "../controller/user.controller.js";

const router = express.Router();

router.get("/test", test);
// router.get("/update/:id", updateUser);

export default router;

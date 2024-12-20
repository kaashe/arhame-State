import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createListing,
  deleteListing,
} from "../controller/listing.controller.js";
const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);

export default router;

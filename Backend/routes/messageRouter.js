// Debug route to verify router mounting

import express from "express";
import { sendMessage } from "../controller/messageController.js";
import { getAllMessages } from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

//  route
router.post("/send", sendMessage);

// Get all messages (for admin use only)
router.get("/receive", isAdminAuthenticated, getAllMessages);  // Get all messages (for admin use only, authentication to be added later)

export default router;
import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controller/user.controller.js";

const router = express.Router(); // Create a router instance

router.get("/", protectRoute, getUsersForSidebar); // Define the route

export default router; // Export the router instance

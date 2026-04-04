import express from "express";
import { getNearbyHospitals } from "../controllers/hospital.controller.js";

const router = express.Router();

// GET /api/v1/hospitals?lat=28.7041&lng=77.1025
router.route("/").get(getNearbyHospitals);

export default router;
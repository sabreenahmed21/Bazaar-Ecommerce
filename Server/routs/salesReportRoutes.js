import express from "express";
import { getSales, getSalesReportByProductId } from "../controllers/salesReportController.js";

const router = express.Router();


router.route("/sales/:productId").get(getSalesReportByProductId);
router.route("/get-sales").get(getSales);
export default router;

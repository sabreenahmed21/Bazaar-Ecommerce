import express from "express";
const router = express.Router();
import { protect } from "../controllers/authController.js";
import {createPaymentIntent, sendStripeApikey} from "../controllers/paymentController.js";

router.route("/payment/process").post(protect,  createPaymentIntent);
router.route("/stripeApikey").get(sendStripeApikey);


export default router;
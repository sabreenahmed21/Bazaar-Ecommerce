import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  updateOrders,
} from "../controllers/orderController.js";
const router = express.Router();
import { authorizeRoles, protect } from "../controllers/authController.js";

router.route("/order/new").post(protect, createOrder);
router.route("/orders").get(protect, myOrders);
router.route("/order/:id").get(protect, getSingleOrder);

router
  .route("/admin/orders")
  .get(protect, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(protect, authorizeRoles("admin"), updateOrders)
  .delete(protect, authorizeRoles("admin"), deleteOrder);
export default router;

import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  discountedProducts,
  getSimilarProductsBySubcategory
} from "../controllers/productControll.js";
import { authorizeRoles, protect } from "../controllers/authController.js";
import { upload } from "../middlewares/photoUpload.js";
import {
  createReview,
  deleteReview,
  getAllReviewsForProduct,
  getReview,
  updateReview,
} from "../controllers/reviewsController.js";

const router = express.Router();

router.get("/products", getAllProducts);
//router.post("/admin/create_product",upload.array('images', 6), protect, authorizeRoles("admin"),createProduct);
router.get("/products/discounted", discountedProducts);
router.get(
  "/products/similar/:productId/:category/:subcategory",
  getSimilarProductsBySubcategory
);
router.post("/admin/create_product", upload.array("images", 6), createProduct);

router
  .route("/product/:id")
  .delete(protect, authorizeRoles("admin"), deleteProduct)
  //.put(protect, authorizeRoles("admin"), updateProduct)
  .put(updateProduct)
  .get(getProductDetails);

router
  .route("/product/:productId/reviews")
  .post(protect, authorizeRoles("user"), createReview)
  .get(getAllReviewsForProduct);

router
  .route("/reviews/:reviewId")
  .get(getReview)
  .patch(protect, authorizeRoles("user"), updateReview)
  .delete(protect, authorizeRoles("user"), deleteReview);

export default router;

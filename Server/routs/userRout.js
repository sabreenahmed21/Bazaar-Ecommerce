import express from "express";
const router = express.Router();
import {
  protect,
  forgetPassword,
  login,
  resetPassword,
  signup,
  verifyCode,
  verifyEmail,
  logout,
  authorizeRoles,
  updatePassword,
} from "../controllers/authController.js";
import {
  deleteMe,
  getOneUser,
  getusers,
  updateUserData,
  updateProfilePhoto,
} from "../controllers/userControll.js";
import { uploadImage } from "../middlewares/photoUpload.js";

//router.get("/admin/users", protect, authorizeRoles("admin"), getusers);
router.get("/admin/:id", protect, authorizeRoles("admin"), getOneUser);
router.get("/users", getusers);

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgetpassword", forgetPassword);
router.patch("/resetpassword/:token", resetPassword);
router.post("/verifycode", verifyCode);
router.get("/verify-email", verifyEmail);

router.delete("/delete-me", protect, deleteMe);
router.post("/logout",  logout);
router.patch("/updateUserData", protect, updateUserData);
router.post(
  "/updateProfilePhoto",
  protect,
  uploadImage.single("image"),
  updateProfilePhoto
);
router.patch("/updatePassword", protect, updatePassword);
export default router;

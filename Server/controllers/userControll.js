import UserModel from "../models/userModel.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";
import httpStatusText from "../utils/httpStatusText.js";
import {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} from "../utils/cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getusers = async (req, res, next) => {
  const users = await UserModel.find({ role: 'user' });
  if (!users) {
    return next(new appError("Users Not Found", 401, httpStatusText.FAIL));
  }
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    results: users.length,
    data: {
      users,
    },
  });
};

export const getAllAdmins = async (req, res, next) => {
  const admins = await UserModel.find({ role: 'admin' });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    results: admins.length,
    data: {
      admins,
    },
  });
};

export const getOneUser = asyncWrapper(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return next(new appError("User Not Found", 404, httpStatusText.FAIL));
  }
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    data: {
      user,
    },
  });
});

export const deleteUserByAdmin = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    return next(new appError("User Not Found", 404, httpStatusText.FAIL));
  }
  await UserModel.deleteOne({ _id: id });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "User deleted successfully",
    data: null,
  });
});

export const deleteAdminByAdmin = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const admin = await UserModel.findById(id);
  if (!admin) {
    return next(new appError("Admin Not Found", 404, httpStatusText.FAIL));
  }
  if (admin.role !== "admin") {
    return next(new appError("The user to be deleted is not an admin", 400, httpStatusText.FAIL));
  }
  if (req.user.id === id) {
    return next(new appError("Admin cannot delete themselves", 403, httpStatusText.FAIL));
  }
  await UserModel.deleteOne({ _id: id });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Admin deleted successfully",
    data: null,
  });
});

export const deleteMe = asyncWrapper(async (req, res, next) => {
  const { currentPassword } = req.body;
  if (!currentPassword) {
    return res.status(401).json({
      message: "Passwprd Required",
    });
  }
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const isPasswordValid = await user.correctPassword(
    currentPassword,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Incorrect Current Password",
    });
  }
  await UserModel.deleteOne({ _id: req.user._id });
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    data: null,
    message: "Account deleted successfully",
  });
});

export const updateUserData = asyncWrapper(async (req, res, next) => {
  //(1) create error if user post password date
  if (req.body.password || req.body.passwordConfirm) {
    return next(new appError("This route is'nt for password updates.", 400));
  }
  //(2) filtered out unwanted fields names that are'nt allowed to be updated
  const filteredBody = filterObj(req.body, "name");
  //(3) update user document
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { user: updatedUser },
  });
});

export const updateProfilePhoto = asyncWrapper(async (req, res, next) => {
  //a.  check image field in body
  if (!req.file) {
    return next(new appError("no file provided", 400));
  }
  //b. Get the path to the image
  const imagePath = path.join(
    __dirname,
    `../utils/images/${req.file.filename}`
  );
  //c. Upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);
  //d. Get the user from db
  const user = await UserModel.findById(req.user._id);
  //e. Delete the old profile
  if (user.avatar.public_id !== null) {
    await cloudinaryRemoveImage(user.avatar.public_id);
  }
  //f. Change the profile picture in db
  user.avatar = {
    url: result.secure_url,
    public_id: result.public_id,
  };
  await user.save();
  //g. send response
  res.status(200).json({
    message: "Profile updated successfully",
    avatar: {
      url: result.secure_url,
      public_id: result.public_id,
    },
  });
  //. Remove the old profile picture from server
  fs.unlinkSync(imagePath);
});

export const getProfilePhoto = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    if (!user || !user.avatar || !user.avatar.url) {
      throw new Error("Profile photo not found");
    }
    res.status(200).json({
      avatar: {
        url: user.avatar.url,
        public_id: user.avatar.public_id,
      },
    });
  } catch (error) {
    res.status(404).send("Profile photo not found");
  }
};

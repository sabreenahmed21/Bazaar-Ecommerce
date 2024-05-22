import jwt from "jsonwebtoken";
import crypto from "crypto";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";
import UserModel from "../models/userModel.js";
import httpStatusText from "../utils/httpStatusText.js";
import { sendMail } from "../utils/email.js";

const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = generateJwt(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    statusText: httpStatusText.SUCCESS,
    token,
    data: { user },
  });
};

export const protect = asyncWrapper(async (req, res, next) => {
  // 1) Getting the token and checking if it's there
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //const { token } = req.cookie;
  if (!token) {
    return next(
      new appError(
        "You are not logged in! Please log in to get access",
        401,
        "fail"
      )
    );
  }
  //2) verification token
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  //3) check if user still exists
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    return next(
      new appError(
        "User belonging to this token does not longer exist.",
        404,
        "fail"
      )
    );
  }
  //4) check if user is still active
  if (user.isActive === false) {
    return next(new appError("Your account has been deactivated", 401, "fail"));
  }
  //5) check if user changed password after token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new appError(
        "User recently changed password! Please login again",
        401,
        "fail"
      )
    );
  }
  //6) if everything ok, save user in req
  req.user = user;
  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new appError(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

export const signup = asyncWrapper(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser && !existingUser.verified) {
    const verificationCode = crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase();
    existingUser.verificationCode = verificationCode;
    await existingUser.save();
    sendMail({
      email: existingUser.email,
      subject: "Email Verification Code",
      message: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
            }
            p {
              margin-bottom: 15px;
              font-size:19px;
            }
            .verify-code {
              padding: 10px;
              background-color: #dda15e;
              color: #000;
              font-size: 18px;
              font-weight: 800;
              border-radius: 5px;
              border: 2px solid #bc6c25;
              display: inline-block;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Your verification code is: </p>
            <div class="verify-code">${verificationCode} </div>
            <p>This code will expire 10 minutes after it is sent. </p>
          </div>
        </body>
      </html>`,
    });
    return res.status(200).json({
      message: "Email verification code resent. Please check your email.",
    });
  }

  if (existingUser && existingUser.verified) {
    return res
      .status(400)
      .json({ message: "Email is already registered and verified." });
  }

  const verificationCode = crypto.randomBytes(3).toString("hex").toUpperCase();
  const newUser = new UserModel({
    name,
    email,
    password,
    passwordConfirm,
    verificationCode,
    verified: false,
    role,
    avatar: { public_id: "this is id", url: "profile url" },
  });
  await newUser.save();

  sendMail({
    email: newUser.email,
    subject: "Email Verification Code",
    message: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
            }
            p {
              margin-bottom: 15px;
              font-size:19px;
            }
            .verify-code {
              padding: 10px;
              background-color: #dda15e;
              color: #000;
              font-size: 18px;
              font-weight: 800;
              border-radius: 5px;
              border: 2px solid #bc6c25;
              display: inline-block;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Your verification code is: </p>
            <div class="verify-code">${verificationCode} </div>
            <p>This code will expire 10 minutes after it is sent. </p>
          </div>
        </body>
      </html>`,
  });

  createSendToken(newUser, 201, res);
});

export const verifyEmail = asyncWrapper(async (req, res, next) => {
  const { verificationCode } = req.query;
  const user = await UserModel.findOne({
    verificationCode: { $regex: new RegExp(`^${verificationCode}$`, "i") },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid verification code." });
  }
  // Check if the verification code has expired
  const verificationCodeExpirationTime = 10 * 60 * 1000; // 10 minutes
  const currentTime = new Date().getTime();
  if (user.createdAt.getTime() + verificationCodeExpirationTime < currentTime) {
    return res.status(400).json({ error: "Verification code has expired." });
  }
  user.verified = true;
  user.verificationCode = null;
  await user.save();
  return res.status(200).json({ message: "Email verified successfully." });
});

export const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new appError(
        "Please provide your Email and Password",
        400,
        httpStatusText.ERROR
      )
    );
  }
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new appError(
        "Email not found. Please check your email and try again.",
        401,
        httpStatusText.ERROR
      )
    );
  }
  if (!user.verified) {
    return next(
      new appError(
        "Email not verified. Please verify your email and try again.",
        401,
        httpStatusText.ERROR
      )
    );
  }
  const correct = await user.correctPassword(password, user.password);
  if (!correct) {
    return next(new appError("Incorrect password", 401, httpStatusText.ERROR));
  }
  createSendToken(user, 200, res);
});

export const forgetPassword = asyncWrapper(async (req, res, next) => {
  //1) get user based on email
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new appError("There is no user with email address", 404, "fail")
    );
  }
  //2) create reset token
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  //3) send email
  try {
    sendMail({
      email: user.email,
      subject: `${resetToken} It is your account recovery code`,
      message: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              box-shadow: 13px 13px 20px -11px rgba(0,0,0,0.75);
              -webkit-box-shadow: 13px 13px 20px -11px rgba(0,0,0,0.75);
              -moz-box-shadow: 13px 13px 20px -11px rgba(0,0,0,0.75);
            }
            p {
              margin-bottom: 15px;
              font-size:19px;
            }
            .reset-code {
              padding: 10px;
              background-color: #dda15e;
              color: #000;
              font-size: 18px;
              font-weight: 800;
              border-radius: 5px;
              border: 2px solid #bc6c25;
              display: inline-block;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Hello, ${user.name} 👋</h2>
            <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please use the following code to complete the password reset process:</p>
            <div class="reset-code">${resetToken}</div>
            <p>This code will expire 10 minutes after it is sent. </p>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          </div>
        </body>
      </html>`,
    });
    res.status(200).json({
      status: "success",
      message: "An email has been sent to you with further instructions",
    });
  } catch (err) {
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save({ validateBeforeSave: false });
    return next(
      new appError(
        "There was an error sending the email. Please try again!",
        500,
        "error"
      )
    );
  }
});

export const resetPassword = asyncWrapper(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new appError("token is invalid", 404, httpStatusText.FAIL));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();
  createSendToken(user, 200, res);
});

export const verifyCode = asyncWrapper(async (req, res, next) => {
  const { code } = req.body;
  const user = await UserModel.findOne({
    passwordResetToken: crypto.createHash("sha256").update(code).digest("hex"),
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new appError("Invalid verification code", 400, httpStatusText.FAIL)
    );
  }
  res.status(200).json({
    statusText: httpStatusText.SUCCESS,
    message: "Verification code is valid",
    data: code,
  });
});

export const logout = asyncWrapper(async (req, res, next) => {
  res.clearCookie("jwt", { expires: new Date(Date.now()) });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Logged out successfully",
  });
});

export const updatePassword = asyncWrapper(async (req, res, next) => {
  //1) Get user from collection
  const user = await UserModel.findById(req.user._id).select("+password");
  if (!user) {
    return next(new appError("User not found.", 404));
  }
  //2) check if posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new appError("Your current password is Invalid password", 401));
  }
  //3) Update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //4) log user in again with new token
  createSendToken(user, 200, res);
});

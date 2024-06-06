import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import mongoose from "mongoose";
import productRout from "./routs/productRout.js";
import { handleNotFound, errorHandler } from "./controllers/errorControll.js";
import userRout from "./routs/userRout.js";
import paymentRout from "./routs/paymentRout.js";
import orderRout from "./routs/orderRout.js";
import salesReportRout from "./routs/salesReportRoutes.js";
import cookieParser from "cookie-parser";
//* CONFIG
dotenv.config();

//* MIDDLEWARE
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:3000","http://localhost:3001",
      "https://bazaar-main.onrender.com",
      "https://adminbazaar-main.onrender.com",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ExpressMongoSanitize());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.static("public"));

//* MONGO CONNECT
async function connectToDatabase() {
  try {
    const db = process.env.MONGO_URL.replace(
      "<password>",
      process.env.MONGO_PASSWORD
    );
    await mongoose.connect(db);
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
connectToDatabase();

//* ROUTS
app.use("/api", productRout);
app.use("/api", userRout);
app.use("/api", orderRout);
app.use("/api", paymentRout);
app.use('/api', salesReportRout);


//* ERROR
app.all("*", handleNotFound);
app.use(errorHandler);

const port = process.env.PORT ||  4000;
app.listen(port, () => {
  console.log("listening on port " + port);
});

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { config } from "./config/config.js";
import connectDB from "./database/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import bankDetailRoutes from "./routes/bankDetailRoutes.js";
import studentDetailRoutes from "./routes/studentDetailRoutes.js";
import usersRoutes from "./routes/userRoutes.js";

const port = config.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/users", authRoutes);
app.use("/api", bankDetailRoutes);
app.use("/api", studentDetailRoutes);
app.use("/api", usersRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

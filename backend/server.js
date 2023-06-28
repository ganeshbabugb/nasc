import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
// import path from "path";
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
// app.use(cors());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(cookieParser());

app.use("/api/users", authRoutes);
app.use("/api", bankDetailRoutes);
app.use("/api", studentDetailRoutes);

app.use("/api", usersRoutes);

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

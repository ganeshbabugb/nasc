import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;

export const config = {
  PORT,
  MONGO_URI,
  NODE_ENV,
  JWT_SECRET,
};

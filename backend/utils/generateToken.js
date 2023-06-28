import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, config.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
};

export default generateToken;

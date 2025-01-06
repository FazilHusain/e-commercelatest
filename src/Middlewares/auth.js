import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";
import dotenv from 'dotenv'

 dotenv.config()

export const Authenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) return res.json({ message: "Login first" });
  //"!@#$%^&*()"
  const SECERET_KEY=process.env.SECERET_KEY
  const decoded = jwt.verify(token, SECERET_KEY);

  const id = decoded.userId;

  let user = await User.findById(id);

  if (!user) return res.json({ message: "User not exist" });

  req.user = user;
  next();

  // console.log(decoded)
};


import express from "express";
import User from "../models/User.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import sendResponse from "../helpers/sendResponse.js";

const router = express.Router();

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  fullname: Joi.string().alphanum().min(3).max(30).required(),
});

router.post("/register", (req, res) => {
 const { error, value } = registerSchema.validate(req.body);
if(error) 
    return sendResponse(res, 400, null, true, "Please input valid fields");
     res.send("Working on Register API");
});

router.post("/login", (req, res) => {});

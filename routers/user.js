import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { authenticateUser } from "../middleware/authentication.js";
import User from "../models/User.js";
const router = express.Router();


router.put("/", authenticateUser, async (req, res) => {
    try{
        const {city, country} = req.body;
        const user = await User.findOneAndUpdate({
            _id: req.user._id,
        },{
            city,
            country,
        }, 
        {new: true}
    ).exec();
      sendResponse(res, 200, user, false, "User Updated Successfully")
    } catch(err){
     sendResponse(res, 500, null, true, "Something went Worong");
    }
        
})




export default router;
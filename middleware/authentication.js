import sendResponse from "../helpers/sendResponse.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function authenticateUser(req, res, next) {
  try {

    // const bearerToken = req?.headers?.authorization;
    // const token = bearerToken?.split(" ")[1];    

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return sendResponse(res, 403, null, true, "Token Not Provided");

    const decoded = jwt.verify(token, process.env.AUTH_SECRET);

    if(decoded){

        const user = await User.findById(decoded._id);

        if(!user) return sendResponse(res, 403, null, true, "User Not Found")

        req.user = decoded;

        next();

    }else{

            sendResponse(res, 500, null, true, "Something Went Worong");
    }
  } catch (err) {

    sendResponse(res, 500, null, true, "Something Went Worong");
  }
}




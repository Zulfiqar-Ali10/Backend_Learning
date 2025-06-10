import sendResponse from "../helpers/sendResponse.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

export async function authenticateUser(req, res, next) {
  try {
    // console.log("authorization=>", req.headers.authorization);
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken?.split(" ")[1];
    if (!token) return sendResponse(res, 403, null, true, "Token Not Provide");
    // res.send("Working on Update API");
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    if(decoded){
        const user = await user.findById(decoded._id);
        if(!user) return sendResponse(res, 403, null, true, "User Not Found")
        req.user = decoded;
        next();
    }else{
            sendResponse(res, 500, null, true, "Something went Worong");
    }
  } catch (err) {
    sendResponse(res, 500, null, true, "Something went Worong");
  }
}




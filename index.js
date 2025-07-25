import express from "express";
import morgan from "morgan";
import 'dotenv/config';
import mongoose from "mongoose";
import taskRoutes from "./routers/tasks.js";
import authRoutes from "./routers/auth.js";
import userRoutes from "./routers/user.js";
import ecommerceRoutes from "./routers/ecommerce.js";

const app = express();
const PORT = process.env.PORT


app.use(morgan("tiny"));
app.use(express.json());
app.use("/task", taskRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/ecommerce", ecommerceRoutes);

// console.log("MONGODBURI =>", process.env.MONGODBURI);
mongoose.connect(process.env.MONGODBURI)
.then(() => console.log("MONGODB Connected"))
.catch((err) => console.log("err=>",  err))    

app.get("/", (req, res) =>{
    res.send("Server Is Running On Brower, You Check It")
    
})


app.listen(PORT, () => console.log("Server is Runnig on <PORT> " + PORT));
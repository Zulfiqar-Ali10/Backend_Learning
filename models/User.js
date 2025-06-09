import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema ({
  email: {type: String, unique: true, requird: true},
  password: {type: String, required: true},
  fullname: {type: String},
  gender: {type: String, enum: ["male", "female"]},
  city: {type: String},
  coutry: {type: String},
  dob: {type: String},
  isProfileCompleted : {type: Boolean},
}, 
{timestamps: true}
);

const User = mongoose.model("Users", userSchema);
export default User;
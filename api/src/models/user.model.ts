import mongoose, { Schema } from "mongoose";

const userSchema : Schema = new mongoose.Schema({
    
  email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
        default: "123",
    },
    isActive:{
        type: Boolean,
        required: true,
        default: true,
    
    },
    role:{
        type: String,
        required: true,
        default: "user",
        enum: ["user","admin"],
    },

});
const User=mongoose.model('User',userSchema);
export default User;
import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please enter your first name"],
        minLength:[3,"First name must be at least 3 characters"],
        maxLength:[20,"First name cannot exceed 20 characters"],
    },
    lastName:{
        type:String,
        required:[true,"Please enter your last name"],
        minLength:[3,"Last name must be at least 3 characters"],
        maxLength:[20,"Last name cannot exceed 20 characters"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"],
    },
    phone:{
        type:String,
        required:[true,"Please enter your phone number"],
        validate:[validator.isMobilePhone,"Please enter a valid phone number"],
    },
    message:{
        type:String,
        required:[true,"Please enter your message"],
    },

})

export const Message = mongoose.model("Message",messageSchema);
import mongoose, { Mongoose, Schema } from "mongoose";


const  userSchema = new Schema({
    name:String,
    email:{
        type:String,
        required:[true,"Email required"],
    },
    password:{
        type:String,
        required:[true,"Password required"],
    },
    about:String,
    profileUrl:String,
    // address:{
    //     street:String,
    //     city:String,
    //     country:String,
    //     pinCode:Number,

    // },

})

export const User =mongoose.models.users || mongoose.model("users",userSchema)
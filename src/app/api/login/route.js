import connectDb from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"




export const  POST=async(request)=>{
   await connectDb()

    const {email,password} =await  request.json();
    try {
        //1.get user
     const user= await User.findOne({email:email})
     if(user == null ){
        return getResponseMessage("user not found",500,false)
        
     }
        //2.password check
     const matched =bcrypt.compareSync(password,user.password)
     if(!matched){
        return getResponseMessage("Passwod not matched",404,false)
     }


     //3.generate token

    const token= jwt.sign({
        _id:user._id,
        name:user.name
     },process.env.JWT_KEY)



    //  4.create nextresponse cookie

    const response = NextResponse.json({
                message:"Login success!",
                success:true,
                user:user,        
    })

    response.cookies.set("authToken",token,{expiresIn:"1d",httpOnly:true})

     console.log(token);

     console.log(user);
     
     return response
     
        
    } catch (error) {
        console.log(error)
        return getResponseMessage("not found",404,false)
        
    }





}
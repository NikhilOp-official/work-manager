import connectDb from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


connectDb()

export const  POST=async(request)=>{

    const {email,password} =await  request.json();
    try {
        //1.get user
     const user= await User.findOne({email:email})
     if(user == null ){
        return NextResponse.json({message:"user not found",success:true})
        
     }
        //2.password check
     const matched =bcrypt.compareSync(password,user.password)
     if(!matched){
        return NextResponse.json({message:"password not matched",success:false})
     }


     //3.generate token

    const token= jwt.sign({
        _id:user._id,
        name:user.name
     },process.env.JWT_KEY)



    //  4.create nextresponse cookie

    const response = NextResponse.json({
                message:"Login success!",
                success:true        
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
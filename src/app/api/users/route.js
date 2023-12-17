import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"


const { default: connectDb } = require("@/helper/db");

connectDb() 


//get user function 

  export async function GET(request){

        let users = []
    try {
        users = await User.find().select("-password")

        
    } catch (error) {
        console.log(error)
    return NextResponse.json({
        message:"failed to get user",
        status:false
        
    })

  }
  return NextResponse.json(users)
}



export async function POST(request){

    //fetch user detail from request
    const {name,email,password,about,profileURL} =await request.json()

    //create user object with useModel
   const user = new User({
    name,
    email,
    password,
    about,
    profileURL

    })

try {
    //save the object to database
    user.password=bcrypt.hashSync(user.password,parseInt(process.env.BCRYPT_SALT) )
    console.log(user);
     const createdUser = await user.save();

   const response = NextResponse.json(user,{
    status:201,
   })
   return response
    
} catch (error) {
    console.log(error)
    return NextResponse.json({
        message:"failed to create user",
        status:false,

    },{
        status:500, 
    })
}
  
    
} 
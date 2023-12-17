import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

const { default: connectDb } = require("@/helper/db");





// /tasks

//get all the tasks 

  export async function GET(request){
    await connectDb()
    try {
     const  tasks = await Task.find()
     return  NextResponse.json(tasks)

        
    } catch (error) {
        console.log(error)
    return getResponseMessage("Error in getting data",404,false)

  }
}


//getting all the data
export async function POST(request){
 

    //fetch user detail from request
    const {title,content,userId,status} =await request.json()



//fetching logged in user id
const authToken = request.cookies.get("authToken")?.value;
// console.log(authToken);
const data = jwt.verify(authToken, process.env.JWT_KEY)

console.log(data._id);

   
    try {      
      //create all the task
            const task = new Task({
            title,
            content,
            userId:data._id,
            status,

            })


            await connectDb()
    //save the object to database
     const createdTask = await task.save();

  return NextResponse.json(createdTask,{
    status:201,
   })
   
    
} catch (error) {
    console.log(error)
    console.log("message")

    return getResponseMessage("failed to create task",500,false)
}
  

} 
import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

const { default: connectDb } = require("@/helper/db");

connectDb() 



// /tasks

//get all the tasks 

  export async function GET(request){
    try {
     const  tasks = await Task.find()
     return  NextResponse.json(tasks)

        
    } catch (error) {
        console.log(error)
    return getResponseMessage("Error in getting data",404,false)

  }
}



export async function POST(request){

    //fetch user detail from request
    const {title,content,userId} =await request.json()

   
    try {      
      //create all the task
            const task = new Task({
            title,
            content,
            userId,

            })



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

// /api/tasks/{taskid}

import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

//get single task
export const  GET=async (request,{params})=>{
    const {taskId}= params

    try {
        const  task= await Task.findById(taskId)
        return  NextResponse.json(task)
   
           
       } catch (error) {
           console.log(error)
       return getResponseMessage("Error in getting tasks",404,false)
   
     }


}

export const  PUT=async (request,{params})=>{
    try {
        const {taskId}= params;

        const {title,content,status} = await request.json();

        let task = await Task.findById(taskId)



        task.title=title;
        task.content=content;
        task.status=status;

      const updatedTask =  await task.save()

     

      return NextResponse.json(updatedTask);
        
        
    } catch (error) {
        console.log(error)
        return getResponseMessage("Error in updating task",500,false)
        
    }


}
export const  DELETE=async (request , {params})=>{


    try {


        const {taskId} =params
          await   Task.deleteOne({_id:taskId})

          return getResponseMessage("task deleted",200,true)
        


    } catch (error) {

        console.log(error)
        console.log("helo")

        return getResponseMessage("error in deleting the task",500,false)
        
    }


}
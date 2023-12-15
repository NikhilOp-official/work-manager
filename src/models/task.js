import mongoose, { Schema } from "mongoose";


const  taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title required"]
    },
    content:{
        type:String,
        required:[true,"content required"]
       
    },
    addedDate:{
        type:Date,
       default:Date.now(),
       required:[true,"date required"]
    },
    status:{
        type:String,
       enum:["pending","completed","just-added"],
       default:"pending",
    },
    userId:{
        type:mongoose.ObjectId,
        required:true
    }
   

})

export const Task =mongoose.models.task || mongoose.model("task",taskSchema)
"use client"
import { deleteTask, getTasksOfUser } from '@/services/taskServices'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/userContext'
import Tasks from './Tasks'
import { toast } from 'react-toastify'


const ShowTasks = () => {

        const [tasks,setTasks] = useState([])
        const context = useContext(UserContext)

async function loadTasks(userId){
    try {
      const tasks= await  getTasksOfUser(userId)
      
      setTasks([...tasks].reverse())
      console.log(tasks);
    } catch (error) {
        console.log(error);
    }
         
      } 
useEffect(()=>{
    if(context.user){
         loadTasks(context.user._id)
    }
   
      
},[context.user])


 const deleteTaskParent =async (taskId) =>{

    try {
       const result =  await  deleteTask(taskId)
       console.log(result);
      const newTasks = tasks.filter(item=>item._id!=taskId)
      setTasks(newTasks)
       toast.success("Your task is deleted")
        
    } catch (error) {
        console.log(error);
        toast.error("Error in deleting the task")
        
    }

  
 }


  return (
  <div className='container grid grid-cols-12 mt-3 '>
    <div className='col-span-6 col-start-4'>
        <h1 className='text-3xl text-center mb-3'>Your Tasks ({tasks.length})</h1>

        <div>
            {tasks.map((task)=>(<Tasks task={task} key={task._id} deleteTaskParent={deleteTaskParent} />))}
        </div>
       
    </div>
  </div>
  )
}

export default ShowTasks
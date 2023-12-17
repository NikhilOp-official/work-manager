import React, { useContext } from "react";
import UserContext from "../context/userContext";
import {RxCross1} from "react-icons/rx"
import { deleteTask } from "@/services/taskServices";

const Tasks = ({task,deleteTaskParent}) => {


  const deleteTask = (taskId) =>{
    deleteTaskParent(taskId)
  }

const {user} = useContext(UserContext)

  return (
    <div className={` shadow-lg mt-2 rounded-md ${task.status == "completed"?"bg-green-500" :" bg-gray-800"} `}>
      <div className="p-5">
        <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">{task.title}  </h1>
       <span 
        onClick={()=>{
          deleteTask(task._id)
        }}
       className="shadow-lg bg-gray-950 hover:bg-gray-800 rounded-full w-9 h-9 cursor-pointer flex justify-center items-center text-center">
       <RxCross1 />
       </span>
        </div>
        <p className="font-normal">{task.content}</p>
        <div className="flex justify-between mt-3   ">
        <p className="text-left">
          Status: <span className="font-bold" >{task.status}</span>
        </p>
          <p className="text-right">
            Author:   <span className="font-bold">{user?.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tasks;

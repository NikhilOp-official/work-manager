import React from 'react'
import mongoose from 'mongoose'
import { User } from '@/models/user'

const connectDb = async () => {
  try{
       const {connection} = await mongoose.connect(process.env.MONGO_DB_URL,{

            dbName:"work_manager",

        })
  console.log("db connected")
        //testing and creating new user

      
      // const user = new User({
      //     name:"nikhil",
      //     email:"n@gmail.com",
      //     password:"password",
      //     about:"this is teatint"

      //   })
      //   await user.save()
      //   console.log("user is created")




        console.log("connected with the host",connection.host)
  }
  catch(err){
    
    console.log("failel to connect with db")
    console.log(err)

  }
}

export default connectDb
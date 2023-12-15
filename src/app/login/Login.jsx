"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {

   const [loginData,setLoginData] =useState({
        email:"",
        password:"",
        })

    const resetForm = ()=>{
        
        setLoginData({       
            email:"",
            password:"",
            })      
    }


    const loginFormSubmitted = (event)=>{
        event.preventDefault();
console.log(loginData);


if(loginData.email.trim()==='' || loginData.password.trim()===''){
    toast.info("Invalid Data",{
        position:"top-center"
    })
    return
}
//todo :validate rest email,password etc



    }
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 col-start-5">
        <div className="py-5">

        <h1 className='text-3xl text-center'>Login Here</h1>

        <form action="#!" onSubmit={loginFormSubmitted}>
        <div className="mt-3">

<label htmlFor="user_email" className='block text-sm font-medium mb-2 ps-2'>Email</label>
    <input type="email"  
    className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400 border border-gray-800"  
    placeholder='Enter here' 
    id='user_email'
    name='user_email'
    onChange={(e)=>setLoginData({
        ...loginData,
        email:e.target.value
    })}
    value={loginData.email}
    />
</div>
{/* password */}
<div className="mt-3">

<label htmlFor="user_password" className='block text-sm font-medium mb-2 ps-2'>Password</label>
    <input type="password"  
    className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400 border border-gray-800"  
    placeholder='Enter here' 
    id='user_password'
    name='user_password'
    onChange={(e)=>setLoginData({
        ...loginData,
        password:e.target.value
    })}
    value={loginData.password}
    />
</div>
<div className='mt-3 text-center'> 
                    <button type='submit' className='px-3 py-2 bg-green-600 rounded hover:bg-green-400'>Login</button>
                    <button type='button' onClick={resetForm}  className='px-3 py-2 ms-3 bg-orange-600 rounded hover:bg-orange-400'>Reset</button>
                </div>


        </form>
        {/* {JSON.stringify(loginData)} */}
        </div>
      </div>
    </div>
  );
};

export default Login;

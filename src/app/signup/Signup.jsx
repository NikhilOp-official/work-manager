"use client"

import React, { useState } from 'react'
import signUpBanner from "../../assets/signup.svg"
import Image from 'next/image'
import { toast } from 'react-toastify'
import { signUp } from '@/services/userService'

const Signup = () => {

   const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
        about:"",
        profileURL:"https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png"
    
        })

    const doSignUp =async (event)=>{
    event.preventDefault();
    console.log(event);
    console.log(data);

    if(data.name.trim()==='' || data.name===null){
        toast.warning("Name is required!",{
            position:"top-center"
        })
        return
    }
    //todo :validate rest email,password etc



    try {
    const result =    await signUp(data)

    console.log(result);
    toast.success("user is registered",{
        position:"top-center"
    })
    setData({
        name:"",
        email:"",
        password:"",
        about:"",
        profileURL:"https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png"
    
        })
    } catch (error) {
        console.log(error)
        toast.error("Error in signup! "+error.response.data.message,{
            position:"top-center"
        })
        
    }

    }
    const resetForm = ()=>{
        
        setData({
            name:"",
            email:"",
            password:"",
            about:"",
            profileURL:"https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png"
        
            })
        
            
    }


  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-4 col-start-5'>
            <div className='py-5'>
             <div className="m-5 flex justify-center "> <Image src={signUpBanner} alt='signup-banner' style={{width:"40%"}}/></div>  
                <h1 className='text-3xl text-center'>Signup Here</h1>
                <form action="#!" className='mt-5' onSubmit={doSignUp}>
                {/* username */}
                <div className="mt-3">

                    <label htmlFor="user_name" className='block text-sm font-medium mb-2 ps-2'>Username</label>
                        <input type="text"  
                        className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400 border border-gray-800"  
                        placeholder='Enter here' 
                        name='user_name'
                        onChange={(e)=>setData({
                            ...data,
                            name:e.target.value
                        })}
                        value={data.name}
                        />
                </div>
                {/* user Email */}
                <div className="mt-3">

                    <label htmlFor="user_email" className='block text-sm font-medium mb-2 ps-2'>Email</label>
                        <input type="email"  
                        className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400 border border-gray-800"  
                        placeholder='Enter here' 
                        id='user_email'
                        name='user_email'
                        onChange={(e)=>setData({
                            ...data,
                            email:e.target.value
                        })}
                        value={data.email}
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
                        onChange={(e)=>setData({
                            ...data,
                            password:e.target.value
                        })}
                        value={data.password}
                        />
                </div>
                {/* user about section */}
                <div className="mt-3">

                    <label htmlFor="user_about" className='block text-sm font-medium mb-2 ps-2'>About</label>
                        <textarea  
                        className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400 border border-gray-800"  
                        placeholder='Enter here' 
                        id='user_about'
                        rows={8}
                        name='user_about'
                        onChange={(e)=>setData({
                            ...data,
                            about:e.target.value
                        })}
                        value={data.about}
                        ></textarea>
                </div>
                
                <div className='mt-3 text-center'> 
                    <button type='submit' className='px-3 py-2 bg-green-600 rounded hover:bg-green-400'>Signup</button>
                    <button type='button' onClick={resetForm} className='px-3 py-2 ms-3 bg-orange-600 rounded hover:bg-orange-400'>Reset</button>
                </div>
                {/* {JSON.stringify(data)} */}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup
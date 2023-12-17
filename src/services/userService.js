import { httpAxios } from "@/helper/httpHelper"


export const signUp = async(user)=>{

 const result= await httpAxios.post("/api/users",user).then((response)=>response.data)
 return result

}

export const login = async(loginData) =>{
    const result= await httpAxios.post("/api/login",loginData).then((response)=>response.data)
    return result

}


export const currentUser = async() =>{
    const result= await httpAxios.get("/api/current").then((response)=>response.data)
    return result

}

export const logout = async() =>{
    const result= await httpAxios.post("/api/logout").then((response)=>response.data)
    return result

}
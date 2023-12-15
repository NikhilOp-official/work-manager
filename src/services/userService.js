import { httpAxios } from "@/helper/httpHelper"


export const signUp = async(user)=>{

 const result= await httpAxios.post("/api/users",user).then((response)=>response.data)
 return result

}
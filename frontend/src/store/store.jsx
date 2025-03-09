
import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import {toast} from "react-hot-toast"

const Store=create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isSingingin:false,
    isUpdating:false,
    checkAuth:async()=>{
        try {
            const response =await axiosInstance.get('api/auth/check')
            console.log('this is response',response)
            set({authUser:response})
        } catch (error) {
            set({authUser:null})
            console.log("errror in auth function",error)
            if (error.response && error.response.status === 401) {
                // Token is invalid or expired, handle this scenario
                console.error("Unauthorized, invalid token:", error.response.data);
              } else {
                console.error("Error in auth function:", error.response?.data || error);
              }
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signUp:async(data)=>{
        set({isSingingup:true})
        try {
    
            const res=await axiosInstance.post("api/auth/signup",data);
            console.log('from backend',res.data)
            set({authUser:res.data});
          
            toast.success("account is created successfully")

        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isSigningUp:false})
        }
    },
    logout: async ()=> {
        try {
           const response=await axiosInstance.post('/api/auth/signout')
           console.log('log out successfully',response);
           toast.success("log out successful");
           set({authUser:null})

            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
}))
export default Store;
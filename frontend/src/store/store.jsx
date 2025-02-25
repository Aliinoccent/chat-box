
import {create} from "zustand"
import { axiosInstance } from "../lib/axios"

const Store=create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isSingingin:false,
    isUpdating:false,
    checkAuth:async()=>{
        try {
            const response =await axiosInstance.get('api/auth/check')
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
    }
}))
export default Store;
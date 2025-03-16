
import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import {toast} from "react-hot-toast"
import {io} from "socket.io-client"


const Store=create((set,get)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isSingingin:false,
    isUpdatingProfile:false,
    onlineUsers: [],
    socket:null,
    checkAuth:async()=>{
        try {
            const response =await axiosInstance.get('api/auth/check')
            console.log('this is response',response)
            set({authUser:response})
            get().Socketconnected();
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
          get().Socketconnected();
            toast.success("account is created successfully")

        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isSigningUp:false})
        }
    },
    login:async(data)=>{
       
        set({isSingingin:true});
        try {
           const res=await axiosInstance.post('/api/auth/signin',data);
            set ({authUser:res.data});
            toast.success(res);
            get().Socketconnected();
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
        set({isSingingin:false})
        }
    },
    logout: async ()=> {
        try {
           const response=await axiosInstance.post('/api/auth/signout')
           console.log('log out successfully',response);
           toast.success("log out successful");
           get().disconnected();
           set({authUser:null})

            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            console.log('adfadfad',data);
          const res = await axiosInstance.put("/api/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
      Socketconnected:()=>{
        const {authUser}=get();
        const socket=io('http://localhost:5005/');
        if(!authUser || socket?.connected) return;
        socket.connect();
        set({socket:socket})
      },
      disconnected:()=>{
        if(get().socket?.connected) get().socket.disconnect();
      }
}))
export default Store;
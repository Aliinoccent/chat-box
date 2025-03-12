import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
export const UseChat=create((set,get)=>({
messages:[],
users:[],
selectedUser:null,
isUserLoading:false,
isMessegesLoading:false,
getUsers:async()=>{
    set({isUserLoading:true})
    try {
        const res=await axiosInstance.get("api/messeges/user");
        set({users:res.data});

    
    } catch (error) {
       
        toast.error(error.response.data.message)
    }finally{
        set({isUserLoading:false})
    }
    
},
getMessages:async(id)=>{
    set({isMessegesLoading:true})
    try {
        const res=await axiosInstance.get(`api/messeges/${id}`);
    
        set({messages:res.data});

    
    } catch (error) {
        console.log("error",id,error)
        toast.error(error.response.data.message)
    }finally{
        set({isMessegesLoading:false})
    }
    
},
sendMessage:async(data)=>{
    const {messages,selectedUser}=get();
 try {
    const res=await axiosInstance.post(`api/messages/${selectedUser._id}`,data)
    set({messages:[...messages,res.data]})
 } catch (error) {
    toast.error(error.response.data.message)
 }
},
setSelectedUser: (selectedUser) => set({ selectedUser }),

})

)
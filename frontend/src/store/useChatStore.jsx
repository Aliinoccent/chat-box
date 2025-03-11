import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
export const UseChat=create((set)=>({
messages:[],
users:[],
selectedUser:null,
isUserLoading:false,
isMessegesLoading:false,
getUser:async()=>{
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
getMesseges:async(id)=>{
    set({isMessegesLoading:true})
    try {
        const res=await axiosInstance.get(`api/messeges${id}`);
        set({messages:res.data});

    
    } catch (error) {
        toast.error(error.response.data.message)
    }finally{
        set({isMessegesLoading:false})
    }
    
},
setSelectedUser: (selectedUser) => set({ selectedUser }),
})
)
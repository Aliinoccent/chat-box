import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import Store from './store';
import {io} from "socket.io-client"
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

sendMessage: async (messageData) => {
    const { selectedUser,messages } = get();
    try {
      const res = await axiosInstance.post(`api/messeges/${selectedUser._id}`, messageData);  
    //   set({ messages: { ...messages, message: [...messages.message, res.data] } });
        set({messages:[...messages,res.data]})
    
    return res.data


    } catch (error) {
        console.log(error)
      toast.error(error.response.data.message);
    }
  },
 subscribeToMessage:()=>{
 const socket=Store.getState().socket;
 
 console.log("get().socket",Store.getState().socket);
if (!socket || !socket.connected) {
    console.error("Socket is NOT connected!");
    return;
}
else{
    console.log("socket is connected",socket.id)
}

 socket.on("mes",(newMessages)=>{
    console.log("newMessages this function is called",newMessages);
    set({messages:[...get().messages,newMessages]});

 })
 }, 
 unsubscribeFromMessages: () => {
    const socket = Store.getState().socket;
    socket.off("newMessages");
  },

setSelectedUser: (selectedUser) => set({ selectedUser }),

})

)
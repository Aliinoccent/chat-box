import React, { useEffect } from "react";
import {BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import HomePage from "./pages/homePage";
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/signUpPage";
import SetteingPage from "./pages/setteingPage";
import ProfilePage from "./pages/profilePage";
import Store from "./store/store";
import {Loader} from 'lucide-react'
const App = () => {
  const {checkAuth,authUser,isCheckingAuth}=Store() 
  useEffect(()=>{
    checkAuth();
  },[authUser])
   if(isCheckingAuth && !authUser)return(
 <div className="flex items-center justify-center h-screen">
  <Loader className="size-10 animate-spin"/>
 </div>
  )
  console.log(authUser)
  return (
   
   
      <BrowserRouter>
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to={'/signIn'}/>}/> 
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signIn" element={!authUser?<SignInPage/> : <Navigate to={'/'}></Navigate>}/>
        <Route path="/settingPage" element={<SetteingPage/>}/>
        <Route path="/profilePage" element={authUser?<ProfilePage/>:<Navigate to={'/signIn'}/>}/>
      </Routes>
      
      </BrowserRouter>
    
  );
};

export default App;

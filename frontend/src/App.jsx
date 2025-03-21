import React, { useEffect } from "react";
import {  Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/signUpPage";
import SetteingPage from "./pages/setteingPage";
import ProfilePage from "./pages/profilePage";
import Store from "./store/store";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navebar";
import { useThemeStore } from "./store/usethemestore";
const App = () => {
  const { checkAuth, authUser, isCheckingAuth ,onlineUsers} = Store();
  const {theme}=useThemeStore();
  console.log('data',authUser);
  console.log("online users in app",onlineUsers)
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  
  return (
    <div data-theme={theme}>
      <Navbar />
       <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/signIn"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signIn"
            element={!authUser ? <SignInPage /> : <Navigate to={"/"} />}
          />
          <Route path="/settingPage" element={<SetteingPage />} />
          <Route
            path="/profilePage"
            element={authUser ? <ProfilePage /> : <Navigate to={"/signIn"} />}
          />
        </Routes>
        <Toaster />
     
    </div>
  );
};

export default App;

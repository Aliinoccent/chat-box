import React, { useEffect, useState,useCallback } from "react";
import Store from "../store/store";
import { MessageSquare ,User, Mail,Lock, Eye, EyeOff } from "lucide-react";

const SignUpPage = () => {
  const [data, setdata] = useState({ email: "", password: "", name: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isSigningUp } = Store();
  useEffect(() => {
    datashow();
  }, [data]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const datashow = () => {
    console.log(data);
  };
  const inputValues = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  return (
    <div className="min-h-screen grid lg:grid-cols-2 ">
      {/*  left side */}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center  p-6 sm:12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
                >
                  <MessageSquare className="size-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                <p className="text-base-content/60"> Get started with your free account</p>
              </div>
            </div>
    
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                
                  value={data.name}
                  onChange={inputValues}
                />
              </div>
            </div>


            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  name="email"
                  value={data.email}
                  onChange={inputValues}
                />
              </div>
            </div>


            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword?"text":"password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="abc@gmail.com"
                  name ="password"
                  value={data.password}
                  onChange={inputValues}
                
                />
                <button type ="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={togglePassword}>{showPassword?(<EyeOff className="size-5 text-base-content/40"></EyeOff>):(<Eye className="size-5 text-base-content/40"></Eye>)}</button>
              </div>
            </div> 
            </form>
          </div>
        </div>

     
      </form>
    </div>
  );
};

export default SignUpPage;

import React, { useEffect, useState, useCallback } from "react";
import Store from "../store/store";
import AuthImagePattern from "../components/AuthImagePattern";
import {
  MessageSquare,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [data, setdata] = useState({ email: "", password: "", fullName: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isSigningUp } = Store();
  useEffect(() => {
    datashow();
  }, [data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const sucess=validation();
    if(sucess){
      signUp(data);
    }
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
   const validation=()=>{
    if(!data.fullName.trim()) return toast.error('full name is required');
    if(data.fullName.length<3) return toast.error("name must be at least 3 charactor")
      if (!data.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(data.email)) return toast.error("Invalid email format");
    if (!data.password.trim()) return toast.error("Password is required");
    if (data.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;

   }
  return (
    <div className="min-h-screen grid lg:grid-cols-2 ">
      {/*  left side */}
      <>
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
                <p className="text-base-content/60">
                  {" "}
                  Get started with your free account
                </p>
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
                    name="fullName"

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
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered w-full pl-10`}
                    placeholder="abc@gmail.com"
                    name="password"
                    value={data.password}
                    onChange={inputValues}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePassword}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40"></EyeOff>
                    ) : (
                      <Eye className="size-5 text-base-content/40"></Eye>
                    )}
                  </button>
                </div>
              </div>
              <button className="btn btn-primary w-full" disabled={isSigningUp}>
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin">Loading</Loader2>
                  </>
                ) : (
                  "createAcount"
                )}
              </button>
            </form>
            <div className="text-center">
              <p className="text-base-content/60">
                Already have an account?{" "}
               <Link to="/signIn" className="Link link-primary ">SignIn</Link>
              </p>
            </div>
          </div>
        </div>
      </>
        {/* right side */}

        <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;

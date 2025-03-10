import React, { useState, useCallback } from "react";
import Store from "../store/store";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { MessageSquare, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";

const SignInPage = () => {
  const { isSigningIn, login } = Store();
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validation();
    if (success===true) {
   
      login(data);
    }
  };

  const validation = () => {
    if (!data.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(data.email)) return toast.error("Invalid email format");
    if (!data.password.trim()) return toast.error("Password is required");
    if (data.password.length < 6) return toast.error("Password must be at least 6 characters");
    
    return true;
  };

  const inputValues = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex justify-center items-center p-6 sm:12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Sign In</h1>
              <p className="text-base-content/60">Welcome back! Sign in to your account.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="input input-bordered w-full pl-10"
                  placeholder="example@example.com"
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
                  className="input input-bordered w-full pl-10"
                  placeholder="Enter your password"
                  name="password"
                  value={data.password}
                  onChange={inputValues}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePassword}
                >
                  {showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
                </button>
              </div>
            </div>

            <button className="btn btn-primary w-full" disabled={isSigningIn}>
              {isSigningIn ? <Loader2 className="size-5 animate-spin" /> : "Sign In"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account? <Link to="/signup" className="link link-primary">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignInPage;

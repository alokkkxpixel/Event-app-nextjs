// app/(root)/login/page.tsx
"use client"

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')


   async function handleLogin(e:React.FormEvent) {
    e.preventDefault()
     const res  = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,{
        email ,
        password
     })
  console.log(res.data)
    
   }
 
   

  return (
    <div className="flex-center  w-full px-4 py-10 sm:px-6">
      {/* Wrapper controls max width on larger screens */}
      <div className="w-full max-w-[450px]">
        
        {/* Card Container */}
        <div className="signup-card bg-dark-100 border-dark-200 card-shadow flex w-full flex-col gap-6 rounded-[10px] border px-5 py-8 sm:px-8">
          
          {/* Header Section */}
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-gradient text-3xl font-bold sm:text-4xl">Welcome Back</h1>
            <p className="text-light-200 text-sm sm:text-base">
              Sign in to continue your journey
            </p>
          </div>

          {/* Form Section */}
          <form className="flex flex-col gap-5 sm:gap-6" onSubmit={handleLogin}>
            
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-light-100 text-sm font-medium" >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="bg-dark-200 text-light-100 border-border-dark w-full rounded-[6px] border px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/50 sm:px-5 sm:py-2.5"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-light-100 text-sm font-medium">
                Password
              </label>
              <div className="flex flex-col gap-1">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  className="bg-dark-200 text-light-100 border-border-dark w-full rounded-[6px] border px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/50 sm:px-5 sm:py-2.5"
                />
                <Link
                  href="/forgot-password"
                  className="text-light-200 hover:text-primary self-end text-xs transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-dark-100 mt-2 w-full cursor-pointer rounded-[6px] px-4 py-3 text-base font-bold transition-colors sm:py-2.5 sm:text-lg"
            >
              Sign In
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center">
            <p className="text-light-200 text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium transition-all">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

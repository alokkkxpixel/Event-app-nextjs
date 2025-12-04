// app/(root)/register/page.tsx
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex-center w-full px-4 py-10 sm:px-6">
      {/* Wrapper controls max width on larger screens */}
      <div className="w-full max-w-[450px]">
        
        {/* Card Container */}
        <div className="signup-card bg-dark-100 border-dark-200 card-shadow flex w-full flex-col gap-6 rounded-[10px] border px-5 py-8 sm:px-8">
          
          {/* Header Section */}
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-gradient text-3xl font-bold sm:text-4xl">Create Account</h1>
            <p className="text-light-200 text-sm sm:text-base">
              Join us to start your ride-sharing journey
            </p>
          </div>

          {/* Form Section */}
          <form className="flex flex-col gap-5 sm:gap-6">
            
            {/* Username Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-light-100 text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                required
                className="bg-dark-200 text-light-100 border-border-dark w-full rounded-[6px] border px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/50 sm:px-5 sm:py-2.5"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-light-100 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="bg-dark-200 text-light-100 border-border-dark w-full rounded-[6px] border px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/50 sm:px-5 sm:py-2.5"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-light-100 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a strong password"
                required
                className="bg-dark-200 text-light-100 border-border-dark w-full rounded-[6px] border px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/50 sm:px-5 sm:py-2.5"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-dark-100 mt-2 w-full cursor-pointer rounded-[6px] px-4 py-3 text-base font-bold transition-colors sm:py-2.5 sm:text-lg"
            >
              Create Account
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center">
            <p className="text-light-200 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium transition-all">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

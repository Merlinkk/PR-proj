import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"></div>
      
      {/* Minimal floating elements */}
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-sm min-w-lg md:min-w-[450px]">
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">Admin Login</h1>
            <p className="text-zinc-400 text-sm">Sign in to your account</p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-zinc-300">
                Email
              </Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full h-12 px-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-500 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-sm font-medium text-zinc-300">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full h-12 px-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-500 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>

            <SubmitButton 
              pendingText="Authenticating..." 
              formAction={signInAction}
              className="w-full h-12 bg-white text-zinc-900 font-medium rounded-xl hover:bg-zinc-100 transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-white/20"
            >
              Sign In
            </SubmitButton>

            <FormMessage message={searchParams} />
          </form>
        </div>
      </div>
    </div>
  );
}
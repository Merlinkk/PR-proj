import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"></div>
      
      {/* Minimal floating elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-sm min-w-lg md:min-w-[450px]">
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">Reset Password</h1>
            <p className="text-zinc-400 text-sm">We'll send you a reset link</p>
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

            <SubmitButton 
              formAction={forgotPasswordAction}
              className="w-full h-12 bg-white text-zinc-900 font-medium rounded-xl hover:bg-zinc-100 transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-white/20"
            >
              Send Reset Link
            </SubmitButton>

            <FormMessage message={searchParams} />
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center">
            <p className="text-sm text-zinc-400">
              Remember your password?{" "}
              <Link 
                href="/admin"
                className="text-white hover:text-zinc-300 transition-colors duration-200 font-medium"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto min-h-screen">
      <div className="w-full bg-card rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-medium text-center mb-8">Admin Login</h1>
        
        <form className="flex flex-col space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input 
              name="email" 
              placeholder="you@example.com" 
              className="w-full rounded-md" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Link
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              className="w-full rounded-md"
              required
            />
          </div>
          
          <SubmitButton 
            pendingText="Authenticating..." 
            formAction={signInAction}
            className="w-full mt-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors rounded-md"
          >
            Login
          </SubmitButton>
          
          <FormMessage message={searchParams} />
        </form>
      </div>
    </div>
  );
}
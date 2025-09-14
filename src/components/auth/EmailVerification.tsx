import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthCard } from './AuthCard'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Mail, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type EmailForm = z.infer<typeof emailSchema>

export const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { resendVerification } = useAuth()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  })

  const onSubmit = async (data: EmailForm) => {
    setIsLoading(true)
    try {
      await resendVerification(data.email)
      setEmailSent(true)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send verification email",
        description: error instanceof Error ? error.message : "Please try again later",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard>
      <div className="space-y-6">
        {emailSent ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-success/10 p-3">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Verification Email Sent</h1>
              <p className="text-muted-foreground">
                We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
              </p>
            </div>
            <div className="pt-4">
              <Link to="/sign-in">
                <Button variant="outline" className="w-full">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Verify Your Email
              </h1>
              <p className="text-muted-foreground">
                Enter your email address to receive a verification link
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Verification Email"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Remember your password? </span>
              <Link to="/sign-in" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthCard>
  )
}
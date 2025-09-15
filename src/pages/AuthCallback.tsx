import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { AuthCard } from '@/components/auth/AuthCard'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const AuthCallback = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          setStatus('error')
          setMessage(error.message)
          return
        }

        if (data.session) {
          setStatus('success')
          setMessage('Email verified successfully!')
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            navigate('/dashboard')
          }, 2000)
        } else {
          setStatus('error')
          setMessage('No session found. Please try signing in again.')
        }
      } catch (error) {
        console.error('Callback error:', error)
        setStatus('error')
        setMessage('An unexpected error occurred.')
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <AuthCard>
      <div className="text-center space-y-6">
        {status === 'loading' && (
          <>
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Verifying your email...</h1>
              <p className="text-muted-foreground">
                Please wait while we confirm your email address.
              </p>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="flex justify-center">
              <div className="rounded-full bg-success/10 p-3">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-success">Email Verified!</h1>
              <p className="text-muted-foreground">
                {message}
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecting you to your dashboard...
              </p>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-3">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-destructive">Verification Failed</h1>
                <p className="text-muted-foreground">
                  {message}
                </p>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={() => navigate('/sign-in')}
                  className="w-full"
                >
                  Back to Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/verify-email')}
                  className="w-full"
                >
                  Resend Verification Email
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </AuthCard>
  )
}
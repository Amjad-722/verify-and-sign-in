import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthCard } from '@/components/auth/AuthCard'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const VerifyConfirm = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success'>('loading')
  
  const email = searchParams.get('email')
  const token = searchParams.get('token')

  useEffect(() => {
    // Simulate verification process
    const timer = setTimeout(() => {
      setStatus('success')
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    // Navigate to sign-up form with email pre-filled and verification status
    navigate(`/sign-up?email=${encodeURIComponent(email || '')}&verified=true&token=${encodeURIComponent(token || '')}`)
  }

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
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-green-600">Email Verified!</h1>
                <p className="text-muted-foreground">
                  Great! Your email <strong>{email}</strong> has been verified.
                </p>
                <p className="text-sm text-muted-foreground">
                  Now let's complete your account setup.
                </p>
              </div>
              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              >
                Complete Registration
              </Button>
            </div>
          </>
        )}
      </div>
    </AuthCard>
  )
}
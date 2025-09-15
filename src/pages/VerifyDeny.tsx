import { AuthCard } from '@/components/auth/AuthCard'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const VerifyDeny = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  return (
    <AuthCard>
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-red-600">Verification Declined</h1>
            <p className="text-muted-foreground">
              Thanks for letting us know this wasn't you.
            </p>
            <p className="text-sm text-muted-foreground">
              The verification request for <strong>{email}</strong> has been cancelled.
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Security Note:</strong> If you didn't request this verification, someone may be trying to use your email address. Please keep your email secure.
            </p>
          </div>
          
          <div className="space-y-2">
            <Button
              onClick={() => navigate('/')}
              className="w-full"
            >
              Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/sign-in')}
              className="w-full"
            >
              Sign In to Existing Account
            </Button>
          </div>
        </div>
      </div>
    </AuthCard>
  )
}
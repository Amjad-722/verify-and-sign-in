import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { LogOut, User, Mail, CheckCircle, XCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export const Dashboard = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again.",
      })
    }
  }

  const isEmailVerified = user?.email_confirmed_at !== null

  return (
    <div className="min-h-screen bg-auth-background">
      <header className="border-b bg-auth-card backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome back!</h2>
              <p className="text-muted-foreground">
                Here's your account information
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-auth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Email Address</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">{user?.email}</div>
                <div className="flex items-center space-x-2 mt-2">
                  {isEmailVerified ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-success" />
                      <Badge variant="secondary" className="text-success bg-success/10">
                        Verified
                      </Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-destructive" />
                      <Badge variant="secondary" className="text-destructive bg-destructive/10">
                        Unverified
                      </Badge>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-auth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">Active</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Account created and ready to use
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-auth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User ID</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-mono bg-muted p-2 rounded">
                  {user?.id}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Your unique identifier
                </p>
              </CardContent>
            </Card>
          </div>

          {!isEmailVerified && (
            <Card className="border-destructive/20 bg-destructive/5 shadow-auth">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-destructive">
                      Email verification required
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Please verify your email address to access all features. Check your inbox for a verification link.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => navigate('/verify-email')}
                    >
                      Resend verification email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
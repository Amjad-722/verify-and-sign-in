import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Mail, Shield, Zap, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-auth-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Secure Authentication
                </span>
                <br />
                <span className="text-foreground">Made Simple</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience seamless login with email verification powered by Resend.com. 
                Your security is our priority with modern authentication flows.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up">
                <Button variant="outline" size="lg" className="px-8 bg-sky-500 hover:translate-y-2 transition-transform">
                  Get Started
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button variant="outline" size="lg" className="px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Why Choose Our Authentication?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with modern security practices and user experience in mind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-auth border-0 bg-auth-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Email Verification</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Secure email verification powered by Resend.com ensures your account is protected and legitimate.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-auth border-0 bg-auth-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure by Design</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built on Supabase with industry-standard security practices and encrypted data storage.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-auth border-0 bg-auth-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Optimized authentication flows that get you signed in quickly without compromising security.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to secure your account
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold">Create Account</h3>
              <p className="text-muted-foreground">
                Sign up with your email address and create a secure password
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold">Verify Email</h3>
              <p className="text-muted-foreground">
                Check your inbox for a verification email and click the link
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-success text-success-foreground w-12 h-12 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Start Using</h3>
              <p className="text-muted-foreground">
                Access your secure dashboard and enjoy all features
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who trust our secure authentication system
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sign-up">
              <Button size="lg" className="bg-gray-400 hover:opacity-90 transition-opacity px-8">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

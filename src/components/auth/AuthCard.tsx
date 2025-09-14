import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AuthCardProps {
  children: React.ReactNode
  className?: string
}

export const AuthCard = ({ children, className }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-auth-background px-4">
      <div className="w-full max-w-md">
        <Card className={cn(
          "p-8 shadow-auth border-0 bg-auth-card backdrop-blur-sm",
          "animate-in fade-in-50 slide-in-from-bottom-4 duration-500",
          className
        )}>
          {children}
        </Card>
      </div>
    </div>
  )
}
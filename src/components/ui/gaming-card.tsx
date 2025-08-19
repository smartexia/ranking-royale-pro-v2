import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface GamingCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "tournament" | "team" | "ranking";
}

const GamingCard = ({ children, className, variant = "default" }: GamingCardProps) => {
  const variants = {
    default: "bg-gradient-card border-gaming-primary/20 shadow-gaming",
    tournament: "bg-gradient-card border-gaming-accent/30 shadow-accent hover:shadow-accent/60 transition-all duration-300 hover:scale-[1.02]",
    team: "bg-gradient-card border-gaming-primary/30 shadow-gaming hover:shadow-gaming-lg transition-all duration-300",
    ranking: "bg-gradient-card border-gaming-accent/20 shadow-accent"
  };

  return (
    <Card className={cn(
      "border backdrop-blur-sm transition-all duration-300",
      variants[variant],
      className
    )}>
      {children}
    </Card>
  );
};

const GamingCardHeader = ({ children, className, ...props }: React.ComponentProps<typeof CardHeader>) => (
  <CardHeader className={cn("font-gaming", className)} {...props}>
    {children}
  </CardHeader>
);

const GamingCardTitle = ({ children, className, ...props }: React.ComponentProps<typeof CardTitle>) => (
  <CardTitle className={cn("font-gaming text-gaming-primary", className)} {...props}>
    {children}
  </CardTitle>
);

const GamingCardDescription = ({ children, className, ...props }: React.ComponentProps<typeof CardDescription>) => (
  <CardDescription className={cn("font-gaming-body text-muted-foreground", className)} {...props}>
    {children}
  </CardDescription>
);

const GamingCardContent = ({ children, className, ...props }: React.ComponentProps<typeof CardContent>) => (
  <CardContent className={cn("font-gaming-body", className)} {...props}>
    {children}
  </CardContent>
);

export { GamingCard, GamingCardHeader, GamingCardTitle, GamingCardDescription, GamingCardContent };
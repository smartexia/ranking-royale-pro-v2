import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GamingCard, GamingCardContent, GamingCardDescription, GamingCardHeader, GamingCardTitle } from '@/components/ui/gaming-card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, GamepadIcon } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, signIn } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Login Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Login Successful!",
          description: "Welcome back to RankingRoyale!"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GamepadIcon className="w-8 h-8 text-gaming-primary" />
            <h1 className="font-gaming text-3xl font-bold text-gaming-primary">RankingRoyale</h1>
          </div>
          <p className="font-gaming-body text-muted-foreground">
            Entre na sua conta
          </p>
        </div>

        <GamingCard variant="tournament">
          <GamingCardHeader>
            <GamingCardTitle className="text-center">
              Login
            </GamingCardTitle>
            <GamingCardDescription className="text-center">
              Acesse sua conta para gerenciar times e torneios
            </GamingCardDescription>
          </GamingCardHeader>
          
          <GamingCardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-gaming-body">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-gaming-body"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="font-gaming-body">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-gaming-body"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                variant="gaming" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </GamingCardContent>
        </GamingCard>
      </div>
    </div>
  );
};

export default Auth;
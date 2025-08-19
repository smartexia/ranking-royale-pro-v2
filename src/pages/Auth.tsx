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
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Erro no login",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Login realizado!",
            description: "Bem-vindo de volta ao COD Arena!"
          });
        }
      } else {
        if (!username.trim()) {
          toast({
            title: "Username obrigatório",
            description: "Por favor, insira um nome de usuário",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(email, password, username);
        if (error) {
          toast({
            title: "Erro no cadastro",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Cadastro realizado!",
            description: "Verifique seu email para confirmar a conta."
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Algo deu errado. Tente novamente.",
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
            <h1 className="font-gaming text-3xl font-bold text-gaming-primary">COD Arena</h1>
          </div>
          <p className="font-gaming-body text-muted-foreground">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta de jogador'}
          </p>
        </div>

        <GamingCard variant="tournament">
          <GamingCardHeader>
            <GamingCardTitle className="text-center">
              {isLogin ? 'Login' : 'Cadastro'}
            </GamingCardTitle>
            <GamingCardDescription className="text-center">
              {isLogin 
                ? 'Acesse sua conta para gerenciar times e torneios'
                : 'Junte-se à maior plataforma de torneios de COD Mobile'
              }
            </GamingCardDescription>
          </GamingCardHeader>
          
          <GamingCardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="username" className="font-gaming-body">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Seu nome de jogador"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="font-gaming-body"
                    required={!isLogin}
                  />
                </div>
              )}
              
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
                    {isLogin ? 'Entrando...' : 'Cadastrando...'}
                  </>
                ) : (
                  isLogin ? 'Entrar' : 'Criar Conta'
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-gaming-body text-gaming-accent hover:text-gaming-primary transition-colors"
              >
                {isLogin 
                  ? 'Não tem conta? Cadastre-se' 
                  : 'Já tem conta? Faça login'
                }
              </button>
            </div>
          </GamingCardContent>
        </GamingCard>
      </div>
    </div>
  );
};

export default Auth;
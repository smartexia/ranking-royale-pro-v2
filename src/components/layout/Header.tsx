import { Button } from "@/components/ui/button";
import { Trophy, Target, Users, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import codLogo from "@/assets/cod-tournament-logo.png";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="border-b border-gaming-primary/20 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={codLogo} alt="COD Tournament Platform" className="w-10 h-10" />
            <div>
              <h1 className="font-gaming text-xl text-gaming-primary">RANKINGROYALE</h1>
              <p className="text-xs text-muted-foreground font-gaming-body">Tournament Platform</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/tournaments" className="flex items-center gap-2 text-foreground hover:text-gaming-primary transition-colors font-gaming-body">
              <Trophy className="w-4 h-4" />
              Tournaments
            </Link>
            <Link to="/rankings" className="flex items-center gap-2 text-foreground hover:text-gaming-primary transition-colors font-gaming-body">
              <Target className="w-4 h-4" />
              Rankings
            </Link>
            <Link to="/teams" className="flex items-center gap-2 text-foreground hover:text-gaming-primary transition-colors font-gaming-body">
              <Users className="w-4 h-4" />
              Teams
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden md:flex items-center gap-2 font-gaming-body text-gaming-primary text-sm">
                  <User className="w-4 h-4" />
                  {user.user_metadata?.username || user.email?.split('@')[0]}
                </span>
                <Button variant="gaming-outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Sair</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="gaming-outline" size="sm">Login</Button>
                </Link>
                <Link to="/auth">
                  <Button variant="gaming" size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
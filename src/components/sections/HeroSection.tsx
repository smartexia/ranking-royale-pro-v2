import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Users, Zap } from "lucide-react";
import heroBg from "@/assets/gaming-hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-gaming text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-gaming bg-clip-text text-transparent animate-glow">
            RANKINGROYALE
          </h1>
          
          <p className="font-gaming text-xl md:text-2xl text-gaming-primary mb-4">
            Professional Tournament Platform
          </p>
          
          <p className="font-gaming-body text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Organize Call of Duty Mobile tournaments with automated result processing, 
            AI-powered screenshot analysis, and professional rankings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="gaming" size="xl" className="animate-pulse-slow">
              Create Tournament
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="gaming-outline" size="xl">
              View Rankings
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-full bg-gaming-primary/20 border border-gaming-primary/30">
                <Trophy className="w-8 h-8 text-gaming-primary" />
              </div>
              <h3 className="font-gaming text-2xl text-gaming-primary">50+</h3>
              <p className="font-gaming-body text-muted-foreground">Tournaments</p>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-full bg-gaming-accent/20 border border-gaming-accent/30">
                <Users className="w-8 h-8 text-gaming-accent" />
              </div>
              <h3 className="font-gaming text-2xl text-gaming-accent">1000+</h3>
              <p className="font-gaming-body text-muted-foreground">Active Teams</p>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-full bg-gaming-danger/20 border border-gaming-danger/30">
                <Zap className="w-8 h-8 text-gaming-danger" />
              </div>
              <h3 className="font-gaming text-2xl text-gaming-danger">AI</h3>
              <p className="font-gaming-body text-muted-foreground">Powered Results</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
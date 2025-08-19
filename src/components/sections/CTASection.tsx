import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-gaming relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/30 rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/30 rounded-lg rotate-45 animate-pulse delay-700" />
        <div className="absolute bottom-20 left-1/3 w-12 h-12 border border-white/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-32 right-10 w-24 h-24 border border-white/30 rounded-lg rotate-12 animate-pulse delay-500" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
            <h2 className="font-gaming text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Ready to Dominate?
            </h2>
            <Sparkles className="w-8 h-8 text-white animate-pulse delay-500" />
          </div>
          
          <p className="font-gaming-body text-xl text-white/90 mb-8 leading-relaxed">
            Join the next generation of Call of Duty Mobile tournament organization. 
            Create professional tournaments with AI-powered automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="gaming-outline" 
              size="xl" 
              className="bg-white/10 border-white text-white hover:bg-white hover:text-background transition-all duration-300 backdrop-blur-sm"
            >
              Start Free Tournament
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="gaming-outline" 
              size="xl"
              className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              View Demo
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-8 text-white/70 font-gaming-body">
            <div className="flex items-center gap-2">
              ✓ Free to use
            </div>
            <div className="flex items-center gap-2">
              ✓ AI-powered
            </div>
            <div className="flex items-center gap-2">
              ✓ Professional results
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
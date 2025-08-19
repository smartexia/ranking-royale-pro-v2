import { Button } from "@/components/ui/button";
import { Trophy, Github, Twitter, MessageCircle } from "lucide-react";
import codLogo from "@/assets/cod-tournament-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-gaming-primary/20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={codLogo} alt="RankingRoyale" className="w-8 h-8" />
              <div>
                <h3 className="font-gaming text-lg text-gaming-primary">RANKINGROYALE</h3>
                <p className="text-xs text-muted-foreground font-gaming-body">Tournament Platform</p>
              </div>
            </div>
            <p className="font-gaming-body text-sm text-muted-foreground leading-relaxed">
              Professional Call of Duty Mobile tournament organization with AI-powered automation.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tournament */}
          <div className="space-y-4">
            <h4 className="font-gaming text-gaming-primary">Tournament</h4>
            <ul className="space-y-2 font-gaming-body text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-gaming-primary transition-colors">Create Tournament</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gaming-primary transition-colors">Browse Active</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gaming-primary transition-colors">Tournament Rules</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gaming-primary transition-colors">Prize Guidelines</a></li>
            </ul>
          </div>

          {/* Teams */}
          <div className="space-y-4">
            <h4 className="font-gaming text-gaming-primary">Teams</h4>
            <ul className="space-y-2 font-gaming-body text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-gaming-primary transition-colors">Register Team</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gaming-primary transition-colors">Team Rankings</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gaming-primary transition-colors">Player Stats</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gaming-primary transition-colors">Leaderboards</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-gaming text-gaming-primary">Support</h4>
            <ul className="space-y-2 font-gaming-body text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-gaming-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gaming-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gaming-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-gaming-primary transition-colors">Report Issue</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gaming-primary/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="font-gaming-body text-sm text-muted-foreground">
            © 2024 RankingRoyale. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="font-gaming-body text-sm text-muted-foreground hover:text-gaming-primary transition-colors">Privacy</a>
            <a href="#" className="font-gaming-body text-sm text-muted-foreground hover:text-gaming-primary transition-colors">Terms</a>
            <div className="flex items-center gap-1 text-gaming-primary">
              <Trophy className="w-4 h-4" />
              <span className="font-gaming text-sm">Built for Champions</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
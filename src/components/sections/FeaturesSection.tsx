import { GamingCard, GamingCardContent, GamingCardDescription, GamingCardHeader, GamingCardTitle } from "@/components/ui/gaming-card";
import { Brain, Upload, Trophy, Users, BarChart3, Share2 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Results",
    description: "Gemini AI automatically processes screenshots to extract team positions, kills, and match data with high accuracy."
  },
  {
    icon: Upload,
    title: "Smart Upload System",
    description: "Upload multiple screenshots per match. Our system intelligently combines and analyzes all result images."
  },
  {
    icon: Trophy,
    title: "Automated Rankings",
    description: "Real-time point calculation based on configurable rules. Professional rankings updated automatically."
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Easy team registration and management. Support for up to 25 teams per group with flexible tournament structures."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Detailed statistics including kills, survival time, and performance trends for teams and individual players."
  },
  {
    icon: Share2,
    title: "Professional Export",
    description: "Generate beautiful, shareable ranking images with custom branding for social media and community sharing."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-gaming text-4xl md:text-5xl font-bold text-gaming-primary mb-4">
            Platform Features
          </h2>
          <p className="font-gaming-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional tournament management with cutting-edge AI technology and automated workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <GamingCard key={index} variant="default" className="h-full">
              <GamingCardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-lg bg-gaming-primary/20 border border-gaming-primary/30">
                    <feature.icon className="w-6 h-6 text-gaming-primary" />
                  </div>
                  <GamingCardTitle className="text-lg">{feature.title}</GamingCardTitle>
                </div>
              </GamingCardHeader>
              
              <GamingCardContent>
                <GamingCardDescription className="text-base leading-relaxed">
                  {feature.description}
                </GamingCardDescription>
              </GamingCardContent>
            </GamingCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
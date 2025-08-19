import { GamingCard, GamingCardContent, GamingCardDescription, GamingCardHeader, GamingCardTitle } from "@/components/ui/gaming-card";
import { Brain, Upload, Trophy, Users, BarChart3, Share2 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Resultados com IA",
    description: "IA Gemini processa automaticamente screenshots para extrair posições de times, kills e dados de partida com alta precisão."
  },
  {
    icon: Upload,
    title: "Sistema de Upload Inteligente",
    description: "Faça upload de múltiplas screenshots por partida. Nosso sistema combina e analisa inteligentemente todas as imagens de resultado."
  },
  {
    icon: Trophy,
    title: "Rankings Automatizados",
    description: "Cálculo de pontos em tempo real baseado em regras configuráveis. Rankings profissionais atualizados automaticamente."
  },
  {
    icon: Users,
    title: "Gerenciamento de Times",
    description: "Registro e gerenciamento fácil de times. Suporte para até 25 times por grupo com estruturas flexíveis de torneio."
  },
  {
    icon: BarChart3,
    title: "Análises Avançadas",
    description: "Estatísticas detalhadas incluindo kills, tempo de sobrevivência e tendências de performance para times e jogadores individuais."
  },
  {
    icon: Share2,
    title: "Exportação Profissional",
    description: "Gere imagens bonitas e compartilháveis de rankings com marca personalizada para redes sociais e compartilhamento na comunidade."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-gaming text-4xl md:text-5xl font-bold text-gaming-primary mb-4">
            Recursos da Plataforma
          </h2>
          <p className="font-gaming-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Gerenciamento profissional de torneios com tecnologia de IA de ponta e fluxos de trabalho automatizados.
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
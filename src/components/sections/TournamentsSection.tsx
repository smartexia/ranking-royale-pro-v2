import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GamingCard, GamingCardContent, GamingCardDescription, GamingCardHeader, GamingCardTitle } from "@/components/ui/gaming-card";
import { Calendar, Users, Trophy, Clock } from "lucide-react";

const mockTournaments = [
  {
    id: 1,
    name: "BR Masters Championship",
    description: "Torneio profissional de Battle Royale com 25 times por grupo",
    status: "live",
    teams: 75,
    groups: 3,
    prize: "$5,000",
    startDate: "2024-01-20",
    endDate: "2024-01-22"
  },
  {
    id: 2,
    name: "X-Treino Cod Mobile",
    description: "Torneio de treinamento da comunidade para desenvolvimento de habilidades",
    status: "registration",
    teams: 42,
    groups: 2,
    prize: "$1,500",
    startDate: "2024-01-25",
    endDate: "2024-01-26"
  },
  {
    id: 3,
    name: "Elite Squad Championship",
    description: "Torneio competitivo de alto nível para times de elite",
    status: "upcoming",
    teams: 50,
    groups: 2,
    prize: "$3,000",
    startDate: "2024-02-01",
    endDate: "2024-02-03"
  }
];

const TournamentsSection = () => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "live": return "destructive";
      case "registration": return "default";
      case "upcoming": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "live": return "AO VIVO";
      case "registration": return "ABERTO";
      case "upcoming": return "EM BREVE";
      default: return status.toUpperCase();
    }
  };

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-gaming text-4xl md:text-5xl font-bold text-gaming-primary mb-4">
            Torneios Ativos
          </h2>
          <p className="font-gaming-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Participe de torneios competitivos ou crie o seu próprio. Organização profissional com resultados automatizados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockTournaments.map((tournament) => (
            <GamingCard key={tournament.id} variant="tournament" className="group">
              <GamingCardHeader>
                <div className="flex items-start justify-between mb-2">
                  <GamingCardTitle className="text-xl">{tournament.name}</GamingCardTitle>
                  <Badge variant={getStatusVariant(tournament.status)} className="font-gaming">
                    {getStatusText(tournament.status)}
                  </Badge>
                </div>
                <GamingCardDescription>
                  {tournament.description}
                </GamingCardDescription>
              </GamingCardHeader>
              
              <GamingCardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gaming-accent" />
                      <span className="text-sm font-gaming-body">{tournament.teams} Times</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-gaming-primary" />
                      <span className="text-sm font-gaming-body">{tournament.prize}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gaming-accent" />
                    <span className="text-sm font-gaming-body">
                      {tournament.startDate} - {tournament.endDate}
                    </span>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      variant={tournament.status === "live" ? "gaming-danger" : "gaming"} 
                      className="w-full group-hover:scale-105 transition-transform"
                    >
                      {tournament.status === "live" ? "Ver Ao Vivo" : 
                       tournament.status === "registration" ? "Registrar Time" : "Ver Detalhes"}
                    </Button>
                  </div>
                </div>
              </GamingCardContent>
            </GamingCard>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="gaming-outline" size="lg">
            Ver Todos os Torneios
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TournamentsSection;
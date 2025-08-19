import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GamingCard, GamingCardContent, GamingCardDescription, GamingCardHeader, GamingCardTitle } from '@/components/ui/gaming-card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TournamentModal from '@/components/ui/tournament-modal';
import { Calendar, Users, Trophy, Clock, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

import { Championship } from '@/types';

interface TournamentChampionship extends Championship {
  prize_pool: string;
  max_teams_per_group: number;
  number_of_groups: number;
  start_date: string;
  end_date: string;
  organizer: {
    username: string;
    full_name: string;
  };
  team_count: number;
}

const Tournaments = () => {
  const [championships, setChampionships] = useState<TournamentChampionship[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTournament, setSelectedTournament] = useState<TournamentChampionship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchChampionships = useCallback(async () => {
    try {
      // Dados mockados para demonstração
      const mockData: TournamentChampionship[] = [
        {
          id: '1',
          name: 'BR Masters Championship 2024',
          description: 'Campeonato profissional de Battle Royale com 25 times por grupo',
          status: 'active',
          prize_pool: 'R$ 15.000',
          max_teams_per_group: 25,
          number_of_groups: 3,
          start_date: '2024-01-20T10:00:00Z',
          end_date: '2024-01-22T18:00:00Z',
          organizer: {
            username: 'admin_br',
            full_name: 'Administrador BR'
          },
          team_count: 75,
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          name: 'X-Treino Favela Cup',
          description: 'Torneio comunitário de treinamento para desenvolvimento de habilidades',
          status: 'registration',
          prize_pool: 'R$ 3.500',
          max_teams_per_group: 20,
          number_of_groups: 2,
          start_date: '2024-01-25T14:00:00Z',
          end_date: '2024-01-26T20:00:00Z',
          organizer: {
            username: 'xtreino_org',
            full_name: 'X-Treino Organização'
          },
          team_count: 42,
          created_at: '2024-01-18T15:30:00Z'
        },
        {
          id: '3',
          name: 'Elite Squad Championship',
          description: 'Torneio competitivo de alto nível para times de elite',
          status: 'upcoming',
          prize_pool: 'R$ 8.000',
          max_teams_per_group: 25,
          number_of_groups: 2,
          start_date: '2024-02-01T16:00:00Z',
          end_date: '2024-02-03T22:00:00Z',
          organizer: {
            username: 'elite_gaming',
            full_name: 'Elite Gaming Organization'
          },
          team_count: 50,
          created_at: '2024-01-20T12:00:00Z'
        },
        {
          id: '4',
          name: 'Rookie Challenge',
          description: 'Torneio especial para times iniciantes e novos jogadores',
          status: 'completed',
          prize_pool: 'R$ 2.000',
          max_teams_per_group: 15,
          number_of_groups: 2,
          start_date: '2024-01-10T10:00:00Z',
          end_date: '2024-01-12T18:00:00Z',
          organizer: {
            username: 'rookie_org',
            full_name: 'Rookie Organization'
          },
          team_count: 30,
          created_at: '2024-01-05T09:00:00Z'
        }
      ];

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setChampionships(mockData);
    } catch (error: unknown) {
      toast({
        title: "Erro ao carregar torneios",
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchChampionships();
  }, []);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "destructive";
      case "registration": return "default";
      case "completed": return "secondary";
      default: return "secondary";
    }
  };

  const handleTournamentClick = (tournament: TournamentChampionship) => {
    setSelectedTournament(tournament);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTournament(null);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "ATIVO";
      case "registration": return "INSCRIÇÕES";
      case "completed": return "FINALIZADO";
      case "cancelled": return "CANCELADO";
      default: return status.toUpperCase();
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'A definir';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gaming-primary mx-auto"></div>
            <p className="font-gaming-body text-muted-foreground mt-4">Carregando torneios...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="font-gaming text-4xl md:text-5xl font-bold text-gaming-primary mb-4">
                Torneios
              </h1>
              <p className="font-gaming-body text-lg text-muted-foreground max-w-2xl">
                Explore todos os torneios disponíveis ou crie o seu próprio campeonato.
              </p>
            </div>
            
            {user && (
              <Button variant="gaming" size="lg" className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Criar Torneio
              </Button>
            )}
          </div>

          {championships.length === 0 ? (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-gaming text-2xl text-muted-foreground mb-2">
                Nenhum torneio encontrado
              </h3>
              <p className="font-gaming-body text-muted-foreground">
                Seja o primeiro a criar um torneio épico!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {championships.map((championship) => (
                <GamingCard key={championship.id} variant="tournament" className="group">
                  <GamingCardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <GamingCardTitle className="text-xl">{championship.name}</GamingCardTitle>
                      <Badge variant={getStatusVariant(championship.status)} className="font-gaming">
                        {getStatusText(championship.status)}
                      </Badge>
                    </div>
                    <GamingCardDescription>
                      {championship.description || 'Torneio profissional de Call of Duty Mobile'}
                    </GamingCardDescription>
                  </GamingCardHeader>
                  
                  <GamingCardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gaming-accent" />
                          <span className="text-sm font-gaming-body">
                            {championship.team_count}/{championship.max_teams_per_group * championship.number_of_groups} Times
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-gaming-primary" />
                          <span className="text-sm font-gaming-body">
                            {championship.prize_pool || 'Sem premiação'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gaming-accent" />
                        <span className="text-sm font-gaming-body">
                          {formatDate(championship.start_date)} - {formatDate(championship.end_date)}
                        </span>
                      </div>
                      
                      <div className="text-xs font-gaming-body text-muted-foreground">
                        Organizado por: {championship.organizer?.username || championship.organizer?.full_name || 'COD Arena'}
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          variant={championship.status === "active" ? "gaming-danger" : "gaming"} 
                          className="w-full group-hover:scale-105 transition-transform"
                          onClick={() => handleTournamentClick(championship)}
                        >
                          {championship.status === "active" ? "Ver Ao Vivo" : 
                           championship.status === "registration" ? "Inscrever Time" : "Ver Detalhes"}
                        </Button>
                      </div>
                    </div>
                  </GamingCardContent>
                </GamingCard>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
      
      <TournamentModal 
        tournament={selectedTournament}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Tournaments;
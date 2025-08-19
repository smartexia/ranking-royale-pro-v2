import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GamingCard, GamingCardContent, GamingCardHeader, GamingCardTitle } from '@/components/ui/gaming-card';
import { Trophy, Medal, Award, Crown, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RankingData, Championship, TeamStats } from '@/types';

const Rankings = () => {
  const [rankings, setRankings] = useState<RankingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChampionship, setSelectedChampionship] = useState<string>('all');
  const [championships, setChampionships] = useState<Championship[]>([]);
  const { toast } = useToast();

  const fetchChampionships = useCallback(async () => {
    try {
      // Dados mockados para demonstração
      const mockChampionships: Championship[] = [
        {
          id: '1',
          name: 'BR Masters Championship 2024',
          status: 'active'
        },
        {
          id: '2',
          name: 'X-Treino Cod Mobile',
          status: 'registration'
        },
        {
          id: '3',
          name: 'Elite Squad Championship',
          status: 'upcoming'
        },
        {
          id: '4',
          name: 'Rookie Challenge',
          status: 'completed'
        }
      ];

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setChampionships(mockChampionships);
    } catch (error: unknown) {
      toast({
        title: "Erro ao carregar campeonatos",
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: "destructive"
      });
    }
  }, [toast]);

  const fetchRankings = useCallback(async () => {
    try {
      setLoading(true);
      
      // Dados mockados para demonstração
      const mockRankingData: RankingData[] = [
        {
          position: 1,
          team_name: 'Venom Squad',
          team_tag: 'VNM',
          championship_name: championships.find(c => c.id === selectedChampionship)?.name || 'BR Masters Championship 2024',
          championship_id: selectedChampionship,
          total_points: 245,
          total_kills: 89,
          matches_played: 12,
          positions: [1, 2, 1, 3, 1, 2, 1, 4, 2, 1, 3, 1],
          avg_position: 1.8
        },
        {
          position: 2,
          team_name: 'Thunder Wolves',
          team_tag: 'TWF',
          championship_name: championships.find(c => c.id === selectedChampionship)?.name || 'BR Masters Championship 2024',
          championship_id: selectedChampionship,
          total_points: 238,
          total_kills: 92,
          matches_played: 12,
          positions: [2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 1, 2],
          avg_position: 1.8
        },
        {
          position: 3,
          team_name: 'Phoenix Rising',
          team_tag: 'PHX',
          championship_name: championships.find(c => c.id === selectedChampionship)?.name || 'BR Masters Championship 2024',
          championship_id: selectedChampionship,
          total_points: 221,
          total_kills: 78,
          matches_played: 12,
          positions: [3, 4, 2, 2, 3, 3, 2, 1, 4, 3, 2, 3],
          avg_position: 2.7
        },
        {
          position: 4,
          team_name: 'Shadow Hunters',
          team_tag: 'SHD',
          championship_name: championships.find(c => c.id === selectedChampionship)?.name || 'BR Masters Championship 2024',
          championship_id: selectedChampionship,
          total_points: 215,
          total_kills: 85,
          matches_played: 12,
          positions: [4, 3, 4, 4, 4, 4, 4, 3, 3, 4, 4, 4],
          avg_position: 3.8
        },
        {
          position: 5,
          team_name: 'Elite Force',
          team_tag: 'ELT',
          championship_name: championships.find(c => c.id === selectedChampionship)?.name || 'BR Masters Championship 2024',
          championship_id: selectedChampionship,
          total_points: 198,
          total_kills: 71,
          matches_played: 12,
          positions: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
          avg_position: 5.0
        },
        {
          position: 6,
          team_name: 'Storm Breakers',
          team_tag: 'STM',
          championship_name: championships.find(c => c.id === selectedChampionship)?.name || 'BR Masters Championship 2024',
          championship_id: selectedChampionship,
          total_points: 187,
          total_kills: 68,
          matches_played: 12,
          positions: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
          avg_position: 6.0
        },
        {
          position: 7,
          team_name: 'Cyber Ninjas',
          team_tag: 'CYB',
          championship_name: championships.find(c => c.id === selectedChampionship)?.name || 'BR Masters Championship 2024',
          championship_id: selectedChampionship,
          total_points: 176,
          total_kills: 64,
          matches_played: 12,
          positions: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
          avg_position: 7.0
        },
        {
          position: 8,
          team_name: 'Iron Eagles',
          team_tag: 'IRN',
          championship_name: championships.find(c => c.id === selectedChampionship)?.name || 'BR Masters Championship 2024',
          championship_id: selectedChampionship,
          total_points: 165,
          total_kills: 59,
          matches_played: 12,
          positions: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
          avg_position: 8.0
        }
      ];

      // Filtrar por campeonato se não for 'all'
      let filteredData = mockRankingData;
      if (selectedChampionship !== 'all') {
        filteredData = mockRankingData.filter(team => team.championship_id === selectedChampionship);
      }

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setRankings(filteredData);
    } catch (error: unknown) {
      toast({
        title: "Erro ao carregar rankings",
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: "destructive"
      });
      setRankings([]);
    } finally {
      setLoading(false);
    }
  }, [selectedChampionship, championships, toast]);

  useEffect(() => {
    fetchChampionships();
    fetchRankings();
  }, [selectedChampionship]);

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <Trophy className="w-5 h-5 text-gaming-accent" />;
    }
  };

  const getPositionBadge = (position: number) => {
    if (position <= 3) return "default";
    if (position <= 10) return "secondary";
    return "outline";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gaming-primary mx-auto"></div>
            <p className="font-gaming-body text-muted-foreground mt-4">Carregando rankings...</p>
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
          <div className="text-center mb-12">
            <h1 className="font-gaming text-4xl md:text-5xl font-bold text-gaming-primary mb-4">
              Rankings
            </h1>
            <p className="font-gaming-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Confira as classificações dos melhores times em todos os torneios.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <Button
              variant={selectedChampionship === 'all' ? 'gaming' : 'gaming-outline'}
              onClick={() => setSelectedChampionship('all')}
            >
              Todos os Torneios
            </Button>
            {championships.map((championship) => (
              <Button
                key={championship.id}
                variant={selectedChampionship === championship.id ? 'gaming' : 'gaming-outline'}
                onClick={() => setSelectedChampionship(championship.id)}
              >
                {championship.name}
              </Button>
            ))}
          </div>

          {rankings.length === 0 ? (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-gaming text-2xl text-muted-foreground mb-2">
                Nenhum ranking disponível
              </h3>
              <p className="font-gaming-body text-muted-foreground">
                Os rankings aparecerão após os primeiros resultados serem registrados.
              </p>
            </div>
          ) : (
            <>
              {/* Top 3 */}
              {rankings.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {rankings.slice(0, 3).map((team, index) => (
                    <GamingCard 
                      key={`${team.team_name}-${team.championship_id}`} 
                      variant={index === 0 ? "tournament" : "team"}
                      className="group hover:scale-105 transition-transform"
                    >
                      <GamingCardHeader>
                        <div className="text-center">
                          <div className="flex justify-center mb-2">
                            {getPositionIcon(team.position)}
                          </div>
                          <GamingCardTitle className="text-xl">
                            {team.team_tag ? `[${team.team_tag}] ${team.team_name}` : team.team_name}
                          </GamingCardTitle>
                          <Badge variant={getPositionBadge(team.position)} className="font-gaming">
                            #{team.position}
                          </Badge>
                        </div>
                      </GamingCardHeader>
                      <GamingCardContent>
                        <div className="text-center space-y-2">
                          <div className="text-2xl font-gaming font-bold text-gaming-primary">
                            {team.total_points} pts
                          </div>
                          <div className="text-sm font-gaming-body text-muted-foreground">
                            {team.total_kills} kills • {team.matches_played} partidas
                          </div>
                          <div className="text-xs font-gaming-body text-muted-foreground">
                            Pos. média: {team.avg_position?.toFixed(1) || 'N/A'}
                          </div>
                        </div>
                      </GamingCardContent>
                    </GamingCard>
                  ))}
                </div>
              )}

              {/* Tabela completa */}
              <GamingCard variant="tournament">
                <GamingCardHeader>
                  <div className="flex items-center justify-between">
                    <GamingCardTitle>Classificação Completa</GamingCardTitle>
                    <Button variant="gaming-outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </GamingCardHeader>
                <GamingCardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gaming-accent/20">
                          <th className="text-left py-3 px-4 font-gaming">Pos</th>
                          <th className="text-left py-3 px-4 font-gaming">Time</th>
                          <th className="text-center py-3 px-4 font-gaming">Pontos</th>
                          <th className="text-center py-3 px-4 font-gaming">Kills</th>
                          <th className="text-center py-3 px-4 font-gaming">Partidas</th>
                          <th className="text-center py-3 px-4 font-gaming">Pos. Média</th>
                          {selectedChampionship === 'all' && (
                            <th className="text-left py-3 px-4 font-gaming">Torneio</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {rankings.map((team) => (
                          <tr 
                            key={`${team.team_name}-${team.championship_id}`}
                            className="border-b border-gaming-accent/10 hover:bg-gaming-accent/5 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                {team.position <= 3 ? getPositionIcon(team.position) : (
                                  <span className="font-gaming font-bold text-gaming-primary">
                                    #{team.position}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-gaming font-semibold">
                                  {team.team_tag ? `[${team.team_tag}] ${team.team_name}` : team.team_name}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="font-gaming font-bold text-gaming-primary">
                                {team.total_points}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center font-gaming-body">
                              {team.total_kills}
                            </td>
                            <td className="py-3 px-4 text-center font-gaming-body">
                              {team.matches_played}
                            </td>
                            <td className="py-3 px-4 text-center font-gaming-body">
                              {team.avg_position?.toFixed(1) || 'N/A'}
                            </td>
                            {selectedChampionship === 'all' && (
                              <td className="py-3 px-4 font-gaming-body text-sm text-muted-foreground">
                                {team.championship_name}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GamingCardContent>
              </GamingCard>
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Rankings;
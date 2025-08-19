import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GamingCard, GamingCardContent, GamingCardDescription, GamingCardHeader, GamingCardTitle } from '@/components/ui/gaming-card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Users, Crown, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Team } from '@/types';

interface TeamWithStats extends Team {
  tag: string | null;
  logo_url: string | null;
  players: string[] | null;
  captain: {
    username: string;
    full_name: string;
  };
  tournaments_count: number;
  total_points: number;
}

const Teams = () => {
  const [teams, setTeams] = useState<TeamWithStats[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<TeamWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    const filtered = teams.filter(team => 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.tag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.captain?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchTerm, teams]);

  const fetchTeams = useCallback(async () => {
    try {
      // Dados mockados para demonstração
      const mockTeams: TeamWithStats[] = [
        {
          id: '1',
          name: 'Venom Squad',
          tag: 'VNM',
          logo_url: null,
          players: ['VenomLeader', 'VenomSniper', 'VenomSupport'],
          created_at: '2024-01-10T10:00:00Z',
          captain: {
            username: 'venom_leader',
            full_name: 'João Silva'
          },
          tournaments_count: 8,
          total_points: 1245
        },
        {
          id: '2',
          name: 'Thunder Wolves',
          tag: 'TWF',
          logo_url: null,
          players: ['ThunderAlpha', 'ThunderBeta', 'ThunderGamma'],
          created_at: '2024-01-08T14:30:00Z',
          captain: {
            username: 'thunder_alpha',
            full_name: 'Maria Santos'
          },
          tournaments_count: 6,
          total_points: 1189
        },
        {
          id: '3',
          name: 'Phoenix Rising',
          tag: 'PHX',
          logo_url: null,
          players: ['PhoenixFire', 'PhoenixWing', 'PhoenixTail'],
          created_at: '2024-01-05T16:45:00Z',
          captain: {
            username: 'phoenix_fire',
            full_name: 'Carlos Oliveira'
          },
          tournaments_count: 7,
          total_points: 1098
        },
        {
          id: '4',
          name: 'Shadow Hunters',
          tag: 'SHD',
          logo_url: null,
          players: ['ShadowMaster', 'ShadowBlade', 'ShadowGhost'],
          created_at: '2024-01-12T09:15:00Z',
          captain: {
            username: 'shadow_master',
            full_name: 'Ana Costa'
          },
          tournaments_count: 5,
          total_points: 987
        },
        {
          id: '5',
          name: 'Elite Force',
          tag: 'ELT',
          logo_url: null,
          players: ['EliteCommander', 'EliteSoldier', 'EliteScout'],
          created_at: '2024-01-15T11:20:00Z',
          captain: {
            username: 'elite_commander',
            full_name: 'Pedro Ferreira'
          },
          tournaments_count: 4,
          total_points: 876
        },
        {
          id: '6',
          name: 'Storm Breakers',
          tag: 'STM',
          logo_url: null,
          players: ['StormLord', 'StormRider', 'StormCaller'],
          created_at: '2024-01-18T13:00:00Z',
          captain: {
            username: 'storm_lord',
            full_name: 'Lucia Mendes'
          },
          tournaments_count: 3,
          total_points: 765
        },
        {
          id: '7',
          name: 'Cyber Ninjas',
          tag: 'CYB',
          logo_url: null,
          players: ['CyberSensei', 'CyberShadow', 'CyberBlade'],
          created_at: '2024-01-20T15:30:00Z',
          captain: {
            username: 'cyber_sensei',
            full_name: 'Rafael Lima'
          },
          tournaments_count: 2,
          total_points: 654
        },
        {
          id: '8',
          name: 'Iron Eagles',
          tag: 'IRN',
          logo_url: null,
          players: ['IronWing', 'IronTalon', 'IronEye'],
          created_at: '2024-01-22T17:45:00Z',
          captain: {
            username: 'iron_wing',
            full_name: 'Fernanda Rocha'
          },
          tournaments_count: 1,
          total_points: 543
        },
        {
          id: '9',
          name: 'Flame Warriors',
          tag: 'FLM',
          logo_url: null,
          players: ['FlameKing', 'FlameKnight', 'FlameMage'],
          created_at: '2024-01-25T12:00:00Z',
          captain: {
            username: 'flame_king',
            full_name: 'Bruno Alves'
          },
          tournaments_count: 3,
          total_points: 432
        },
        {
          id: '10',
          name: 'Ice Guardians',
          tag: 'ICE',
          logo_url: null,
          players: ['IceLord', 'IceShield', 'IceSword'],
          created_at: '2024-01-28T08:30:00Z',
          captain: {
            username: 'ice_lord',
            full_name: 'Camila Souza'
          },
          tournaments_count: 2,
          total_points: 321
        }
      ];

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setTeams(mockTeams);
      setFilteredTeams(mockTeams);
    } catch (error: unknown) {
      toast({
        title: "Erro ao carregar times",
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const getTeamBadgeVariant = (tournamentCount: number) => {
    if (tournamentCount >= 5) return "default";
    if (tournamentCount >= 2) return "secondary";
    return "outline";
  };

  const getTeamStatus = (tournamentCount: number) => {
    if (tournamentCount >= 5) return "VETERANO";
    if (tournamentCount >= 2) return "ATIVO";
    return "NOVATO";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gaming-primary mx-auto"></div>
            <p className="font-gaming-body text-muted-foreground mt-4">Carregando times...</p>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h1 className="font-gaming text-4xl md:text-5xl font-bold text-gaming-primary mb-4">
                Times
              </h1>
              <p className="font-gaming-body text-lg text-muted-foreground max-w-2xl">
                Explore os times da comunidade COD Mobile ou crie o seu próprio squad.
              </p>
            </div>
            
            {user && (
              <Button variant="gaming" size="lg" className="flex items-center gap-2 mt-4 md:mt-0">
                <Plus className="w-5 h-5" />
                Criar Time
              </Button>
            )}
          </div>

          {/* Barra de busca */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar times..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-gaming-body"
              />
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <GamingCard variant="team">
              <GamingCardContent className="text-center p-6">
                <div className="text-3xl font-gaming font-bold text-gaming-primary mb-2">
                  {teams.length}
                </div>
                <div className="font-gaming-body text-muted-foreground">
                  Times Registrados
                </div>
              </GamingCardContent>
            </GamingCard>
            
            <GamingCard variant="team">
              <GamingCardContent className="text-center p-6">
                <div className="text-3xl font-gaming font-bold text-gaming-accent mb-2">
                  {teams.filter(t => t.tournaments_count >= 2).length}
                </div>
                <div className="font-gaming-body text-muted-foreground">
                  Times Ativos
                </div>
              </GamingCardContent>
            </GamingCard>
            
            <GamingCard variant="team">
              <GamingCardContent className="text-center p-6">
                <div className="text-3xl font-gaming font-bold text-gaming-primary mb-2">
                  {teams.reduce((sum, team) => sum + (Array.isArray(team.players) ? team.players.length : 0), 0)}
                </div>
                <div className="font-gaming-body text-muted-foreground">
                  Jogadores Total
                </div>
              </GamingCardContent>
            </GamingCard>
          </div>

          {filteredTeams.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-gaming text-2xl text-muted-foreground mb-2">
                {searchTerm ? 'Nenhum time encontrado' : 'Nenhum time cadastrado'}
              </h3>
              <p className="font-gaming-body text-muted-foreground">
                {searchTerm 
                  ? 'Tente buscar por outro termo.'
                  : 'Seja o primeiro a criar um time e dominar os rankings!'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((team) => (
                <GamingCard key={team.id} variant="team" className="group">
                  <GamingCardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <GamingCardTitle className="text-xl">
                          {team.tag ? `[${team.tag}] ${team.name}` : team.name}
                        </GamingCardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Crown className="w-4 h-4 text-gaming-accent" />
                          <span className="text-sm font-gaming-body text-muted-foreground">
                            {team.captain?.username || team.captain?.full_name || 'Capitão'}
                          </span>
                        </div>
                      </div>
                      <Badge variant={getTeamBadgeVariant(team.tournaments_count)} className="font-gaming">
                        {getTeamStatus(team.tournaments_count)}
                      </Badge>
                    </div>
                    <GamingCardDescription>
                      Time competitivo de Call of Duty Mobile
                    </GamingCardDescription>
                  </GamingCardHeader>
                  
                  <GamingCardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gaming-accent" />
                          <span className="text-sm font-gaming-body">
                            {Array.isArray(team.players) ? team.players.length : 0} Jogadores
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-gaming-primary" />
                          <span className="text-sm font-gaming-body">
                            {team.total_points} pts
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm font-gaming-body text-muted-foreground">
                        {team.tournaments_count} torneios participados
                      </div>
                      
                      <div className="text-xs font-gaming-body text-muted-foreground">
                        Criado em {new Date(team.created_at).toLocaleDateString('pt-BR')}
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          variant="gaming-outline" 
                          className="w-full group-hover:scale-105 transition-transform"
                        >
                          Ver Perfil
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
    </div>
  );
};

export default Teams;
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
import TeamCreateModal from '@/components/ui/team-create-modal';
import TeamProfileModal from '@/components/ui/team-profile-modal';

interface TeamWithStats extends Team {
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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamWithStats | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      
      // Verificar se as variáveis de ambiente estão disponíveis
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
        throw new Error('Variáveis de ambiente do Supabase não configuradas');
      }
      
      console.log('🔍 [DEBUG] Iniciando busca de times...');
      
      // Implementar timeout para a query
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout na conexão com o banco de dados')), 10000);
      });
      
      const queryPromise = supabase
        .from('teams')
        .select(`
          id,
          name,
          tag,
          logo_url,
          players,
          created_at,
          captain_id
        `)
        .order('created_at', { ascending: false });
      
      // Executar query com timeout
      const { data: teamsData, error } = await Promise.race([queryPromise, timeoutPromise]) as any;

      if (error) {
        console.error('❌ [ERROR] Erro na query de times:', error);
        
        // Implementar fallback com dados mock em caso de erro
        const mockTeams: TeamWithStats[] = [
          {
            id: 'mock-1',
            name: 'Time de Exemplo',
            tag: 'DEMO',
            logo_url: null,
            players: ['Player1', 'Player2', 'Player3'],
            created_at: new Date().toISOString(),
            captain_id: 'mock-captain',
            captain: { username: 'Capitão', full_name: 'Capitão Demo' },
            tournaments_count: 0,
            total_points: 0
          }
        ];
        
        console.log('⚠️ [WARNING] Usando dados de fallback devido ao erro');
        setTeams(mockTeams);
        setFilteredTeams(mockTeams);
        
        toast({
          title: "Erro ao carregar times",
          description: "Não foi possível conectar ao banco de dados. Mostrando dados de exemplo.",
          variant: "destructive"
        });
        
        return;
      }

      // Transformar os dados para o formato esperado
      const transformedTeams: TeamWithStats[] = (teamsData || []).map(team => ({
        ...team,
        captain: { username: 'N/A', full_name: 'N/A' },
        tournaments_count: 0,
        total_points: 0
      }));
      
      console.log('✅ [SUCCESS] Times carregados:', transformedTeams.length);
      setTeams(transformedTeams);
      setFilteredTeams(transformedTeams);
      
    } catch (error: unknown) {
      console.error('❌ [ERROR] Erro geral ao buscar times:', error);
      
      // Implementar fallback também no catch geral
      const mockTeams: TeamWithStats[] = [
        {
          id: 'mock-1',
          name: 'Time de Exemplo',
          tag: 'DEMO',
          logo_url: null,
          players: ['Player1', 'Player2', 'Player3'],
          created_at: new Date().toISOString(),
          captain_id: 'mock-captain',
          captain: { username: 'Capitão', full_name: 'Capitão Demo' },
          tournaments_count: 0,
          total_points: 0
        }
      ];
      
      console.log('⚠️ [WARNING] Usando dados de fallback devido ao erro geral');
      setTeams(mockTeams);
      setFilteredTeams(mockTeams);
      
      toast({
        title: "Erro ao carregar times",
        description: error instanceof Error ? error.message : "Erro desconhecido. Mostrando dados de exemplo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams, refreshTrigger]);

  useEffect(() => {
    const filtered = teams.filter(team => 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.tag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.captain?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchTerm, teams]);

  const handleCreateTeam = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para criar um time.",
        variant: "destructive"
      });
      return;
    }
    
    setShowCreateModal(true);
  };

  const handleTeamCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleViewTeamProfile = (team: TeamWithStats) => {
    setSelectedTeam(team);
  };

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
              <Button 
                variant="gaming" 
                size="lg" 
                className="flex items-center gap-2 mt-4 md:mt-0"
                onClick={handleCreateTeam}
              >
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
                          onClick={() => handleViewTeamProfile(team)}
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

      {/* Modal de criação de time */}
      <TeamCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onTeamCreated={handleTeamCreated}
      />

      {/* Modal de visualização de perfil do time */}
      <TeamProfileModal
        isOpen={!!selectedTeam}
        onClose={() => setSelectedTeam(null)}
        team={selectedTeam}
      />
    </div>
  );
};

export default Teams;
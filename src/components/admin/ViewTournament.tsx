import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { 
  Trophy, 
  Users, 
  Calendar, 
  MapPin,
  Clock,
  Target,
  Crown,
  Medal,
  Award,
  UserPlus,
  Eye,
  Zap,
  TrendingUp,
  Star
} from 'lucide-react';

interface Team {
  id: string;
  name: string;
  players: string[];
  totalPoints: number;
  totalKills: number;
  gamesPlayed: number;
  avgPlacement: number;
  trend: 'up' | 'down' | 'stable';
}

interface TournamentInfo {
  id: string;
  name: string;
  description: string;
  status: 'upcoming' | 'live' | 'finished';
  currentGame: number;
  totalGames: number;
  registeredTeams: number;
  maxTeams: number;
  prizePool: number;
  startDate: string;
  endDate: string;
  gameMode: string;
  currentMap: string;
  nextMap: string;
}

const ViewTournament = () => {
  const [selectedTournament] = useState<TournamentInfo>({
    id: '1',
    name: 'Elite Series #6',
    description: 'Campeonato oficial da temporada com premiação de R$ 5.000',
    status: 'live',
    currentGame: 3,
    totalGames: 6,
    registeredTeams: 75,
    maxTeams: 100,
    prizePool: 5000,
    startDate: '2024-01-15T19:00:00',
    endDate: '2024-01-15T23:00:00',
    gameMode: 'Battle Royale',
    currentMap: 'Blackout',
    nextMap: 'Nuketown'
  });

  const [teams] = useState<Team[]>([
    {
      id: '1',
      name: 'Thunder Wolves',
      players: ['Player1', 'Player2', 'Player3'],
      totalPoints: 87,
      totalKills: 23,
      gamesPlayed: 3,
      avgPlacement: 2.3,
      trend: 'up'
    },
    {
      id: '2',
      name: 'Cyber Eagles',
      players: ['Eagle1', 'Eagle2', 'Eagle3'],
      totalPoints: 82,
      totalKills: 19,
      gamesPlayed: 3,
      avgPlacement: 3.1,
      trend: 'stable'
    },
    {
      id: '3',
      name: 'Neon Hunters',
      players: ['Hunter1', 'Hunter2', 'Hunter3'],
      totalPoints: 78,
      totalKills: 21,
      gamesPlayed: 3,
      avgPlacement: 4.2,
      trend: 'down'
    },
    {
      id: '4',
      name: 'Storm Riders',
      players: ['Storm1', 'Storm2', 'Storm3'],
      totalPoints: 75,
      totalKills: 18,
      gamesPlayed: 3,
      avgPlacement: 5.1,
      trend: 'up'
    },
    {
      id: '5',
      name: 'Shadow Force',
      players: ['Shadow1', 'Shadow2', 'Shadow3'],
      totalPoints: 71,
      totalKills: 16,
      gamesPlayed: 3,
      avgPlacement: 6.3,
      trend: 'stable'
    }
  ]);

  const [registrationForm, setRegistrationForm] = useState({
    teamName: '',
    player1: '',
    player2: '',
    player3: '',
    contactEmail: '',
    discordTag: ''
  });

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'finished': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-300" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-gray-400 font-bold text-sm">{position}</span>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const handleRegistration = () => {
    console.log('Registrando equipe:', registrationForm);
    setIsRegistrationOpen(false);
    // TODO: Implementar registro da equipe
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Visualizar Campeonato
            </h1>
            <p className="text-gray-400 mt-2">Acompanhe a classificação e estatísticas em tempo real</p>
          </div>
        </div>
        
        <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold">
              <UserPlus className="w-4 h-4 mr-2" />
              Inscrever Equipe
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Inscrever Equipe
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Preencha os dados da sua equipe para participar do campeonato
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="teamName" className="text-gray-300">Nome da Equipe</Label>
                <Input
                  id="teamName"
                  value={registrationForm.teamName}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, teamName: e.target.value }))}
                  placeholder="Ex: Thunder Wolves"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label className="text-gray-300">Jogadores</Label>
                <Input
                  value={registrationForm.player1}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, player1: e.target.value }))}
                  placeholder="Jogador 1"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Input
                  value={registrationForm.player2}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, player2: e.target.value }))}
                  placeholder="Jogador 2"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Input
                  value={registrationForm.player3}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, player3: e.target.value }))}
                  placeholder="Jogador 3"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-gray-300">Email de Contato</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={registrationForm.contactEmail}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                  placeholder="equipe@email.com"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discordTag" className="text-gray-300">Discord (Opcional)</Label>
                <Input
                  id="discordTag"
                  value={registrationForm.discordTag}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, discordTag: e.target.value }))}
                  placeholder="usuario#1234"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleRegistration}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Confirmar Inscrição
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsRegistrationOpen(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800/50"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Leaderboard */}
        <div className="lg:col-span-3">
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    Classificação Geral
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-1">
                    Top 3 em destaque • Atualização em tempo real
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(selectedTournament.status)}>
                  {selectedTournament.status === 'live' && <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />}
                  {selectedTournament.status === 'live' ? 'AO VIVO' : 
                   selectedTournament.status === 'upcoming' ? 'EM BREVE' : 'FINALIZADO'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teams.map((team, index) => {
                  const position = index + 1;
                  const isTopThree = position <= 3;
                  
                  return (
                    <div 
                      key={team.id} 
                      className={`
                        flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]
                        ${isTopThree 
                          ? 'bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent border border-yellow-500/20 shadow-lg shadow-yellow-500/10' 
                          : 'bg-gray-800/30 border border-gray-700/50'
                        }
                      `}
                    >
                      {/* Position */}
                      <div className="flex items-center justify-center w-12 h-12">
                        {getPositionIcon(position)}
                      </div>
                      
                      {/* Team Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-bold ${isTopThree ? 'text-yellow-400' : 'text-white'}`}>
                            {team.name}
                          </h3>
                          {getTrendIcon(team.trend)}
                          {isTopThree && <Star className="w-4 h-4 text-yellow-400" />}
                        </div>
                        <p className="text-sm text-gray-400">
                          {team.players.join(' • ')}
                        </p>
                      </div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <p className={`font-bold ${isTopThree ? 'text-yellow-400' : 'text-white'}`}>
                            {team.totalPoints}
                          </p>
                          <p className="text-xs text-gray-400">Pontos</p>
                        </div>
                        <div>
                          <p className="font-bold text-red-400">{team.totalKills}</p>
                          <p className="text-xs text-gray-400">Kills</p>
                        </div>
                        <div>
                          <p className="font-bold text-blue-400">{team.avgPlacement.toFixed(1)}</p>
                          <p className="text-xs text-gray-400">Avg Pos</p>
                        </div>
                        <div>
                          <p className="font-bold text-green-400">{team.gamesPlayed}</p>
                          <p className="text-xs text-gray-400">Jogos</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tournament Info */}
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-white">{selectedTournament.name}</CardTitle>
              <CardDescription className="text-gray-400">
                {selectedTournament.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">
                  {new Date(selectedTournament.startDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">
                  {new Date(selectedTournament.startDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">{selectedTournament.gameMode}</span>
              </div>
              
              <Separator className="bg-gray-700" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progresso</span>
                  <span className="text-white">
                    {selectedTournament.currentGame}/{selectedTournament.totalGames}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(selectedTournament.currentGame / selectedTournament.totalGames) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Equipes</span>
                  <span className="text-white">
                    {selectedTournament.registeredTeams}/{selectedTournament.maxTeams}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(selectedTournament.registeredTeams / selectedTournament.maxTeams) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Game Info */}
          {selectedTournament.status === 'live' && (
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Jogo Atual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">
                    Jogo {selectedTournament.currentGame}
                  </p>
                  <p className="text-gray-400">de {selectedTournament.totalGames}</p>
                </div>
                
                <Separator className="bg-gray-700" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mapa Atual:</span>
                    <span className="text-white font-semibold">{selectedTournament.currentMap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Próximo Mapa:</span>
                    <span className="text-gray-300">{selectedTournament.nextMap}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Prize Pool */}
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                Premiação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  R$ {selectedTournament.prizePool.toLocaleString('pt-BR')}
                </p>
                <p className="text-gray-400 mt-1">Premiação Total</p>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">1º Lugar:</span>
                  <span className="text-yellow-400 font-semibold">
                    R$ {(selectedTournament.prizePool * 0.5).toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">2º Lugar:</span>
                  <span className="text-gray-300 font-semibold">
                    R$ {(selectedTournament.prizePool * 0.3).toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">3º Lugar:</span>
                  <span className="text-amber-600 font-semibold">
                    R$ {(selectedTournament.prizePool * 0.2).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewTournament;
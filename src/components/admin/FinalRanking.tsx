import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  Star, 
  Download, 
  Share2, 
  Target, 
  Zap, 
  TrendingUp, 
  Users, 
  Swords, 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  Gift
} from 'lucide-react';

interface FinalTeam {
  id: string;
  name: string;
  players: string[];
  totalPoints: number;
  totalKills: number;
  gamesPlayed: number;
  avgPlacement: number;
  bestPlacement: number;
  worstPlacement: number;
  victories: number;
  top3Finishes: number;
  killsPerGame: number;
  pointsPerGame: number;
  consistency: number;
  prize: number;
}

const FinalRanking = () => {
  const [teams] = useState<FinalTeam[]>([
    {
      id: '1',
      name: 'Thunder Wolves',
      players: ['ThunderKing', 'WolfHunter', 'StormBreaker'],
      totalPoints: 287,
      totalKills: 89,
      gamesPlayed: 6,
      avgPlacement: 2.1,
      bestPlacement: 1,
      worstPlacement: 5,
      victories: 3,
      top3Finishes: 5,
      killsPerGame: 14.8,
      pointsPerGame: 47.8,
      consistency: 92,
      prize: 2500
    },
    {
      id: '2',
      name: 'Cyber Eagles',
      players: ['CyberWing', 'EagleEye', 'DigitalStorm'],
      totalPoints: 268,
      totalKills: 76,
      gamesPlayed: 6,
      avgPlacement: 2.8,
      bestPlacement: 1,
      worstPlacement: 7,
      victories: 2,
      top3Finishes: 4,
      killsPerGame: 12.7,
      pointsPerGame: 44.7,
      consistency: 85,
      prize: 1500
    },
    {
      id: '3',
      name: 'Neon Hunters',
      players: ['NeonGlow', 'HunterX', 'ElectricShock'],
      totalPoints: 251,
      totalKills: 82,
      gamesPlayed: 6,
      avgPlacement: 3.5,
      bestPlacement: 2,
      worstPlacement: 8,
      victories: 1,
      top3Finishes: 4,
      killsPerGame: 13.7,
      pointsPerGame: 41.8,
      consistency: 78,
      prize: 1000
    },
    {
      id: '4',
      name: 'Storm Riders',
      players: ['StormLord', 'RiderFast', 'ThunderBolt'],
      totalPoints: 234,
      totalKills: 71,
      gamesPlayed: 6,
      avgPlacement: 4.2,
      bestPlacement: 2,
      worstPlacement: 9,
      victories: 0,
      top3Finishes: 3,
      killsPerGame: 11.8,
      pointsPerGame: 39.0,
      consistency: 72,
      prize: 0
    },
    {
      id: '5',
      name: 'Shadow Force',
      players: ['ShadowMaster', 'DarkForce', 'NightCrawler'],
      totalPoints: 218,
      totalKills: 65,
      gamesPlayed: 6,
      avgPlacement: 5.1,
      bestPlacement: 3,
      worstPlacement: 12,
      victories: 0,
      top3Finishes: 2,
      killsPerGame: 10.8,
      pointsPerGame: 36.3,
      consistency: 68,
      prize: 0
    }
  ]);

  const [animationPhase, setAnimationPhase] = useState(0);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Animate podium appearance
    const timer1 = setTimeout(() => setAnimationPhase(1), 500);
    const timer2 = setTimeout(() => setAnimationPhase(2), 1000);
    const timer3 = setTimeout(() => setAnimationPhase(3), 1500);
    const timer4 = setTimeout(() => setShowStats(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const getPodiumHeight = (position: number) => {
    switch (position) {
      case 1: return 'h-32';
      case 2: return 'h-24';
      case 3: return 'h-20';
      default: return 'h-16';
    }
  };

  const getPodiumColor = (position: number) => {
    switch (position) {
      case 1: return 'from-yellow-400 via-yellow-500 to-yellow-600';
      case 2: return 'from-gray-300 via-gray-400 to-gray-500';
      case 3: return 'from-amber-500 via-amber-600 to-amber-700';
      default: return 'from-gray-600 via-gray-700 to-gray-800';
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-8 h-8 text-yellow-400" />;
      case 2: return <Medal className="w-8 h-8 text-gray-300" />;
      case 3: return <Award className="w-8 h-8 text-amber-600" />;
      default: return <span className="text-2xl font-bold text-white">{position}</span>;
    }
  };

  const exportResults = () => {
    console.log('Exportando classificação final:', teams);
    // TODO: Implementar exportação
  };

  const shareResults = () => {
    console.log('Compartilhando resultados');
    // TODO: Implementar compartilhamento
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Classificação Final
            </h1>
            <p className="text-gray-400 mt-2">Resultados oficiais do Elite Series #6</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={shareResults}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800/50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
          <Button 
            onClick={exportResults}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* 3D Podium */}
      <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            Pódio dos Campeões
          </CardTitle>
          <CardDescription className="text-gray-400">
            Top 3 equipes do campeonato
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 via-transparent to-transparent rounded-lg" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_70%)]" />
            
            {/* Podium Container */}
            <div className="relative flex items-end justify-center gap-8 min-h-[300px]">
              {/* 2nd Place */}
              <div className={`
                flex flex-col items-center transition-all duration-1000 ease-out
                ${animationPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
              `}>
                <div className="mb-4 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-gray-500/20">
                    <Medal className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-lg">{teams[1]?.name}</h3>
                  <p className="text-gray-400 text-sm">{teams[1]?.totalPoints} pontos</p>
                  <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30 mt-1">
                    R$ {teams[1]?.prize.toLocaleString('pt-BR')}
                  </Badge>
                </div>
                <div className={`
                  w-24 ${getPodiumHeight(2)} bg-gradient-to-t ${getPodiumColor(2)} rounded-t-lg
                  shadow-lg shadow-gray-500/20 border-t-4 border-gray-300
                  flex items-center justify-center text-white font-bold text-xl
                `}>
                  2º
                </div>
              </div>

              {/* 1st Place */}
              <div className={`
                flex flex-col items-center transition-all duration-1000 ease-out delay-500
                ${animationPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
              `}>
                <div className="mb-4 text-center relative">
                  {/* Crown Animation */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <Crown className="w-8 h-8 text-yellow-400" />
                  </div>
                  
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-2 shadow-xl shadow-yellow-500/30 ring-4 ring-yellow-400/20">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-bold text-yellow-400 text-xl">{teams[0]?.name}</h3>
                  <p className="text-gray-300 text-sm font-semibold">{teams[0]?.totalPoints} pontos</p>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mt-1 font-bold">
                    R$ {teams[0]?.prize.toLocaleString('pt-BR')}
                  </Badge>
                </div>
                <div className={`
                  w-28 ${getPodiumHeight(1)} bg-gradient-to-t ${getPodiumColor(1)} rounded-t-lg
                  shadow-xl shadow-yellow-500/30 border-t-4 border-yellow-400
                  flex items-center justify-center text-white font-bold text-2xl
                  relative overflow-hidden
                `}>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-300/20 to-transparent animate-pulse" />
                  1º
                </div>
              </div>

              {/* 3rd Place */}
              <div className={`
                flex flex-col items-center transition-all duration-1000 ease-out delay-1000
                ${animationPhase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
              `}>
                <div className="mb-4 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-amber-600/20">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-lg">{teams[2]?.name}</h3>
                  <p className="text-gray-400 text-sm">{teams[2]?.totalPoints} pontos</p>
                  <Badge className="bg-amber-600/20 text-amber-400 border-amber-600/30 mt-1">
                    R$ {teams[2]?.prize.toLocaleString('pt-BR')}
                  </Badge>
                </div>
                <div className={`
                  w-24 ${getPodiumHeight(3)} bg-gradient-to-t ${getPodiumColor(3)} rounded-t-lg
                  shadow-lg shadow-amber-600/20 border-t-4 border-amber-500
                  flex items-center justify-center text-white font-bold text-xl
                `}>
                  3º
                </div>
              </div>
            </div>
            
            {/* Confetti Effect */}
            {animationPhase >= 3 && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className={`
                      absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping
                      ${i % 4 === 0 ? 'bg-yellow-400' : 
                        i % 4 === 1 ? 'bg-blue-400' : 
                        i % 4 === 2 ? 'bg-green-400' : 'bg-red-400'
                      }
                    `}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random()}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Complete Rankings Table */}
      {showStats && (
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Classificação Completa
            </CardTitle>
            <CardDescription className="text-gray-400">
              Estatísticas detalhadas de todas as equipes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-2 text-gray-400 font-semibold">#</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Equipe</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-semibold">Pontos</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-semibold">Kills</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-semibold">Avg Pos</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-semibold">Vitórias</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-semibold">Top 3</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-semibold">K/G</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-semibold">P/G</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-semibold">Consistência</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-semibold">Premiação</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => {
                    const position = index + 1;
                    const isTopThree = position <= 3;
                    
                    return (
                      <tr 
                        key={team.id}
                        className={`
                          border-b border-gray-800 hover:bg-gray-800/30 transition-colors duration-200
                          ${isTopThree ? 'bg-gradient-to-r from-yellow-500/5 via-transparent to-transparent' : ''}
                        `}
                      >
                        <td className="py-4 px-2">
                          <div className="flex items-center justify-center w-8 h-8">
                            {getPositionIcon(position)}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className={`font-bold ${isTopThree ? 'text-yellow-400' : 'text-white'}`}>
                                {team.name}
                              </h3>
                              {isTopThree && <Star className="w-4 h-4 text-yellow-400" />}
                            </div>
                            <p className="text-sm text-gray-400">
                              {team.players.join(' • ')}
                            </p>
                          </div>
                        </td>
                        <td className="text-center py-4 px-2">
                          <span className={`font-bold text-lg ${isTopThree ? 'text-yellow-400' : 'text-white'}`}>
                            {team.totalPoints}
                          </span>
                        </td>
                        <td className="text-center py-4 px-2">
                          <span className="font-bold text-red-400">{team.totalKills}</span>
                        </td>
                        <td className="text-center py-4 px-2">
                          <span className="font-bold text-blue-400">{team.avgPlacement.toFixed(1)}</span>
                        </td>
                        <td className="text-center py-4 px-2">
                          <div className="flex items-center justify-center gap-1">
                            <Crown className="w-4 h-4 text-yellow-400" />
                            <span className="font-bold text-yellow-400">{team.victories}</span>
                          </div>
                        </td>
                        <td className="text-center py-4 px-2">
                          <span className="font-bold text-green-400">{team.top3Finishes}</span>
                        </td>
                        <td className="text-center py-4 px-2">
                          <span className="font-bold text-purple-400">{team.killsPerGame.toFixed(1)}</span>
                        </td>
                        <td className="text-center py-4 px-2">
                          <span className="font-bold text-cyan-400">{team.pointsPerGame.toFixed(1)}</span>
                        </td>
                        <td className="text-center py-4 px-2">
                          <div className="flex items-center justify-center gap-1">
                            <div className="w-12 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${team.consistency}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 ml-1">{team.consistency}%</span>
                          </div>
                        </td>
                        <td className="text-center py-4 px-2">
                          {team.prize > 0 ? (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-bold">
                              <Gift className="w-3 h-3 mr-1" />
                              R$ {team.prize.toLocaleString('pt-BR')}
                            </Badge>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tournament Summary */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">{teams.length}</p>
              <p className="text-gray-400 text-sm">Equipes Participantes</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Swords className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">
                {teams.reduce((acc, team) => acc + team.totalKills, 0)}
              </p>
              <p className="text-gray-400 text-sm">Total de Kills</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">
                R$ {teams.reduce((acc, team) => acc + team.prize, 0).toLocaleString('pt-BR')}
              </p>
              <p className="text-gray-400 text-sm">Premiação Total</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">6</p>
              <p className="text-gray-400 text-sm">Jogos Disputados</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FinalRanking;
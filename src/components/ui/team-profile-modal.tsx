import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, Trophy, Star, Calendar, Target, Award, Crown } from 'lucide-react';
import { Team } from '@/types';

interface TeamWithStats extends Team {
  wins: number;
  losses: number;
  winRate: number;
  rank: number;
  totalMatches: number;
}

interface TeamProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamWithStats | null;
}

const TeamProfileModal: React.FC<TeamProfileModalProps> = ({ isOpen, onClose, team }) => {
  if (!team) return null;

  const getRankColor = (rank: number) => {
    if (rank <= 3) return 'text-yellow-500';
    if (rank <= 10) return 'text-blue-500';
    return 'text-gray-500';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank <= 3) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank <= 10) return <Award className="w-5 h-5 text-blue-500" />;
    return <Star className="w-5 h-5 text-gray-500" />;
  };

  const getWinRateColor = (winRate: number) => {
    if (winRate >= 70) return 'text-green-500';
    if (winRate >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-gaming text-2xl text-gaming-primary flex items-center gap-3">
            {getRankIcon(team.rank)}
            <div className="flex flex-col">
              <span>{team.name}</span>
              <span className="text-sm font-normal text-muted-foreground">[{team.tag}]</span>
            </div>
          </DialogTitle>
          <DialogDescription className="font-gaming-body">
            Perfil completo do time e estatísticas de desempenho
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Estatísticas principais */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gaming-dark/50 rounded-lg p-4 text-center border border-gaming-accent/20">
              <div className={`text-2xl font-bold ${getRankColor(team.rank)}`}>
                #{team.rank}
              </div>
              <div className="text-sm text-muted-foreground font-gaming-body">Ranking</div>
            </div>

            <div className="bg-gaming-dark/50 rounded-lg p-4 text-center border border-gaming-accent/20">
              <div className="text-2xl font-bold text-green-500">
                {team.wins}
              </div>
              <div className="text-sm text-muted-foreground font-gaming-body">Vitórias</div>
            </div>

            <div className="bg-gaming-dark/50 rounded-lg p-4 text-center border border-gaming-accent/20">
              <div className="text-2xl font-bold text-red-500">
                {team.losses}
              </div>
              <div className="text-sm text-muted-foreground font-gaming-body">Derrotas</div>
            </div>

            <div className="bg-gaming-dark/50 rounded-lg p-4 text-center border border-gaming-accent/20">
              <div className={`text-2xl font-bold ${getWinRateColor(team.winRate)}`}>
                {team.winRate}%
              </div>
              <div className="text-sm text-muted-foreground font-gaming-body">Taxa de Vitória</div>
            </div>
          </div>

          {/* Informações do time */}
          <div className="space-y-4">
            <h3 className="font-gaming text-lg text-gaming-primary flex items-center gap-2">
              <Target className="w-5 h-5" />
              Informações do Time
            </h3>
            
            <div className="bg-gaming-dark/30 rounded-lg p-4 border border-gaming-accent/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-gaming-body text-muted-foreground">Nome Completo</label>
                  <p className="font-gaming text-gaming-primary">{team.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-gaming-body text-muted-foreground">Tag</label>
                  <p className="font-gaming text-gaming-accent">[{team.tag}]</p>
                </div>
                
                <div>
                  <label className="text-sm font-gaming-body text-muted-foreground">Total de Partidas</label>
                  <p className="font-gaming">{team.totalMatches}</p>
                </div>
                
                <div>
                  <label className="text-sm font-gaming-body text-muted-foreground">Data de Criação</label>
                  <p className="font-gaming flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {team.created_at ? new Date(team.created_at).toLocaleDateString('pt-BR') : 'N/A'}
                  </p>
                </div>
              </div>
              
              {team.description && (
                <div className="mt-4">
                  <label className="text-sm font-gaming-body text-muted-foreground">Descrição</label>
                  <p className="font-gaming-body text-sm mt-1 p-3 bg-gaming-dark/50 rounded border border-gaming-accent/10">
                    {team.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Jogadores */}
          <div className="space-y-4">
            <h3 className="font-gaming text-lg text-gaming-primary flex items-center gap-2">
              <Users className="w-5 h-5" />
              Jogadores ({team.players?.length || 0})
            </h3>
            
            <div className="bg-gaming-dark/30 rounded-lg p-4 border border-gaming-accent/20">
              {team.players && team.players.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {team.players.map((player, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gaming-dark/50 rounded border border-gaming-accent/10">
                      <div className="w-8 h-8 bg-gaming-accent/20 rounded-full flex items-center justify-center">
                        {index === 0 ? (
                          <Crown className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <Users className="w-4 h-4 text-gaming-accent" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-gaming text-sm">{player}</p>
                        <p className="text-xs text-muted-foreground font-gaming-body">
                          {index === 0 ? 'Capitão' : 'Jogador'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground font-gaming-body py-4">
                  Nenhum jogador cadastrado
                </p>
              )}
            </div>
          </div>

          {/* Conquistas/Badges */}
          <div className="space-y-4">
            <h3 className="font-gaming text-lg text-gaming-primary flex items-center gap-2">
              <Award className="w-5 h-5" />
              Status e Conquistas
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {team.rank <= 3 && (
                <Badge variant="gaming" className="flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  Top 3
                </Badge>
              )}
              
              {team.winRate >= 70 && (
                <Badge variant="outline" className="flex items-center gap-1 border-green-500 text-green-500">
                  <Star className="w-3 h-3" />
                  Alta Performance
                </Badge>
              )}
              
              {team.totalMatches >= 10 && (
                <Badge variant="outline" className="flex items-center gap-1 border-blue-500 text-blue-500">
                  <Target className="w-3 h-3" />
                  Veterano
                </Badge>
              )}
              
              {team.wins >= 5 && (
                <Badge variant="outline" className="flex items-center gap-1 border-yellow-500 text-yellow-500">
                  <Award className="w-3 h-3" />
                  Vencedor
                </Badge>
              )}
            </div>
          </div>

          {/* Botão de fechar */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={onClose}
              variant="gaming"
              className="min-w-[120px]"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamProfileModal;
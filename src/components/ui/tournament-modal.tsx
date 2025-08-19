import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Users, Trophy, Clock, MapPin, Award, Target } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface TournamentChampionship {
  id: string;
  name: string;
  description?: string;
  status: string;
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

interface TournamentModalProps {
  tournament: TournamentChampionship | null;
  isOpen: boolean;
  onClose: () => void;
}

const TournamentModal: React.FC<TournamentModalProps> = ({ tournament, isOpen, onClose }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  if (!tournament) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'AO VIVO';
      case 'registration': return 'INSCRIÇÕES';
      case 'upcoming': return 'EM BREVE';
      case 'finished': return 'FINALIZADO';
      default: return status.toUpperCase();
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'destructive';
      case 'registration': return 'gaming';
      case 'upcoming': return 'secondary';
      case 'finished': return 'outline';
      default: return 'secondary';
    }
  };

  const handleRegisterTeam = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para inscrever um time.",
        variant: "destructive"
      });
      return;
    }

    // Simular processo de inscrição
    toast({
      title: "Inscrição realizada!",
      description: `Seu time foi inscrito no torneio ${tournament.name}.`,
      variant: "default"
    });
    onClose();
  };

  const handleWatchLive = () => {
    toast({
      title: "Redirecionando...",
      description: "Abrindo transmissão ao vivo do torneio.",
      variant: "default"
    });
  };

  const totalSlots = tournament.max_teams_per_group * tournament.number_of_groups;
  const availableSlots = totalSlots - tournament.team_count;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gaming-dark border-gaming-accent">
        <DialogHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <DialogTitle className="font-gaming text-2xl text-gaming-primary mb-2">
                {tournament.name}
              </DialogTitle>
              <Badge variant={getStatusVariant(tournament.status)} className="font-gaming">
                {getStatusText(tournament.status)}
              </Badge>
            </div>
          </div>
          <DialogDescription className="font-gaming-body text-base text-muted-foreground">
            {tournament.description || 'Torneio profissional de Call of Duty Mobile'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-gaming-primary" />
                <div>
                  <p className="font-gaming-body text-sm text-muted-foreground">Premiação</p>
                  <p className="font-gaming text-lg text-gaming-primary">{tournament.prize_pool}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gaming-primary" />
                <div>
                  <p className="font-gaming-body text-sm text-muted-foreground">Times Inscritos</p>
                  <p className="font-gaming">{tournament.team_count}/{totalSlots}</p>
                  {tournament.status === 'registration' && (
                    <p className="text-xs text-gaming-primary">{availableSlots} vagas restantes</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gaming-primary" />
                <div>
                  <p className="font-gaming-body text-sm text-muted-foreground">Início</p>
                  <p className="font-gaming">{formatDate(tournament.start_date)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gaming-primary" />
                <div>
                  <p className="font-gaming-body text-sm text-muted-foreground">Término</p>
                  <p className="font-gaming">{formatDate(tournament.end_date)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informações do organizador */}
          <div className="border-t border-gaming-accent pt-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-gaming-primary" />
              <div>
                <p className="font-gaming-body text-sm text-muted-foreground">Organizado por</p>
                <p className="font-gaming">{tournament.organizer?.full_name || tournament.organizer?.username || 'RankingRoyale'}</p>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-3 pt-4">
            {tournament.status === 'active' && (
              <Button 
                variant="gaming-danger" 
                className="flex-1"
                onClick={handleWatchLive}
              >
                <Target className="w-4 h-4 mr-2" />
                Assistir Ao Vivo
              </Button>
            )}
            
            {tournament.status === 'registration' && (
              <Button 
                variant="gaming" 
                className="flex-1"
                onClick={handleRegisterTeam}
                disabled={availableSlots <= 0}
              >
                <Users className="w-4 h-4 mr-2" />
                {availableSlots > 0 ? 'Inscrever Meu Time' : 'Torneio Lotado'}
              </Button>
            )}
            
            {tournament.status === 'upcoming' && (
              <Button variant="secondary" className="flex-1" disabled>
                <Clock className="w-4 h-4 mr-2" />
                Em Breve
              </Button>
            )}
            
            {tournament.status === 'finished' && (
              <Button variant="outline" className="flex-1">
                <Trophy className="w-4 h-4 mr-2" />
                Ver Resultados
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TournamentModal;